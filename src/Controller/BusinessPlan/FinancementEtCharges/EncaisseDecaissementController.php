<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\ChargeExt;
use App\Entity\EncaisseDecaissement;
use App\Entity\FinancementEncaisseDecaissement;
use App\Entity\FinancementEtCharges;
use App\Entity\ProjetAnnees;
use App\Entity\MonthChargeExt;
use App\Entity\MontheListeEncaisseDecaissement;
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
use ContainerN7s8nOR\getEncaisseDecaissementControllerService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use PhpParser\Node\Expr\New_;
use Symfony\Component\HttpFoundation\Request;

class EncaisseDecaissementController extends AbstractController
{
    private $UserRepository;
    private $ProjetAnneesRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    const PERMISSION ="financement_charge";


    public function __construct(ProjetAnneesRepository $ProjetAnneesRepository, ManagerRegistry $doctrine, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetAnneesRepository = $ProjetAnneesRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/financement-encaisse-decaissement/addAnnee", name: 'AjouteAnneefin', methods: ['POST'])]
    public function AjouteAnneefin(Request $request, $idProjet)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        
        $annee = $this->ProjetAnneesRepository->findOneBy(["annee"=> trim($informationuser['anneeProjet']),"projet"=>$Projet,"deleted"=>0]);
        
        if (!$annee) {            
            $annee = new ProjetAnnees();
            $annee->setProjet($Projet);
            $annee->setAnnee(trim($informationuser['anneeProjet']));
            $this->entityManager->persist($annee);   
        }

        $annee->setFinancementEtCharges($FinancementEtCharges);
        $FinancementEncaisseDecaissement->addAnneeProjet($annee);
        
        $this->entityManager->flush();
        


        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);
        return $this->json($annee->getId());
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/all-encaisse-decaissement/get-all", name: 'getAllAnneeWithEncaisseDecaissement', methods: ['GET'])]
    public function getAllAnneeWithEncaisseDecaissement(Request $request, $idProjet)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );

        $annees = $this->ProjetAnneesRepository->findBy(["financementEncaisseDecaissement"=>$FinancementEncaisseDecaissement,"deleted"=>0]);
         
        $lietsFinancementEncaisseDecaissement = [];

        foreach($annees as $annee){
            $listeEncaisseDecaissement = [];

            $EncaisseDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees"=>$annee,"financementEncaisseDecaissement" => $FinancementEncaisseDecaissement, "deleted" => 0]);

            $listeEncaisseDecaissement = $this->getEncaisseDecaissement($EncaisseDecaissement,$annee);


            $lietsFinancementEncaisseDecaissement[] =[
                    "idAnnee"=>$annee->getId(),
                    "AnneeName"=>$annee->getAnnee(),
                    "listeEncaisseDecaissement"=>$listeEncaisseDecaissement
                ] ;
        }
        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json(["lietsFinancementEncaisseDecaissement" => $lietsFinancementEncaisseDecaissement]);
    }




    #[Route("/api/{idProjet}/business-plan/financement-charges/encaisse-decaissement/{type}/annee/{anneeProjet}", name: 'getOneEncaisseDecaissementForAnnee', methods: ['GET'])]
    public function getOneEncaisseDecaissementForAnnee(Request $request, $idProjet, $anneeProjet,$type)
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
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );

        $annee = $this->ProjetAnneesRepository->findOneBy(["id"=> $anneeProjet,"financementEncaisseDecaissement"=>$FinancementEncaisseDecaissement,"deleted"=>0]);

        if (!$annee) {
            return new Response("annee n'existe pas", 400);
        }
        
       
        $EncaisseDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees"=>$annee,"financementEncaisseDecaissement" => $FinancementEncaisseDecaissement,"type"=>$type, "deleted" => 0]);
        $listeEncaisseDecaissement = $this->getEncaisseDecaissement($EncaisseDecaissement,$annee);
        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json(['annee' => $annee->getId(), 'nameAnnee' => $annee->getAnnee(), "listeEncaisseDecaissement" => $listeEncaisseDecaissement]);
    }
    
    #[Route("/api/{idProjet}/business-plan/financement-charges/encaisse-decaissement/{type}/get-all", name: 'getAllEncaissDecaissement', methods: ['GET'])]
    public function getAllEncaissDecaissement(Request $request, $idProjet,$type)
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
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );


        $annees = $this->ProjetAnneesRepository->findBy(["financementEncaisseDecaissement"=>$FinancementEncaisseDecaissement,"deleted"=>0]);

        $lietsFinancementEncaisseDecaissement = [];
        
        foreach($annees as $annee){
            $listeEncaisseDecaissement = [];

            $EncaisseDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees"=>$annee,"financementEncaisseDecaissement" => $FinancementEncaisseDecaissement,"type"=>$type, "deleted" => 0]);

            $listeEncaisseDecaissement = $this->getEncaisseDecaissement($EncaisseDecaissement,$annee);


            $lietsFinancementEncaisseDecaissement[] =[
                    "idAnnee"=>$annee->getId(),
                    "AnneeName"=>$annee->getAnnee(),
                    "listeEncaisseDecaissement"=>$listeEncaisseDecaissement
                ] ;
        }
        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json(["lietsFinancementEncaisseDecaissement" => $lietsFinancementEncaisseDecaissement]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/encaisse-decaissement/{type}/annee/{anneeProjet}/add", name: 'AjouteEncaissDecaissement', methods: ['POST'])]
    public function AjouteEncaissDecaissement(Request $request, $idProjet,$anneeProjet,$type)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );
 
        $annee = $this->ProjetAnneesRepository->findOneBy(["id"=>$anneeProjet,"financementEncaisseDecaissement"=>$FinancementEncaisseDecaissement,"deleted"=>0]);
        

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $EncaissDecaissement = new EncaisseDecaissement();
     
        if(isset($informationuser["name"])){
            $EncaissDecaissement->setName($informationuser["name"]);
        }else{
            return new Response("name est oblig", 400);
        }

        $EncaissDecaissement->setFinancementEtCharges($FinancementEtCharges);

        if(in_array($type,["encaissement","decaissement"])){
          
            $EncaissDecaissement->setType($type);

        }else{
            return new Response("type doit etre encaissement ou decaissement", 400);

        }
        $EncaissDecaissement->setProjetAnnees($annee);
        $this->entityManager->persist($EncaissDecaissement);
        $FinancementEncaisseDecaissement->addEncaisseDecaissement($EncaissDecaissement);

        $this->entityManager->flush();

        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);
        
        return $this->json($EncaissDecaissement->getId());
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/encaisse-decaissement/edit/{idEncaissDecaissement}", name: 'EditEncaissDecaissement', methods: ['PUT'])]
    public function EditEncaissDecaissement(Request $request, $idProjet,$idEncaissDecaissement)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $EncaissDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findOneBy(["id" => $idEncaissDecaissement, "financementEncaisseDecaissement" => $FinancementEncaisseDecaissement, "deleted" => 0]);
        
        if(isset($informationuser["name"]) and $informationuser["name"] !=""){
            $EncaissDecaissement->setName($informationuser["name"]);
        }else{
            return new Response("name est oblig", 400);
        }

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json($EncaissDecaissement->getId());
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/annee/{anneeProjet}/encaisse-decaissement/monthEncaissDecaissement", name: 'addEditMonthEncaissDecaissement', methods: ['POST'])]
    public function addEditMonthEncaissDecaissement(Request $request, $idProjet,$anneeProjet)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );
         
        $annee = $this->ProjetAnneesRepository->findOneBy(["id"=> $anneeProjet,"FinancementEtCharges"=>$FinancementEtCharges]);
        
        if(!$annee){
            return new Response("annee n'existe pas",400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
       
        foreach($informationuser as $idEncaissDecaissement => $value){
        
   
        $EncaissDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findOneBy(["projetAnnees"=>$annee,"id" => $idEncaissDecaissement, "financementEncaisseDecaissement" => $FinancementEncaisseDecaissement, "deleted" => 0]);
      
        if(!$EncaissDecaissement){
            continue;
        }


        $MontheListeEncaisseDecaissement =  $this->doctrine->getRepository(MontheListeEncaisseDecaissement::class)->findOneBy(["projetAnnees" => $annee, "EncaisseDecaissement" => $EncaissDecaissement]);
        $update = false;
       
        if(!$MontheListeEncaisseDecaissement ){
            $MontheListeEncaisseDecaissement = new MontheListeEncaisseDecaissement();
        }else{
            $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
            $update = true;
        }

        if (isset($value["montantJan"])) {
            $MontheListeEncaisseDecaissement->setJan($value["montantJan"]);
        } else {
            return New Response( "January Value is required",400);
        }

        if (isset($value["montantFrv"])) {
            $MontheListeEncaisseDecaissement->setFrv($value["montantFrv"]);
        } else {
            return New Response( "February Value is required",400);
        }

        if (isset($value["montantMar"])) {
            $MontheListeEncaisseDecaissement->setMar($value["montantMar"]);
        } else {
            return New Response( "March Value is required",400);
        }

        if (isset($value["montantAvr"])) {
            $MontheListeEncaisseDecaissement->setAvr($value["montantAvr"]);
        } else {
            return New Response( "April Value is required",400);
        }

        if (isset($value["montantMai"])) {
            $MontheListeEncaisseDecaissement->setMai($value["montantMai"]);
        } else {
            return New Response( "Mai Value is required",400);
        }

        if (isset($value["montantJuin"])) {
            $MontheListeEncaisseDecaissement->setJuin($value["montantJuin"]);
        } else {
            return New Response( "June Value is required",400);
        }

        if (isset($value["montantJuil"])) {
            $MontheListeEncaisseDecaissement->setJuil($value["montantJuil"]);
        } else {
            return New Response( "July Value is required",400);
        }

        if (isset($value["montantAou"])) {
            $MontheListeEncaisseDecaissement->setAou($value["montantAou"]);
        } else {
            return New Response( "August Value is required",400);
        }

        if (isset($value["montantSept"])) {
            $MontheListeEncaisseDecaissement->setSept($value["montantSept"]);
        } else {
            return New Response( "September Value is required",400);
        }

        if (isset($value["montantOct"])) {
            $MontheListeEncaisseDecaissement->setOct($value["montantOct"]);
        } else {
            return New Response( "October Value is required",400);
        }

        if (isset($value["montantNov"])) {
            $MontheListeEncaisseDecaissement->setNov($value["montantNov"]);
        } else {
            return New Response( "November Value is required",400);
        }

        if (isset($value["montantDece"])) {
            $MontheListeEncaisseDecaissement->setDece($value["montantDece"]);
        } else {
             return New Response( "December Value is required",400);
        }
        if($update == false){
            
            $MontheListeEncaisseDecaissement->setProjetAnnees( $annee);
            $MontheListeEncaisseDecaissement->setEncaisseDecaissement($EncaissDecaissement);

            $this->entityManager->persist($MontheListeEncaisseDecaissement);
        }

        $this->entityManager->flush();
    }
    $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json("ok!",200);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/encaisse-decaissement/supprimer/{idEncaissDecaissement}", name: 'supprimerEncaissDecaissement', methods: ['DELETE'])]
    public function supprimerEncaissDecaissement(Request $request, $idProjet,$idEncaissDecaissement)
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

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $FinancementEncaisseDecaissement = $this->checkFinancementEncaisseDecaissement($FinancementEtCharges );

        $EncaissDecaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findOneBy(["id" => $idEncaissDecaissement, "financementEncaisseDecaissement" => $FinancementEncaisseDecaissement, "deleted" => 0]);
        
        
        $EncaissDecaissement->setDeleted(1);
       

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        $this->avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);

        return $this->json("ok!");
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


    public function checkFinancementEncaisseDecaissement($FinancementEtCharges )
    {
        if ($FinancementEtCharges ->getFinancementEncaisseDecaissement()) {
            $FinancementEncaisseDecaissement = $FinancementEtCharges ->getFinancementEncaisseDecaissement();
        } else {
            $FinancementEncaisseDecaissement = new FinancementEncaisseDecaissement();
            $this->entityManager->persist($FinancementEncaisseDecaissement);
            $FinancementEtCharges->setFinancementEncaisseDecaissement($FinancementEncaisseDecaissement);
            $this->entityManager->flush();
        }
        return $FinancementEncaisseDecaissement;
    }

    public function getEncaisseDecaissement($EncaisseDecaissement,$annee){
        $listeEncaisseDecaissement = [];
        $sumMonthValue = 0;
        
        foreach ($EncaisseDecaissement as $key => $item) {
            $MonthListeValue=[];
            $Monthe =  $this->doctrine->getRepository(MontheListeEncaisseDecaissement::class)->findOneBy(["EncaisseDecaissement" => $item, "projetAnnees" => $annee]);
            $AllMonthValue = 0;
            if($Monthe){
                $AllMonthValue += $Monthe?->getJan()+$Monthe?->getFrv()+$Monthe?->getMar()+$Monthe?->getAvr()+$Monthe?->getMai()+$Monthe?->getJuin();
                $AllMonthValue += $Monthe?->getJuil()+$Monthe?->getAou()+$Monthe?->getSept()+$Monthe?->getOct()+$Monthe?->getNov()+$Monthe?->getDece();
                $MonthListeValue[] = [
                    "Jan" => $Monthe?->getJan(),
                    "Frv" => $Monthe?->getFrv(),
                    "Mar" => $Monthe?->getMar(),
                    "Avr" => $Monthe?->getAvr(),
                    "Mai" => $Monthe?->getMai(),
                    "Juin" => $Monthe?->getJuin(),
                    "Juil" => $Monthe?->getJuil(),
                    "Aou" => $Monthe?->getAou(),
                    "Sept" => $Monthe?->getSept(),
                    "Oct" => $Monthe?->getOct(),
                    "Nov" => $Monthe?->getNov(),
                    "Dece" => $Monthe?->getDece(),
                    "AllMonthValue" =>$AllMonthValue,
                    "idMontheListe" => $Monthe?->getId()
                ];

                $sumMonthValue +=  $AllMonthValue;
            }
            
            $listeEncaisseDecaissement[]=[
                "EncaisseDecaissementId" => $item->getId(),
                "EncaisseDecaissementName" => $item->getName(),
                "type"=>$item->getType(),
                "sumEncaisseDecaissement" => $sumMonthValue,
                "MonthListeValue"=>$MonthListeValue
            ];
            $sumMonthValue = 0;

        }

        return $listeEncaisseDecaissement ;
   
    }

    public function avancementFinancementEncaisseDecaissement($FinancementEncaisseDecaissement){
        if(count ($FinancementEncaisseDecaissement->getAnneeProjet())>0){
            $FinancementEncaisseDecaissement->setAvancement(1) ;
        }else{
            $FinancementEncaisseDecaissement->setAvancement(0) ;
        }
        $this->entityManager->flush();


    }
}