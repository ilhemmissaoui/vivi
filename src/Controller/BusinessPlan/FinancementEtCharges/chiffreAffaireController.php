<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\ChiffreAffaireActivite;
use App\Entity\FinancementChiffreAffaire;
use App\Entity\FinancementEtCharges;
use App\Entity\ProjetAnnees;
use App\Entity\MonthListeChiffreAffaire;
use App\Entity\Projet;
use App\Repository\ChiffreAffaireActiviteRepository;
use App\Repository\ProjetAnneesRepository;
use App\Repository\MonthListeChiffreAffaireRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class chiffreAffaireController extends AbstractController
{
    private $UserRepository;
    private $ChiffreAffaireActiviteRepository;
    private $vivitoolsService;
    private $entityManager;
    private $doctrine;
    private $MonthListeChiffreAffaireRepository;
    private $ProjetAnneesRepository;
    const PERMISSION = "financement_charge";
    public function __construct(ProjetAnneesRepository $ProjetAnneesRepository, MonthListeChiffreAffaireRepository $MonthListeChiffreAffaireRepository, ManagerRegistry $doctrine, ChiffreAffaireActiviteRepository $ChiffreAffaireActiviteRepository, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ChiffreAffaireActiviteRepository = $ChiffreAffaireActiviteRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->MonthListeChiffreAffaireRepository = $MonthListeChiffreAffaireRepository;
        $this->ProjetAnneesRepository = $ProjetAnneesRepository;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/add-activite/", name: 'addActivite', methods: ['POST'])]
    public function addActivite(Request $request, $idProjet)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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

        if ($BusinessPlan->getFinancementEtCharges()) {
            $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        } else {

            $FinancementEtCharges = new FinancementEtCharges();
            $this->entityManager->persist($FinancementEtCharges);
            $BusinessPlan->setFinancementEtCharges($FinancementEtCharges);
            $this->entityManager->flush();
        }

        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );




        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $ChiffreAffaire = new ChiffreAffaireActivite();
        $ChiffreAffaire->setName($informationuser["activiteName"]);
        $ChiffreAffaire->setFinancementChiffreAffaire($FinancementChiffreAffaire);
        $this->entityManager->persist($ChiffreAffaire);
        
        $FinancementEtCharges->addChifreAf($ChiffreAffaire);

        $this->entityManager->flush();

        return $this->json(["idChiffreAffaire" => $ChiffreAffaire->getId()]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/edit-activite/{idChiffreAffaire}", name: 'EditActivite', methods: ['PUT'])]
    public function EditActivite(Request $request, $idProjet, $idChiffreAffaire)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }
        $ChiffreAffaire =  $this->doctrine->getRepository(ChiffreAffaireActivite::class)->findOneBy(["id" => $idChiffreAffaire, "financementEtCharges" => $FinancementEtCharges]);

        if (!$ChiffreAffaire) {
            return new Response("activite n'existe pas");
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $ChiffreAffaire->setName($informationuser["activiteName"]);
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        
        return $this->json(["idChiffreAffaire" => $ChiffreAffaire->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/montant/add", name: 'addAnneeToChiffreAffaires', methods: ['POST'])]
    public function addAnneeToChiffreAffaires(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }
        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        if (isset($informationuser["montantName"]) and $informationuser["montantName"] != null) {
            $montant = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($informationuser["montantName"]), "deleted" => 0]);
            if(!$montant){
             $montant = new ProjetAnnees();

             $montant->setAnnee(trim($informationuser["montantName"]));
             $montant->setProjet($Projet);
             $this->entityManager->persist($montant);
     
            }
            $montant->setFinancementEtCharges($FinancementEtCharges);
            $montant->setFinancementChiffreAffaire($FinancementChiffreAffaire);
            $this->entityManager->flush();

        }   

        return $this->json(["idMontant" => $montant->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/edit-montant/{idMontant}", name: 'EditMontantOfActivite', methods: ['PUT'])]
    public function EditMontantOfActivite(Request $request, $idProjet, $idMontant)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }
        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);

        if (isset($informationuser["montantName"])) {
            $montant->setName($informationuser["montantName"]);
        }

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        return $this->json(["idMontant" => $montant->getId()]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/{idChiffreAffaire}/montant/{idMontant}/edit-value/{idMonthValue}", name: 'EditValueToMonth', methods: ['PUT'])]
    public function EditValueToMonth(Request $request, $idProjet, $idChiffreAffaire, $idMontant, $idMonthValue)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {

            return $this->json(["Projet" => []]);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }
        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );

        $ChiffreAffaire =  $this->doctrine->getRepository(ChiffreAffaireActivite::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idChiffreAffaire, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChiffreAffaire) {
            return $this->json(["activite" => []]);
        }

        $AnneeMontant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idMontant, "FinancementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$AnneeMontant) {
            return $this->json(["AnneeMontant" => []]);
        }

        $monthValue =  $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findOneBy(["chiffreAffaireActivite" => $ChiffreAffaire, "projetAnnees" => $AnneeMontant, "id" => $idMonthValue,"deleted" => 0]);

        if (!$monthValue) {
            return $this->json(["monthValue" => []]);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $monthValue = $this->addEditValueToMonth($informationuser, $monthValue);
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        
        $monthValueExist = $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findBy(["FinancementChiffreAffaire" => $FinancementChiffreAffaire,"deleted" => 0]);
            
        if (count($monthValueExist) > 0 ) {
            $FinancementChiffreAffaire->setAvancement(1);
             $this->entityManager->flush();

        }
        
        return $this->json(["monthValue" => $monthValue->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/{idChiffreAffaire}/montant/{idMontant}/add-value-to-month/", name: 'addValueToMonthCh', methods: ['POST'])]
    public function addValueToMonthCh(Request $request, $idProjet, $idChiffreAffaire, $idMontant): Response
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken || !$user || !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return $this->json(["Projet" => []]);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }
        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );

        $ChiffreAffaire = $this->doctrine->getRepository(ChiffreAffaireActivite::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idChiffreAffaire, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChiffreAffaire) {

            return new Response("activite n'existe pas", 400);
        }

        $AnneeMontant = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idMontant, "FinancementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$AnneeMontant) {
            return new Response("AnneeMontant n'existe pas", 400);
        }

        $monthValue = $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findOneBy(["chiffreAffaireActivite" => $ChiffreAffaire, "projetAnnees" => $AnneeMontant,"deleted" => 0]);

        if ($monthValue) {

            return new Response("month Value exists", 204);
        } else {
            $monthValue = new MonthListeChiffreAffaire();
            $monthValue->setFinancementChiffreAffaire($FinancementChiffreAffaire);
            
            

        }
        


        $informationUser = $this->vivitoolsService->jsonToArray($request->getContent());

        $monthValue = $this->addEditValueToMonth($informationUser, $monthValue);

        $this->entityManager->persist($monthValue);
        $AnneeMontant->addMonthListeChiffreAffaire($monthValue);
        $ChiffreAffaire->addMonthListeChiffreAffaire($monthValue);
        $this->entityManager->flush();

        $monthValueExist = $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findBy(["FinancementChiffreAffaire" => $FinancementChiffreAffaire,"deleted" => 0]);
            
            if (count($monthValueExist) > 0 ) {
                $FinancementChiffreAffaire->setAvancement(1);
                 $this->entityManager->flush();

            }
        return $this->json(["monthValue" => $monthValue->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/activite/{idChiffreAffaire}/montant/{idMontant}/get-value-to-month/{idMonthValue}", name: 'GetValueMonth', methods: ['GET'])]
    public function GetValueMonth(Request $request, $idProjet, $idChiffreAffaire, $idMontant, $idMonthValue)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }

        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges );

        $ChiffreAffaire =  $this->doctrine->getRepository(ChiffreAffaireActivite::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idChiffreAffaire, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChiffreAffaire) {

            return new Response("activite n'existe pas", 400);
        }

        $AnneeMontant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idMontant, "FinancementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$AnneeMontant) {

            return new Response("AnneeMontant n'existe pas", 400);
        }

        $monthValue =  $this->MonthListeChiffreAffaireRepository->findOneMonthListeChiffreAffaire($idMonthValue, $AnneeMontant, $ChiffreAffaire);

        if (!$monthValue) {
            return new Response("monthValue n'existe pas", 400);
        }

        return $this->json(["monthValue" => $monthValue, "AnneeMontantId" => $idMontant, "ChiffreAffaireActiviteId" => $idChiffreAffaire]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/get-all-activite", name: 'getAllActivite', methods: ['GET'])]
    public function getAllActivite(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("Business Plan n'existe pas", 400);
        }
        if ($BusinessPlan->getFinancementEtCharges()) {
            $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        } else {

            $FinancementEtCharges = new FinancementEtCharges();
            $this->entityManager->persist($FinancementEtCharges);
            $BusinessPlan->setFinancementEtCharges($FinancementEtCharges);
            $this->entityManager->flush();
        }
        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges);

        $montantListe = $this->ProjetAnneesRepository->findProjetAnneesChiffreAffaire ($FinancementEtCharges->getId(),$FinancementChiffreAffaire->getId());
        $chiffreAffaireListe = $this->ChiffreAffaireActiviteRepository->findChiffreAffaireActivite($FinancementEtCharges->getId(),$FinancementChiffreAffaire->getId());
        $ValueListeChiffreAffaireListe = $this->MonthListeChiffreAffaireRepository->findAllvalueChiffreAffaire($FinancementEtCharges->getId());
        $ValueListeIdChiffreAffaireListe = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaire($FinancementEtCharges->getId());

        return $this->json(['chiffreAffaireListe' => $chiffreAffaireListe, "montantAnneeListe" => $montantListe, "valueListe" => $ValueListeChiffreAffaireListe, "valueListeId" => $ValueListeIdChiffreAffaireListe]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/chiffre-affaire/deleted/{idChiffreAffaire}", name: 'deletedActivite', methods: ['DELETE'])]
    public function deletedActivite($idChiffreAffaire, $idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }

        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges);

        $ChiffreAffaire =  $this->doctrine->getRepository(ChiffreAffaireActivite::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idChiffreAffaire, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChiffreAffaire) {
            return new Response("activite n'existe pas", 400);
        }

        foreach($ChiffreAffaire->getMonthListeChiffreAffaire() as $monthValueListe){
            $monthValueListe->setDeleted(1);
            $this->entityManager->flush();

        }
        
        $ChiffreAffaire->setDeleted(1);
        $this->entityManager->flush();
        
        $monthValueExist = $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findBy(["FinancementChiffreAffaire" => $FinancementChiffreAffaire,"deleted" => 0]);
            
        if (count($monthValueExist) == 0 ) {
            $FinancementChiffreAffaire->setAvancement(0);
             $this->entityManager->flush();

        }
        return new Response("ok", 200);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/deleted-montant/{idMontant}", name: 'DeletedProjetAnnees', methods: ['DELETE'])]
    public function DeletedProjetAnnees(Request $request, $idProjet, $idMontant)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
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
        if (!$BusinessPlan) {
            return new Response("BusinessPlan n'existe pas", 400);
        }
        $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        if (!$FinancementEtCharges) {
            return new Response("FinancementEtCharges n'existe pas", 400);
        }

        $FinancementChiffreAffaire = $this->checkFinancementChiffreAffaire($FinancementEtCharges);

        $AnneeMontant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementChiffreAffaire"=>$FinancementChiffreAffaire,"id" => $idMontant, "FinancementEtCharges" => $FinancementEtCharges, "deleted" => 0]);


        if (!$AnneeMontant) {

            return new Response("Annee Montant n'existe pas", 400);
        }
        
        $FinancementChiffreAffaire?->removeProjetAnnee($AnneeMontant);

        $this->entityManager->flush();

        foreach($AnneeMontant->getMonthListeChiffreAffaire() as $item){
            $item->setDeleted(true);
            $this->entityManager->flush();

        }

        $monthValueExist = $this->doctrine->getRepository(MonthListeChiffreAffaire::class)->findBy(["FinancementChiffreAffaire" => $FinancementChiffreAffaire,"deleted" => 0]);
            
            if (count($monthValueExist) > 0 ) {
                $FinancementChiffreAffaire->setAvancement(1);
                 $this->entityManager->flush();

            }else{
                $FinancementChiffreAffaire->setAvancement(0);
                 $this->entityManager->flush();
            }

        return new Response("ok", 200);
    }



    public function addEditValueToMonth($informationuser, $monthValue)
    {
        if (isset($informationuser["JanPrixHt"])) $monthValue->setJanPrixHt((float)$informationuser["JanPrixHt"]);
        if (isset($informationuser["JanVolumeVente"])) $monthValue->setJanVolumeVente((float)$informationuser["JanVolumeVente"]);
        if (isset($informationuser["FevPrixHt"])) $monthValue->setFevPrixHt((float)$informationuser["FevPrixHt"]);
        if (isset($informationuser["FrvVolumeVente"])) $monthValue->setFrvVolumeVente((float)$informationuser["FrvVolumeVente"]);
        if (isset($informationuser["MarPrixHt"])) $monthValue->setMarPrixHt((float)$informationuser["MarPrixHt"]);
        if (isset($informationuser["MarVolumeVente"])) $monthValue->setMarVolumeVente((float)$informationuser["MarVolumeVente"]);
        if (isset($informationuser["AvrPrixHt"])) $monthValue->setAvrPrixHt((float)$informationuser["AvrPrixHt"]);
        if (isset($informationuser["AvrVolumeVente"])) $monthValue->setAvrVolumeVente((float)$informationuser["AvrVolumeVente"]);
        if (isset($informationuser["MaiPrixHt"])) $monthValue->setMaiPrixHt((float)$informationuser["MaiPrixHt"]);
        if (isset($informationuser["MaiVolumeVente"])) $monthValue->setMaiVolumeVente((float)$informationuser["MaiVolumeVente"]);
        if (isset($informationuser["JuinPrixHt"])) $monthValue->setJuinPrixHt((float)$informationuser["JuinPrixHt"]);
        if (isset($informationuser["JuinVolumeVente"])) $monthValue->setJuinVolumeVente((float)$informationuser["JuinVolumeVente"]);
        if (isset($informationuser["JuilPrixHt"])) $monthValue->setJuilPrixHt((float)$informationuser["JuilPrixHt"]);
        if (isset($informationuser["JuilVolumeVente"])) $monthValue->setJuilVolumeVente((float)$informationuser["JuilVolumeVente"]);
        if (isset($informationuser["AouPrixHt"])) $monthValue->setAouPrixHt((float)$informationuser["AouPrixHt"]);
        if (isset($informationuser["AouVolumeVente"])) $monthValue->setAouVolumeVente((float)$informationuser["AouVolumeVente"]);
        if (isset($informationuser["SeptPrixHt"])) $monthValue->setSeptPrixHt((float)$informationuser["SeptPrixHt"]);
        if (isset($informationuser["SeptVolumeVente"])) $monthValue->setSeptVolumeVente((float)$informationuser["SeptVolumeVente"]);
        if (isset($informationuser["OctPrixHt"])) $monthValue->setOctPrixHt((float)$informationuser["OctPrixHt"]);
        if (isset($informationuser["OctVolumeVente"])) $monthValue->setOctVolumeVente((float)$informationuser["OctVolumeVente"]);
        if (isset($informationuser["NovPrixHt"])) $monthValue->setNovPrixHt((float)$informationuser["NovPrixHt"]);
        if (isset($informationuser["NovVolumeVonte"])) $monthValue->setNovVolumeVonte((float)$informationuser["NovVolumeVonte"]);
        if (isset($informationuser["DecPrixHt"])) $monthValue->setDecPrixHt((float)$informationuser["DecPrixHt"]);
        if (isset($informationuser["DecVolumeVonte"])) $monthValue->setDecVolumeVonte($informationuser["DecVolumeVonte"]);
        if (isset($informationuser["valeur"])) $monthValue->setValeur((float)$informationuser["valeur"]);
        return $monthValue;
    }

    public function checkFinancementChiffreAffaire($FinancementEtCharges )
    {
        if ($FinancementEtCharges ->getFinancementChiffreAffaire()) {
            $FinancementChiffreAffaire = $FinancementEtCharges ->getFinancementChiffreAffaire();
        } else {
            $FinancementChiffreAffaire = new FinancementChiffreAffaire();
            $this->entityManager->persist($FinancementChiffreAffaire);
            $FinancementEtCharges->setFinancementChiffreAffaire($FinancementChiffreAffaire);
            $this->entityManager->flush();
        }
        return $FinancementChiffreAffaire;
    }
}
