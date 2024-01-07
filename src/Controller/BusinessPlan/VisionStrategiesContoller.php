<?php

namespace App\Controller\BusinessPlan;

use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\Strategie;
use App\Entity\VisionStrategies;
use App\Entity\VisionStrategiesForBusinessPlan;
use App\Repository\ProjetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\VisionStrategiesRepository;
use App\Service\SendEmail;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class VisionStrategiesContoller extends AbstractController
{
    private $UserRepository;
    private $VisionStrategiesRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    const PERMISSION = "vision_strategie";


    public function __construct(ManagerRegistry $doctrine, VisionStrategiesRepository $VisionStrategiesRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->VisionStrategiesRepository = $VisionStrategiesRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
    }


    #[Route('/api/{idProjet}/business-plan/vision-strategies-all/get-all/annee-projet', name: 'getAllVisionStrategiesForAllYears', methods: ['GET'])]
    public function getAllVisionStrategiesForAllYears($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $projetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);
        foreach ($projetAnnees as $projetAnnee) {
            $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["projetAnnees" => $projetAnnee, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

            if (count($VisionStrategies) == 0) {
                return $this->json([]);
            }

            $VisionStrategiesListe = [];

            foreach ($VisionStrategies as $VisionStrategie) {

                $VisionStrategieAction = [];
                $VisionStrategieObjectif = [];
                $VisionStrategieCout = [];

                if ($VisionStrategie->getAction()) {
                    if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                        $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                    } else {
                        $date = "";
                    }
                    $VisionStrategieAction = [
                        "actionDateFin" => $date,
                        "action" => $VisionStrategie->getAction()->getAction(),
                        "cible" => $VisionStrategie->getAction()->getCible(),
                    ];
                }

                if ($VisionStrategie->getObjectif()) {

                    $VisionStrategieObjectif = [

                        "description" => $VisionStrategie->getObjectif()->getDescription()

                    ];
                }

                if ($VisionStrategie->getCout()) {

                    $VisionStrategieCout = [
                        "cout" => $VisionStrategie->getCout()->getCout(),
                    ];
                }
                if ($VisionStrategie->getAvancement() < 0) {
                    $VisionStrategie->setAvancement(0);
                    $this->entityManager->flush();
                }
                $VisionStrategiesListe[] = [
                    "idVisionStrategies" => $VisionStrategie->getId(),
                    "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                    "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies(),
                    "actionVision" => $VisionStrategieAction,
                    "objectifVision" => $VisionStrategieObjectif,
                    "coutVision" => $VisionStrategieCout,
                    "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
                ];
            }
            $VisionStrategiesListeAnnee[] = [
                "idAnnee" => $projetAnnee->getId(),
                "annee" => $projetAnnee->getAnnee(),
                "VisionStrategiesListe" => $VisionStrategiesListe
            ];
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() <= 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
        return $this->json(["VisionStrategiesListeAnnee" => $VisionStrategiesListeAnnee, "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies]);
    }


    #[Route('/api/{idProjet}/business-plan/vision-strategies-all/{idAnneeProjet}', name: 'getAllVisionStrategiesForOneYears', methods: ['GET'])]
    public function getAllVisionStrategiesForOneYears($idProjet, Request $request, $idAnneeProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $projetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["id" => $idAnneeProjet, "projet" => $Projet, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["projetAnnees" => $projetAnnees, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        if (count($VisionStrategies) == 0) {
            return $this->json([]);
        }

        $VisionStrategiesListe = [];

        foreach ($VisionStrategies as $VisionStrategie) {

            $VisionStrategieAction = [];
            $VisionStrategieObjectif = [];
            $VisionStrategieCout = [];

            if ($VisionStrategie->getAction()) {
                if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                    $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                } else {
                    $date = "";
                }
                $VisionStrategieAction = [
                    "actionDateFin" => $date,
                    "action" => $VisionStrategie->getAction()->getAction(),
                    "cible" => $VisionStrategie->getAction()->getCible(),
                ];
            }

            if ($VisionStrategie->getObjectif()) {

                $VisionStrategieObjectif = [

                    "description" => $VisionStrategie->getObjectif()->getDescription()

                ];
            }

            if ($VisionStrategie->getCout()) {

                $VisionStrategieCout = [
                    "cout" => $VisionStrategie->getCout()->getCout(),
                ];
            }
            if ($VisionStrategie->getAvancement() < 0) {
                $VisionStrategie->setAvancement(0);
                $this->entityManager->flush();
            }
            $VisionStrategiesListe[] = [
                "idVisionStrategies" => $VisionStrategie->getId(),
                "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies()?->format("Y-m-d"),
                "actionVision" => $VisionStrategieAction,
                "objectifVision" => $VisionStrategieObjectif,
                "coutVision" => $VisionStrategieCout,
                "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
            ];
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
        return $this->json([$VisionStrategiesListe, "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies]);
    }


    #[Route('/api/{idProjet}/business-plan/vision-strategies-all/', name: 'getAllVisionStrategies', methods: ['GET'])]
    public function getAllVisionStrategies($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        if (count($VisionStrategies) == 0) {
            return $this->json([]);
        }

        $VisionStrategiesListe = [];

        foreach ($VisionStrategies as $VisionStrategie) {

            $VisionStrategieAction = [];
            $VisionStrategieObjectif = [];
            $VisionStrategieCout = [];

            if ($VisionStrategie->getAction()) {
                if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                    $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                } else {
                    $date = "";
                }
                $VisionStrategieAction = [
                    "actionDateFin" => $date,
                    "action" => $VisionStrategie->getAction()->getAction(),
                    "cible" => $VisionStrategie->getAction()->getCible(),
                ];
            }

            if ($VisionStrategie->getObjectif()) {

                $VisionStrategieObjectif = [

                    "description" => $VisionStrategie->getObjectif()->getDescription()

                ];
            }

            if ($VisionStrategie->getCout()) {

                $VisionStrategieCout = [
                    "cout" => $VisionStrategie->getCout()->getCout(),
                ];
            }
            if ($VisionStrategie->getAvancement() < 0) {
                $VisionStrategie->setAvancement(0);
                $this->entityManager->flush();
            }
            $VisionStrategiesListe[] = [
                "idVisionStrategies" => $VisionStrategie->getId(),
                "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies(),
                "actionVision" => $VisionStrategieAction,
                "objectifViosin" => $VisionStrategieObjectif,
                "coutVision" => $VisionStrategieCout,
                "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
            ];
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
        return $this->json([$VisionStrategiesListe, "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies]);
    }



    #[Route('/api/{idProjet}/business-plan/all-vision-strategies', name: 'getAllVisionStrategiesV2', methods: ['GET'])]
    public function getAllVisionStrategiesV2($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }


        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        if (!$visionStrategiesForBusinessPlan) {
        }
        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());


        $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        if (count($VisionStrategies) == 0) {
            return $this->json([]);
        }

        $VisionStrategiesListe = [];
        $totalAvancementElement = 0;
        foreach ($VisionStrategies as $VisionStrategie) {

            $VisionStrategieAction = [];
            $VisionStrategieObjectif = [];
            $VisionStrategieCout = [];

            if ($VisionStrategie->getAction()) {
                if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                    $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                } else {
                    $date = "";
                }
                $VisionStrategieAction = [
                    "actionDateFin" => $date,
                    "action" => $VisionStrategie->getAction()->getAction(),
                    "cible" => $VisionStrategie->getAction()->getCible(),
                ];
            }

            if ($VisionStrategie->getObjectif()) {

                $VisionStrategieObjectif = [

                    "description" => $VisionStrategie->getObjectif()->getDescription()

                ];
            }

            if ($VisionStrategie->getCout()) {

                $VisionStrategieCout = [
                    "cout" => $VisionStrategie->getCout()->getCout(),
                ];
            }
            if ($VisionStrategie->getAvancement() < 0) {
                $VisionStrategie->setAvancement(0);
                $this->entityManager->flush();
            }
            $VisionStrategiesListe[] = [
                "idVisionStrategies" => $VisionStrategie->getId(),
                "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies()->format("Y-m-d"),
                "actionVision" => $VisionStrategieAction,
                "objectifVision" => $VisionStrategieObjectif,
                "coutVision" => $VisionStrategieCout,
                "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
            ];

            $totalAvancementElement += $VisionStrategie->getAvancement();
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }

        $avantagePourcentage = ($totalAvancementElement / (9 * $nbrVisionStrategies)) * 100;
        return $this->json([$VisionStrategiesListe, "VisionStrategieAvancement" => $avantagePourcentage, "nbrVisionStrategies" => $nbrVisionStrategies]);
    }

    #[Route('/api/{idProjet}/business-plan/all-vision-strategies/pagination', name: 'getAllVisionStrategiesPagination', methods: ['POST'])]
    public function getAllVisionStrategiesPagination($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0], null, $informationuser['limit'], $informationuser['debut']);

        if (count($VisionStrategies) == 0) {
            return $this->json([]);
        }

        $VisionStrategiesListe = [];

        foreach ($VisionStrategies as $VisionStrategie) {

            $VisionStrategieAction = [];
            $VisionStrategieObjectif = [];
            $VisionStrategieCout = [];

            if ($VisionStrategie->getAction()) {
                if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                    $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                } else {
                    $date = "";
                }
                $VisionStrategieAction = [
                    "actionDateFin" => $date,
                    "action" => $VisionStrategie->getAction()->getAction(),
                    "cible" => $VisionStrategie->getAction()->getCible(),
                ];
            }

            if ($VisionStrategie->getObjectif()) {

                $VisionStrategieObjectif = [

                    "description" => $VisionStrategie->getObjectif()->getDescription()

                ];
            }

            if ($VisionStrategie->getCout()) {

                $VisionStrategieCout = [
                    "cout" => $VisionStrategie->getCout()->getCout(),
                ];
            }
            if ($VisionStrategie->getAvancement() < 0) {
                $VisionStrategie->setAvancement(0);
                $this->entityManager->flush();
            }

            $VisionStrategiesListe[] = [
                "idVisionStrategies" => $VisionStrategie->getId(),
                "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies()->format("Y-m-d"),
                "actionVision" => $VisionStrategieAction,
                "objectifVision" => $VisionStrategieObjectif,
                "coutVision" => $VisionStrategieCout,
                "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
            ];
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
        return $this->json([$VisionStrategiesListe, "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies]);
    }


    #[Route('/api/{idProjet}/business-plan/vision-strategies/add', name: 'addVisionStrategies', methods: ['POST'])]
    public function addVisionStrategies($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $VisionStrategie = null;

        if (isset($informationuser["annee"]) and $informationuser["annee"] != null) {
            $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "annee" => trim($informationuser["annee"]), "deleted" => 0]);

            if (!$ProjetAnnees) {
                $ProjetAnnees = new ProjetAnnees();
                $ProjetAnnees->setAnnee(trim($informationuser["annee"]));
                $ProjetAnnees->setProjet($Projet);
                $this->entityManager->persist($ProjetAnnees);
                $this->entityManager->flush();
            }
        } elseif (!isset($informationuser["annee"]) and isset($informationuser["idVisionStrategies"]) and $informationuser["idVisionStrategies"] != "" and $informationuser["idVisionStrategies"] != null) {
            return new Response("annee est oblig", 400);
        }

        $ProjetAnnees->setVisionStrategiesForBusinessPlan($visionStrategiesForBusinessPlan);
        $this->entityManager->flush();

        if (isset($informationuser["idVisionStrategies"]) and $informationuser["idVisionStrategies"] != "" and $informationuser["idVisionStrategies"] != null) {
            $VisionStrategie =  $this->doctrine->getRepository(VisionStrategies::class)->findOneBy(["id" => $informationuser["idVisionStrategies"], "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);
        }

        if (!$VisionStrategie) {
            $VisionStrategie = new VisionStrategies();
        }

        $dateVisionStrategies = new DateTime($informationuser["dateVisionStrategies"]);

        $VisionStrategie->setDateVisionStrategies($dateVisionStrategies);
        $VisionStrategie->setAvancement(1);

        $this->entityManager->persist($VisionStrategie);
        $visionStrategiesForBusinessPlan->addVisionStrategi($VisionStrategie);
        $visionStrategiesForBusinessPlan->setAvancement(1);


        /************************* */
        if (!$ProjetAnnees->getVisionStrategies()->contains($VisionStrategie)) {
            $ProjetAnnees->addVisionStrategy($VisionStrategie);
        }

        $this->entityManager->flush();

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());
        if (isset($informationuser["actionVision"])) {
            if ($VisionStrategie->getAction()) {
                $action = $VisionStrategie->getAction();
            } else {
                $action = new Strategie();
                $this->entityManager->persist($action);
                $VisionStrategie->setAction($action);
            }

            $this->addEditInfoVision($informationuser["dateVisionStrategies"], $informationuser["actionVision"], $action, $VisionStrategie, $visionStrategiesForBusinessPlan);
            $this->entityManager->flush();
        }

        if (isset($informationuser["objectifVision"])) {

            if ($VisionStrategie->getObjectif()) {
                $objectif = $VisionStrategie->getObjectif();
            } else {
                $objectif = new Strategie();
                $this->entityManager->persist($objectif);
                $VisionStrategie->setObjectif($objectif);
            }

            $objectif->setDescription($informationuser["objectifVision"]["description"]);

            $this->entityManager->flush();
        }
        if (isset($informationuser["coutVision"])) {
            if ($VisionStrategie->getCout()) {
                $cout = $VisionStrategie->getCout();
            } else {
                $cout = new Strategie();
                $this->entityManager->persist($cout);
                $VisionStrategie->setCout($cout);
            }

            $cout->setCout((float)$informationuser["coutVision"]["cout"]);
            $this->entityManager->flush();
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }

        return $this->json(["idVisionStrategies" => $VisionStrategie->getId(), "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies, "BusinessPlanAvancement" => $Projet->getBusinessPlan()->getAvancement()]);
    }


    #[Route('/api/{idProjet}/business-plan/vision-strategies/edit/{idVisionStrategies}', name: 'editVisionStrategies', methods: ['PUT'])]
    public function editVisionStrategies($idProjet, $idVisionStrategies, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $VisionStrategie =  $this->doctrine->getRepository(VisionStrategies::class)->findOneBy(["id" => $idVisionStrategies, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        $dateVisionStrategies = new DateTime($informationuser["dateVisionStrategies"]);

        $VisionStrategie->setDateVisionStrategies($dateVisionStrategies);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        if ($VisionStrategie->getAction()) {
            $action = $VisionStrategie->getAction();
        } else {
            $action = new Strategie();
            $this->entityManager->persist($action);
            $VisionStrategie->setAction($action);
        }

        $this->addEditInfoVision($informationuser["dateVisionStrategies"], $informationuser["actionVision"], $action, $VisionStrategie, $visionStrategiesForBusinessPlan);
        $this->entityManager->flush();

        if ($VisionStrategie->getObjectif()) {
            $objectif = $VisionStrategie->getObjectif();
        } else {
            $objectif = new Strategie();
            $this->entityManager->persist($objectif);
            $VisionStrategie->setObjectif($objectif);
        }

        $this->addEditInfoVision($informationuser["dateVisionStrategies"], $informationuser["objectifVision"], $objectif, $VisionStrategie, $visionStrategiesForBusinessPlan);
        $this->entityManager->flush();

        if ($VisionStrategie->getCout()) {
            $cout = $VisionStrategie->getCout();
        } else {
            $cout = new Strategie();
            $this->entityManager->persist($cout);
            $VisionStrategie->setCout($cout);
        }

        $this->addEditInfoVision($informationuser["dateVisionStrategies"], $informationuser["coutVision"], $cout, $VisionStrategie, $visionStrategiesForBusinessPlan);
        $this->entityManager->flush();
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
        return $this->json(["idVisionStrategies" => $VisionStrategie->getId(), "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies, "BusinessPlanAvancement" => $Projet->getBusinessPlan()->getAvancement()]);
    }





    #[Route('/api/{idProjet}/business-plan/vision-strategies-single/{idVisionStrategies}', name: 'getVisionStrategies', methods: ['GET'])]
    public function getVisionStrategies($idProjet, $idVisionStrategies, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $VisionStrategie =  $this->doctrine->getRepository(VisionStrategies::class)->findOneBy(["id" => $idVisionStrategies, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        if (!$VisionStrategie) {
            return new Response("VisionStrategie n'existe pas", 400);
        }
        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }

        return $this->json([
            "idVisionStrategies" => $VisionStrategie->getId(),
            "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
            "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies(),
            "VisionStrategieAction" => $this->VisionStrategiesRepository->getActionsByVsId($idVisionStrategies),
            "VisionStrategieObjectif" => $this->VisionStrategiesRepository->getObjectifByVsId($idVisionStrategies),
            "VisionStrategieCout" => $this->VisionStrategiesRepository->getCoutByVsId($idVisionStrategies),
            "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(),
            "nbrVisionStrategies" => $nbrVisionStrategies,
            "BusinessPlanAvancement" => $Projet->getBusinessPlan()->getAvancement()
        ]);
    }



    #[Route('/api/{idProjet}/business-plan/vision-strategies/supp/{idVisionStrategies}', name: 'suppVisionStrategies', methods: ['DELETE'])]
    public function suppVisionStrategies($idProjet, $idVisionStrategies, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $nbrVisionStrategies = count($visionStrategiesForBusinessPlan->getVisionStrategis());

        $VisionStrategie =  $this->doctrine->getRepository(VisionStrategies::class)->findOneBy(["id" => $idVisionStrategies, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);

        $VisionStrategie->setDeleted(1);


        $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() - $VisionStrategie->getAvancement());


        $this->entityManager->flush();
        return $this->json(["idVisionStrategies" => $VisionStrategie->getId(), "VisionStrategieAvancement" => $visionStrategiesForBusinessPlan->getAvancement(), "nbrVisionStrategies" => $nbrVisionStrategies, "BusinessPlanAvancement" => $Projet->getBusinessPlan()->getAvancement()]);
    }

    public function addEditInfoVision($dateVisionStrategies, $informationuser, $strategie, $VisionStrategie, $visionStrategiesForBusinessPlan)
    {
        if ($dateVisionStrategies) {
            $VisionStrategie->setAvancement(0);
            if ($strategie->getDebut() != "" and $strategie->getDebut() != null and $strategie->getDebut() != "") {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() - 1);
                //$visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() +1);
            } elseif (($strategie->getDebut() == "" or $strategie->getDebut() == null)) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() + 1);
                // $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() - 1);
            }

            $actionDateDebut = new DateTime($dateVisionStrategies);
            $strategie->setDebut($actionDateDebut);
        }

        if (isset($informationuser["actionDateFin"])) {

            if ($informationuser["actionDateFin"] == "" and $strategie->getFin() != "" and $strategie->getFin() != null) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() - 1);
                //$visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() + 1);
            } elseif ($informationuser["actionDateFin"] != "" and $informationuser["actionDateFin"] != null) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() + 1);
                // $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() - 1);

                $actionDateFin = new DateTime($informationuser["actionDateFin"]);
                $strategie->setFin($actionDateFin);
            }
        }

        if (isset($informationuser["action"])) {

            if ($informationuser["action"] == "" and $strategie->getAction() != "" and $strategie->getAction() != null) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() - 1);
                // $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() + 1);
            } elseif ($informationuser["action"] != "" and $informationuser["action"] != null and  ($strategie->getAction() == "" or $strategie->getAction() == null)) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() + 1);
                // $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() - 1);
            }

            $strategie->setAction($informationuser["action"]);
        }

        if (isset($informationuser["cible"])) {

            if ($informationuser["cible"] == ""  and $strategie->getCible() != "" and $strategie->getCible() != null) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() - 1);
                //$visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() + 1);
            } elseif ($informationuser["cible"] != "" and $informationuser["cible"] != null and  ($strategie->getCible() == "" or $strategie->getCible() == null)) {
                $VisionStrategie->setAvancement($VisionStrategie->getAvancement() + 1);
                //  $visionStrategiesForBusinessPlan->setAvancement($visionStrategiesForBusinessPlan->getAvancement() - 1);
            }

            $strategie->setCible($informationuser["cible"]);
        }

        if ($VisionStrategie->getAvancement() < 0) {
            $VisionStrategie->setAvancement(0);
        }

        if ($visionStrategiesForBusinessPlan->getAvancement() < 0) {
            $visionStrategiesForBusinessPlan->setAvancement(0);
            $this->entityManager->flush();
        }
    }
}
