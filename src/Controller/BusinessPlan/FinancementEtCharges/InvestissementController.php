<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\AnneeInvestissement;
use App\Entity\Collaborateur;
use App\Entity\FinancementEtCharges;
use App\Entity\FinancementInvestissement;
use App\Entity\Investissement;
use App\Entity\InvestissementMontant;
use App\Entity\InvestissementNature;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\SalaireEtchargeCollaborateur;
use App\Entity\SalaireEtchargeSocial;
use App\Repository\InvestissementRepository;
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
use Proxies\__CG__\App\Entity\ProjetAnnees as EntityProjetAnnees;
use Symfony\Component\HttpFoundation\Request;

class InvestissementController extends AbstractController
{
    private $UserRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $InvestissementRepository;
    const PERMISSION ="financement_charge";

    public function __construct(InvestissementRepository $InvestissementRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->InvestissementRepository = $InvestissementRepository;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/add", name: 'addAnneeInvestissement', methods: ['POST'])]
    public function addAnneeInvestissement(Request $request, $idProjet)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if(isset($informationuser["name"]) and $informationuser["name"] != null){
            $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($informationuser["name"]),"deleted"=>0]);
            
            if(!$ProjetAnnees){
                $ProjetAnnees = new ProjetAnnees();
                $ProjetAnnees->setAnnee(trim($informationuser["name"]));
                $ProjetAnnees->setProjet($Projet);
                $this->entityManager->persist($ProjetAnnees);
            }
            $ProjetAnnees->setFinancementInvestissement($FinancementInvestissement);
            $ProjetAnnees->setFinancementEtCharges($FinancementEtCharges);

