<?php

namespace App\Controller\BusinessPlan;

use App\Entity\ChargeExt;
use App\Entity\PlanFinancementInfo;
use App\Entity\TresorerieInfo;
use App\Entity\ChiffreAffaire;
use App\Entity\EncaisseDecaissement;
use App\Entity\FinancementEtCharges;
use App\Entity\InfoBilan;
use App\Entity\Investissement;
use App\Entity\InvestissementNature;
use App\Entity\MonthChargeExt;
use App\Entity\MonthListeChiffreAffaire;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Repository\MonthListeChiffreAffaireRepository;
use App\Repository\ProjetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Service\SendEmail;
use App\Service\FinancemenService;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class FinancementEtChargesController extends AbstractController
{
    private $UserRepository;
    private $ProjetRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $FinancemenService;
    private $entityManager;
    private $doctrine;
    private $MonthListeChiffreAffaireRepository;
    const PERMISSION ="financement_charge";

    public function __construct(FinancemenService $FinancemenService,MonthListeChiffreAffaireRepository $MonthListeChiffreAffaireRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->FinancemenService = $FinancemenService;
        $this->MonthListeChiffreAffaireRepository = $MonthListeChiffreAffaireRepository;
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/get-AllAnneefinancementPartie", name: 'getAllAnneefinancement', methods: ['GET'])]
    public function getAllAnneefinancement(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken || !$user || !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,null,false);
        
        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["FinancementEtCharges" => $FinancementEtCharges, "projet" => $Projet], ["annee" => "ASC"]);

        $projetListe = [];

        foreach ($ProjetAnnees as $item) {
            $projetListe[] = [
                "id" => $item->getId(),
                "Name" => $item->getAnnee(),
            ];
        }

        return $this->json($projetListe);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/get-AllAnnee", name: 'getAllAnnee', methods: ['GET'])]
    public function getAllAnnee(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken || !$user || !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,null,false);
        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet],["annee" => "ASC"]);

        $projetListe = [];

        foreach ($ProjetAnnees as $item) {
            $projetListe[] = [
                "id" => $item->getId(),
                "Name" => $item->getAnnee(),
            ];
        }

        usort($projetListe, function ($a, $b) {
            return $a["Name"] <=> $b["Name"];
        });

        return $this->json($projetListe);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/get-OneAnnee/{idAnnee}", name: 'getOneAnnee', methods: ['GET'])]
    public function getOneAnnee(Request $request, $idProjet, $idAnnee)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken || !$user || !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
       
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,null,false);
        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        
        if (!$Projet) {
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "id" => $idAnnee]);


        if (!$ProjetAnnees) {
            return new Response("Annee n'existe pas", 400);
        }

        $projetListe[] = [
            "id" => $ProjetAnnees->getId(),
            "Name" => $ProjetAnnees->getAnnee(),
        ];
        return $this->json($projetListe);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/tresorerie/{idAnnee}", name: 'getTresorerieOneAnnee', methods: ['GET'])]
    public function getTresorerieOneAnnee(Request $request, $idProjet, $idAnnee)
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
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "id" => $idAnnee, "FinancementEtCharges" => $FinancementEtCharges]);


        if (!$ProjetAnnees) {
            return new Response("Annee n'existe pas", 400);
        }
        //chiffre d'affaire partie
        $Tresorerie = $this->FinancemenService->getTresorerie($ProjetAnnees, $FinancementEtCharges);
        return $this->json( $Tresorerie);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/set-tresorerie/{idAnnee}", name: 'setTresorerieOneAnnee', methods: ['POST'])]
    public function setTresorerieOneAnnee(Request $request, $idProjet, $idAnnee)
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
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "id" => $idAnnee, "FinancementEtCharges" => $FinancementEtCharges]);


        if (!$ProjetAnnees) {
            return new Response("Annee n'existe pas", 400);
        }

        $tresorerieInfo = $this->vivitoolsService->jsonToarray($request->getContent());
        foreach ($tresorerieInfo as $key => $item) {
            $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["FinancementEtCharges" => $FinancementEtCharges, "id" => $key]);
            $this->FinancemenService->EditTresorerieInfo($TresorerieInfo, $item);
        }

        return new Response("OK", 200);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/get-compte-resultat", name: 'getCompteResultat', methods: ['GET'])]
    public function getCompteResultat(Request $request, $idProjet)
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
            return new Response("Projet n'existe pas", 404);
        }
        $compteResultat = $this->FinancemenService->compteResultat($Projet);

        return $this->json($compteResultat);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/synthese-previsionnelle", name: 'synthesePrevisionnelle', methods: ['GET'])]
    public function synthesePrevisionnelle(Request $request, $idProjet)
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
            return new Response("Projet n'existe pas", 404);
        }
        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "FinancementEtCharges" => $FinancementEtCharges], ["annee" => "ASC"]);
        $synthese = [];
        foreach ($ProjetAnnees as $ProjetAnnee) {
            $ChiffreAffaire = $this->FinancemenService->ChiffreAffaire($ProjetAnnee, $FinancementEtCharges)["Total"];
            
       
            $resultatExercice = $this->FinancemenService->calcResultatExercice($ProjetAnnee, $FinancementEtCharges);


            $Solde= $this->FinancemenService->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 18);        
            $SoldeTesorerie = $this->FinancemenService->calcTotalArray($Solde); 

            $synthese[$ProjetAnnee->getAnnee()] = [
                "ChiffreAffaire"=>$ChiffreAffaire,
                "resultatExercice"=>$resultatExercice,
                "Tesorerie"=>$SoldeTesorerie
            ];
        }
        
        return $this->json($synthese);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/get-bilan/{idAnnee}", name: 'getBilan', methods: ['GET'])]
    public function getBilan(Request $request, $idProjet, $idAnnee)
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
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "id" => $idAnnee, "FinancementEtCharges" => $FinancementEtCharges]);

        if (!$ProjetAnnees) {
            return new Response("Annee n'existe pas", 400);
        }
        $bilan = $this->FinancemenService->getBilan($ProjetAnnees,$FinancementEtCharges);
        
        return $this->json(["actif" =>$bilan['actif'], "passif" => $bilan["passif"]]);
    }




    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/set-bilan/{idAnnee}", name: 'setBilanOneAnnee', methods: ['POST'])]
    public function setBilanOneAnnee(Request $request, $idProjet, $idAnnee)
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
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet" => $Projet, "id" => $idAnnee, "FinancementEtCharges" => $FinancementEtCharges]);


        if (!$ProjetAnnees) {
            return new Response("Annee n'existe pas", 400);
        }

        $tresorerieInfo = $this->vivitoolsService->jsonToarray($request->getContent());
        foreach ($tresorerieInfo as $key => $item) {

            $InfoBilan = $this->doctrine->getRepository(InfoBilan::class)->findOneBy(["FinancementEtCharges" => $FinancementEtCharges, "id" => $key]);

            $this->FinancemenService->EditBilanInfo($InfoBilan, $item);
        }

        return new Response("OK", 200);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/set-PlanFinancement", name: 'setPlanFinancement', methods: ['PUT'])]
    public function setPlanFinancement(Request $request, $idProjet)
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
            return new Response("Projet n'existe pas", 404);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);
        
        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "FinancementEtCharges" => $FinancementEtCharges], ["annee" => "ASC"]);
       
        if(count($ProjetAnnees) == 0){
            return $this->json([]);
        }

        $PlanFinancements = $this->vivitoolsService->jsonToarray($request->getContent());

        foreach ($PlanFinancements as $key => $item) {

            $this->FinancemenService->editPlanFinancementInfo($item["id"],$item["valeur"], $FinancementEtCharges);
        }
       
        
        return New Response("OK",200);

    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/tableaux-financiers/get-PlanFinancement", name: 'getPlanFinancement', methods: ['GET'])]
    public function getPlanFinancement(Request $request, $idProjet)
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
            return new Response("Projet n'existe pas", 404);
        }

        $PlanFinancement= $this->FinancemenService->PlanFinancement($Projet);
        return $this->json($PlanFinancement);

    }
  
}
