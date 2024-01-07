<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\ChargeExt;
use App\Entity\Depenses;
use App\Entity\FinancementDepense;
use App\Entity\FinancementEtCharges;
use App\Entity\ProjetAnnees;
use App\Entity\MonthChargeExt;
use App\Entity\Projet;
use App\Repository\ChargeExtRepository;
use App\Repository\ProjetAnneesRepository;
use App\Repository\MonthChargeExtRepository;
use App\Repository\ProjetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Service\SendEmail;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class chargeExternesController extends AbstractController
{
    private $UserRepository;
    private $ChargeExtRepository;
    private $ProjetAnneesRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $MonthChargeExtRepository;
    const PERMISSION ="financement_charge";


    public function __construct(MonthChargeExtRepository $MonthChargeExtRepository, ProjetAnneesRepository $ProjetAnneesRepository, ManagerRegistry $doctrine, ChargeExtRepository $ChargeExtRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ChargeExtRepository = $ChargeExtRepository;
        $this->ProjetAnneesRepository = $ProjetAnneesRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->MonthChargeExtRepository = $MonthChargeExtRepository;
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/charges-extairne/add-charge", name: 'addCharge', methods: ['POST'])]
    public function addCharge(Request $request, $idProjet)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());


        $depenseCategorie = $this->doctrine->getRepository(Depenses::class)->findOneBy(["id"=>$informationuser["idDepenseCategorie"]]);


        $ChargeExt = new ChargeExt();

        $ChargeExt->setName($informationuser["chargeName"]);
        $ChargeExt->setFinancementDepense($FinancementDepense);
        
        $this->entityManager->persist($ChargeExt);

        $FinancementEtCharges->addChargeExt($ChargeExt);

        $depenseCategorie->addChargeExt($ChargeExt);

        $this->entityManager->flush();

        return $this->json(["idChargeExt" => $ChargeExt->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/charges-extairne/edit-charge/{idChargeExt}", name: 'EditCharge', methods: ['PUT'])]
    public function EditCharge(Request $request, $idProjet, $idChargeExt)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findOneBy(["financementDepense"=>$FinancementDepense,"id" => $idChargeExt, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChargeExt) {
            return new Response("charge n'existe pas");
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $ChargeExt->setName($informationuser["chargeName"]);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        return $this->json(["idChargeExt" => $ChargeExt->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/charges-extairne/montant-chargeExt/add", name: 'addMontantToCharge', methods: ['POST'])]
    public function addMontantToActivite(Request $request, $idProjet)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        if(isset($informationuser["montantName"]) and $informationuser["montantName"] != null){
            
            $montant = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($informationuser["montantName"]),"deleted"=>0]);
            
            if(!$montant){
                $montant = new ProjetAnnees();
                $montant->setAnnee(trim($informationuser["montantName"]));
                $montant->setProjet($Projet);
                $this->entityManager->persist($montant);    
            }

            $montant->setFinancementEtCharges($FinancementEtCharges);
            $montant->setFinancementDepense($FinancementDepense);
            $this->entityManager->flush();

        }else{
            return new Response("montantName est oblig");

        }

    
        return $this->json(["idMontant" => $montant->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/charges/extairne/edit-montant/{idMontant}", name: 'EditMontantExt', methods: ['PUT'])]
    public function EditMontantExt(Request $request, $idProjet, $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);

        if (isset($informationuser["montantName"])) $montant->setName($informationuser["montantName"]);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        return $this->json(["idMontant" => $montant->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/charges-extairne/charge/montant/{idMontant}/month-chrgeExt", name: 'AddEditMonthChargeExt', methods: ['POST', 'PUT'])]
    public function AddEditMonthChargeExt(Request $request, $idProjet,  $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);


        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);
        
        if (!$montant) {
            return new Response("montant n'existe pas", 400);
        }


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        foreach ($informationuser as $idChargeExt => $item) {

            $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findOneBy(["id" => $idChargeExt, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

            $MonthChargeExt =  $this->doctrine->getRepository(MonthChargeExt::class)->findOneBy(["chargeExt" => $ChargeExt, "projetAnnees" => $montant, "deleted" => 0]);
            if (!$MonthChargeExt) {
                $MonthChargeExt = new MonthChargeExt();
                $MonthChargeExt->setFinancementDepense($FinancementDepense);
            }
            $MonthChargeExt = $this->addEditMonthToChargeExt($item, $MonthChargeExt);

            if (gettype($MonthChargeExt) != "object") {
                return new Response($MonthChargeExt, 400);
            }

            if (!$MonthChargeExt->getId()) {

                $MonthChargeExt->setChargeExt($ChargeExt);
                $MonthChargeExt->setProjetAnnees($montant);
                $this->entityManager->persist($MonthChargeExt);
            } else {
                $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
            }
            $this->entityManager->flush();
        }
        $MonthChargeExtExist =  $this->doctrine->getRepository(MonthChargeExt::class)->findBy(["FinancementDepense" =>$FinancementDepense , "deleted" => 0]);
        if (count($MonthChargeExtExist) > 0 ) {
            $FinancementDepense->setAvancement(1);
             $this->entityManager->flush();
        }
        return $this->json(["idMontant" => $montant->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/get-all-charge", name: 'getAllCharges', methods: ['GET'])]
    public function getAllCharges(Request $request, $idProjet)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);
        
        $categorieDesponses=[];
        $depenseCategorieListe = $this->doctrine->getRepository(Depenses::class)->findAll();
         foreach($depenseCategorieListe as $depenses){
            $categorieDesponses[]=[
                "id"=>$depenses->getId(),
                "name"=>$depenses->getName()
            ];
         }
        $montantAnnee = [];
        $ChargeExt =  $this->ChargeExtRepository->getAllChargeExt($FinancementEtCharges->getId(),$FinancementDepense->getId());

        $montantAnnee["montantAnnee"] = $this->ProjetAnneesRepository->findProjetAnneesChargeExt($FinancementEtCharges->getId(),$FinancementDepense->getId());
        $montantAnnee["ChargeExt"] = $ChargeExt;
        $valeur = $this->MonthChargeExtRepository->findAllMonthChargeExtSum($FinancementEtCharges->getId());

        return $this->json(['ChargeExt' => $ChargeExt, "montantAnneeListe" => $montantAnnee, "valeurListe" => $valeur,"categorieDesponses"=>$categorieDesponses]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/get-one-charge/{idChargeExt}/montant/{idMontant}", name: 'getOneCharge', methods: ['GET'])]
    public function getOneCharge(Request $request, $idProjet, $idChargeExt, $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);

        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findOneBy(["financementDepense"=>$FinancementDepense,"id" => $idChargeExt, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChargeExt) {

            return new Response("ChargeExt n'existe pas", 400);
        }

        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);
        if (!$montant) {
            return new Response("montant n'existe pas", 400);

            if (!$montant) {
                return new Response("montant n'existe pas", 400);
            }
            $monthValeur = $this->MonthChargeExtRepository->findOneMonthChargeExtSum($ChargeExt->getId(), $montant->getId());

            return $this->json(['ChargeExtId' => $ChargeExt->getId(), "montantAnneeeId" => $montant->getId(), "monthValeurListe" => $monthValeur]);
        }
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/get-one-charge/montant/{idMontant}", name: 'getOneMontantAnnee', methods: ['GET'])]
    public function getOneMontantAnnee(Request $request, $idProjet, $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findBy(["financementDepense"=>$FinancementDepense,"financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);

        if (!$montant) {
            return new Response("montant n'existe pas", 400);
        }

        $montantAnnee = [];

        foreach ($ChargeExt as $key => $charge) {
            $MonthChargeExt =  $this->doctrine->getRepository(MonthChargeExt::class)->findOneBy(["chargeExt" => $charge, "projetAnnees" => $montant, "deleted" => 0]);
            $montantAnnee[] = [
                "charegId" => $charge->getId(),
                "charegName" => $charge->getName(),
                "Jan" => $MonthChargeExt?->getJan(),
                "Frv" => $MonthChargeExt?->getFrv(),
                "Mar" => $MonthChargeExt?->getMar(),
                "Avr" => $MonthChargeExt?->getAvr(),
                "Mai" => $MonthChargeExt?->getMai(),
                "Juin" => $MonthChargeExt?->getJuin(),
                "Juil" => $MonthChargeExt?->getJuil(),
                "Aou" => $MonthChargeExt?->getAou(),
                "Sept" => $MonthChargeExt?->getSept(),
                "Oct" => $MonthChargeExt?->getOct(),
                "Nov" => $MonthChargeExt?->getNov(),
                "Dece" => $MonthChargeExt?->getDece(),
                "idMonth" => $MonthChargeExt?->getId()
            ];
        }

        return $this->json(['idMontantAnnee' => $idMontant, 'nameMontantAnnee' => $montant->getName(), "montantAnnee" => $montantAnnee]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/get-charge-monthListe/montant/{idMontant}", name: 'getMonthChargeByMontantAnnee', methods: ['GET'])]
    public function getMonthChargeByMontantAnnee(Request $request, $idProjet, $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);
        if (!$montant) {

            return new Response("montant n'existe pas", 400);
        }


        $monthValeur = $this->MonthChargeExtRepository->getMonthChargeByMontantAnneeId($montant->getId());

        return $this->json(["montantAnneeeId" => $idMontant, "monthValeurListe" => $monthValeur]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/deleted/montant/{idMontant}", name: 'deletedMontantAnnee', methods: ['DELETE'])]
    public function deletedMontantAnnee(Request $request, $idProjet, $idMontant)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $montant =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["financementDepense"=>$FinancementDepense,"FinancementEtCharges" => $FinancementEtCharges, "id" => $idMontant, "deleted" => 0]);
        if (!$montant) {

            return new Response("montant n'existe pas", 400);
        }
       
        $FinancementDepense?->removeAnneeProjet($montant);

        $this->entityManager->flush();

        foreach($montant-> getMonthChargeExt() as $item){
            $item->setDeleted(true);
            $this->entityManager->flush();
        }

        $MonthChargeExtExist =  $this->doctrine->getRepository(MonthChargeExt::class)->findBy(["FinancementDepense" =>$FinancementDepense , "deleted" => 0]);
        if (count($MonthChargeExtExist) > 0 ) {
            $FinancementDepense->setAvancement(1);
             $this->entityManager->flush();
        }else{
            $FinancementDepense->setAvancement(0);
             $this->entityManager->flush();
        }
        return new Response("ok", 200);
    }




    #[Route("/api/{idProjet}/business-plan/financement-charges/charge-extairne/supp-charge/{idChargeExt}", name: 'deletedCharge', methods: ['DELETE'])]
    public function deletedCharge($idChargeExt, $idProjet, Request $request)
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
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementDepense = $this->checkFinancementDepense($FinancementEtCharges);

        $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findOneBy(["financementDepense"=>$FinancementDepense,"id" => $idChargeExt, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$ChargeExt) {
            return new Response("Charge n'existe pas", 400);
        }
        foreach($ChargeExt-> getMonthChargeExt() as $item){
            $item->setDeleted(true);
            $this->entityManager->flush();
        }

        
        $ChargeExt->setDeleted(1);
        $this->entityManager->flush();

        $MonthChargeExtExist =  $this->doctrine->getRepository(MonthChargeExt::class)->findBy(["FinancementDepense" =>$FinancementDepense , "deleted" => 0]);
        if (count($MonthChargeExtExist) > 0 ) {
            $FinancementDepense->setAvancement(1);
             $this->entityManager->flush();
        }else{
            $FinancementDepense->setAvancement(0);
             $this->entityManager->flush();
        }

        return new Response(200);
    }

    public function addEditMonthToChargeExt($informationuser, $MonthChargeExt)
    {
        $sum = 0;
        $erreur = [];

        if (isset($informationuser["montantJan"])) {
            $MonthChargeExt->setJan($informationuser["montantJan"]);
            $sum += (float)$informationuser["montantJan"];
        } else {
            return "January Value is required";
        }

        if (isset($informationuser["montantFrv"])) {
            $MonthChargeExt->setFrv($informationuser["montantFrv"]);
            $sum += (float)$informationuser["montantFrv"];
        } else {
            return "February Value is required";
        }

        if (isset($informationuser["montantMar"])) {
            $MonthChargeExt->setMar($informationuser["montantMar"]);
            $sum += (float)$informationuser["montantMar"];
        } else {
            return "March Value is required";
        }

        if (isset($informationuser["montantAvr"])) {
            $MonthChargeExt->setAvr($informationuser["montantAvr"]);
            $sum += (float)$informationuser["montantAvr"];
        } else {
            return "April Value is required";
        }

        if (isset($informationuser["montantMai"])) {
            $MonthChargeExt->setMai($informationuser["montantMai"]);
            $sum += (float)$informationuser["montantMai"];
        } else {
            return "Mai Value is required";
        }

        if (isset($informationuser["montantJuin"])) {
            $MonthChargeExt->setJuin($informationuser["montantJuin"]);
            $sum += (float)$informationuser["montantJuin"];
        } else {
            return "June Value is required";
        }

        if (isset($informationuser["montantJuil"])) {
            $MonthChargeExt->setJuil($informationuser["montantJuil"]);
            $sum += (float)$informationuser["montantJuil"];
        } else {
            return "July Value is required";
        }

        if (isset($informationuser["montantAou"])) {
            $MonthChargeExt->setAou($informationuser["montantAou"]);
            $sum += (float)$informationuser["montantAou"];
        } else {
            return "August Value is required";
        }

        if (isset($informationuser["montantSept"])) {
            $MonthChargeExt->setSept($informationuser["montantSept"]);
            $sum += (float)$informationuser["montantSept"];
        } else {
            return "September Value is required";
        }

        if (isset($informationuser["montantOct"])) {
            $MonthChargeExt->setOct($informationuser["montantOct"]);
            $sum += (float)$informationuser["montantOct"];
        } else {
            return "October Value is required";
        }

        if (isset($informationuser["montantNov"])) {
            $MonthChargeExt->setNov($informationuser["montantNov"]);
            $sum += (float)$informationuser["montantNov"];
        } else {
            return "November Value is required";
        }

        if (isset($informationuser["montantDece"])) {
            $MonthChargeExt->setDece($informationuser["montantDece"]);
            $sum += (float)$informationuser["montantDece"];
        } else {
            return "December Value is required";
        }

        if (count($erreur) == 0) {
            $MonthChargeExt->setVolume($sum);
        } else {
            return $erreur[0];
        }

        return $MonthChargeExt;
    }

    public function checkFinancementDepense($FinancementEtCharges)
    {
        if ($FinancementEtCharges ->getFinancementDepense()) {
            $FinancementDepense = $FinancementEtCharges ->getFinancementDepense();
        } else {
            $FinancementDepense = new FinancementDepense();
            $this->entityManager->persist($FinancementDepense);
            $FinancementEtCharges->setFinancementDepense($FinancementDepense);
            $this->entityManager->flush();
        }
        return $FinancementDepense;
    }
}