            $this->entityManager->flush();


        }else{
            return new Response("annee est oblig", 404);            
        }
        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return $this->json(["AnneeInvestissementId" => $ProjetAnnees->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/get-one/{AnneeInvestissementId}", name: 'getAnneeInvestissement', methods: ['GET'])]
    public function getAnneeInvestissement(Request $request, $idProjet, $AnneeInvestissementId)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        if (!$FinancementEtCharges) {
            return $this->json(["FinancementEtCharges" => []]);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"id"=>$AnneeInvestissementId,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        if (!$AnneeInvestissement) {
            return $this->json(["AnneeInvestissement" => []]);
        }

        $Investissement = $this->InvestissementRepository->findInvestissementByAnneeInvestissementId($AnneeInvestissement->getId());
        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return $this->json([
            "AnneeInvestissementId" => $AnneeInvestissement->getId(),
            "AnneeInvestissementName" => $AnneeInvestissement->getAnnee(),
            "Investissement" => $Investissement
        ]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/get/all", name: 'getAllAnneeInvestissement', methods: ['GET'])]
    public function getAllAnneeInvestissement(Request $request, $idProjet)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);
       

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet"=>$Projet,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0],["id"=>"DESC"]);
        $NatureInvesstissements =  $this->doctrine->getRepository(InvestissementNature::class)->findAll();
        $NatureInvesstissementsListe = [];
        foreach($NatureInvesstissements as $itemNature){
            $NatureInvesstissementsListe[] = [
                "id"=>$itemNature->getId(),
                "name"=>$itemNature->getName()
            ];
        }
        
        if (count($AnneeInvestissement) == 0) {
            return $this->json(["AnneeInvestissement" => [],"NatureInvesstissementsListe"=>$NatureInvesstissementsListe]);
        }
      
        foreach ($AnneeInvestissement as $item) {
            $AnneeInvestissementListe[] = [
                "AnneeInvestissementId" => $item->getId(),
                "AnneeInvestissementName" => $item->getAnnee(),
                "Investissement" => $this->InvestissementRepository->findInvestissementByAnneeInvestissementId($item->getId()),
            ];
        }     
        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }   

        return $this->json([
            $AnneeInvestissementListe,
            "NatureInvesstissementsListe"=>$NatureInvesstissementsListe

        ]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/{AnneeInvestissementId}/add-investissement", name: 'addInvestissement', methods: ['POST'])]
    public function addInvestissement(Request $request, $idProjet, $AnneeInvestissementId)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        if (!$FinancementEtCharges) {
            return new Response("Financement Et Charges n'existe pas", 400);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"id"=>$AnneeInvestissementId,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);

        if (!$AnneeInvestissement) {
            return new Response("Annee Investissement n'existe pas", 400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $Investissement = new Investissement();
        $Investissement->setName($informationuser["name"]);

        $Investissement->setNature($informationuser["nature"]);
        
        $Investissement->setDuree($informationuser["duree"]);
        $Investissement->setApportEnNature($informationuser["apportEnNature"]);
        $Investissement->setProjetAnnees($AnneeInvestissement);
        $Investissement->setFinancementInvestissement($FinancementInvestissement);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->persist($Investissement);
        
        if(isset($informationuser["idNatureInvestissement"])){
            $NatureInvesstissement =  $this->doctrine->getRepository(InvestissementNature::class)->find($informationuser["idNatureInvestissement"]);
            if($NatureInvesstissement){
                $NatureInvesstissement->addInvestissement($Investissement);
            }
        }else{
            return new Response("Nature d'investissement est oblig",400);
        }

       

        $this->entityManager->flush();
        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return $this->json(["InvestissementId" => $Investissement->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/{AnneeInvestissementId}/edit-investissement/{idInvestissement}", name: 'editInvestissement', methods: ['PUT'])]
    public function editInvestissement(Request $request, $idProjet, $AnneeInvestissementId, $idInvestissement)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        if (!$FinancementEtCharges) {

            return new Response("Financement Et Charges n'existe pas", 400);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"id"=>$AnneeInvestissementId,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (!$AnneeInvestissement) {
            return new Response("Annee Investissement n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $Investissement =  $this->doctrine->getRepository(Investissement::class)->findOneBy(["id" => $idInvestissement, "projetAnnees" => $AnneeInvestissement, "deleted" => 0]);


        if (isset($informationuser["name"])) $Investissement->setName($informationuser["name"]);
        if (isset($informationuser["nature"])) $Investissement->setNature($informationuser["nature"]);
        if (isset($informationuser["duree"])) $Investissement->setDuree($informationuser["duree"]);
        if (isset($informationuser["apportEnNature"])) $Investissement->setApportEnNature($informationuser["apportEnNature"]);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return $this->json(["InvestissementId" => $Investissement->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/{AnneeInvestissementId}/deleted-investissement/{idInvestissement}", name: 'deletdInvestissement', methods: ['DELETE'])]
    public function deletdInvestissement(Request $request, $idProjet, $AnneeInvestissementId, $idInvestissement)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);

        if (!$FinancementEtCharges) {
            return new Response("Financement Et Charges n'existe pas", 400);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["id" => $AnneeInvestissementId, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$AnneeInvestissement) {
            return new Response("Annee Investissement n'existe pas", 400);
        }

        $Investissement =  $this->doctrine->getRepository(Investissement::class)->findOneBy(["id" => $idInvestissement, "projetAnnees" => $AnneeInvestissement, "deleted" => 0]);

        $Investissement->setDeleted(1);

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return new Response(201);
    }





    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/{AnneeInvestissementId}/investissement/{idInvestissement}/add-montant", name: 'addMontantInvestissement', methods: ['POST'])]
    public function addMontantInvestissement(Request $request, $idProjet, $AnneeInvestissementId, $idInvestissement)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        if (!$FinancementEtCharges) {
            return new Response("Financement Et Charges n'existe pas", 400);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"id"=>$AnneeInvestissementId,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);

        if (!$AnneeInvestissement) {
            return new Response("Annee Investissement n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $Investissement =  $this->doctrine->getRepository(Investissement::class)->findOneBy(["id" => $idInvestissement, "projetAnnees" => $AnneeInvestissement, "deleted" => 0]);

        if (!$Investissement) {
            return new Response("Investissement n'existe pas", 400);
        }


        if ($Investissement->getInvestissementMontant()) {
            $investissementMontant = $Investissement->getInvestissementMontant();
            $investissementMontant->setMontant((float)$informationuser["montant"]);
        } else {
            $investissementMontant = new InvestissementMontant();
            $investissementMontant->setMontant((float)$informationuser["montant"]);
            $this->entityManager->persist($investissementMontant);
            $Investissement->setInvestissementMontant($investissementMontant);
            $Investissement->setFinancementInvestissement($FinancementInvestissement);
        }
        $this->entityManager->flush();

        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }

        return $this->json(["investissementMontant" => $investissementMontant->getId()]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/annee-investissement/{AnneeInvestissementId}/investissement/{idInvestissement}/edit-montant/{investissementMontantId}", name: 'editMontantInvestissement', methods: ['PUT'])]
    public function editMontantInvestissement(Request $request, $idProjet, $AnneeInvestissementId, $idInvestissement, $investissementMontantId)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementInvestissement =$this->checkFinancementInvestissement($FinancementEtCharges);


        if (!$FinancementEtCharges) {
            return new Response("Financement Et Charges n'existe pas", 400);
        }

        $AnneeInvestissement =  $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet"=>$Projet,"financementInvestissement" => $FinancementInvestissement, "deleted" => 0],["id"=>"DESC"]);

        if (!$AnneeInvestissement) {
            return new Response("Annee Investissement n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $Investissement =  $this->doctrine->getRepository(Investissement::class)->findOneBy(["id" => $idInvestissement, "projetAnnees" => $AnneeInvestissement, "deleted" => 0]);

        if (!$Investissement) {
            return new Response("Investissement n'existe pas", 400);
        }

        $investissementMontant = $this->doctrine->getRepository(InvestissementMontant::class)->findOneBy(["id" => $investissementMontantId, "Investissement" => $Investissement]);
        if (!$investissementMontant) {
            return new Response("montant d'investissement n'existe pas", 400);
        }

        if (isset($informationuser["montant"])) $investissementMontant->setMontant((float)$informationuser["montant"]);
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        $Investissements=  $this->doctrine->getRepository(Investissement::class)->findBy(["financementInvestissement" => $FinancementInvestissement, "deleted" => 0]);
        
        if (count($Investissements) > 0 ) {
            $FinancementInvestissement->setAvancement(1);
             $this->entityManager->flush();

        }else{
            $FinancementInvestissement->setAvancement(0);
             $this->entityManager->flush();
        }
        return $this->json(["investissementMontant" => $investissementMontant->getId()]);
    }

    public function checkFinancementEtCharges($Projet, $BusinessPlan)
    {
        if ($BusinessPlan->getFinancementEtCharges()) {
            $FinancementEtCharges = $BusinessPlan->getFinancementEtCharges();
        } else {
            $FinancementEtCharges = new FinancementEtCharges();
            $this->entityManager->persist($FinancementEtCharges);
            $BusinessPlan->setFinancementEtCharges($FinancementEtCharges);
            $Projet->getBusinessPlan()->setAvancement($Projet->getBusinessPlan()->getAvancement() + 1);
            $this->entityManager->flush();
        }
        return $FinancementEtCharges;
    }


    public function checkFinancementInvestissement($FinancementEtCharges)
    {
        if ($FinancementEtCharges ->getFinancementInvestissement()) {
            $FinancementInvestissement = $FinancementEtCharges ->getFinancementInvestissement();
        } else {
            $FinancementInvestissement = new FinancementInvestissement();
            $this->entityManager->persist($FinancementInvestissement);
            $FinancementEtCharges->setFinancementInvestissement($FinancementInvestissement);
            
            $this->entityManager->flush();
        }
        return $FinancementInvestissement;
    }
}
