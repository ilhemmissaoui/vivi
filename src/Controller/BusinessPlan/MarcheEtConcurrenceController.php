<?php

namespace App\Controller\BusinessPlan;

use App\Entity\Equipe;
use App\Entity\HistoireEtEquipe;
use App\Entity\MarcheEtConcurrence;
use App\Entity\Projet;
use App\Entity\Societe;
use App\Repository\MarcheEtConcurrenceRepository;
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

class MarcheEtConcurrenceController extends AbstractController
{
    private $UserRepository;
    private $ProjetRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $MarcheEtConcurrenceRepository; 
    const PERMISSION = "marche_concurrence";

    public function __construct(MarcheEtConcurrenceRepository $MarcheEtConcurrenceRepository,ManagerRegistry $doctrine,ProjetRepository $ProjetRepository,SendEmail $sendEmail,EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->MarcheEtConcurrenceRepository = $MarcheEtConcurrenceRepository;
    }

    #[Route('/api/{idProjet}/business-plan/marche-concurrence/probleme', name:'probleme', methods: ['POST','PUT'])]
    public function marcheConcurrenceProbleme($idProjet,Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        } 
        
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
                            
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);        
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }


        if(!$Projet){
            return new Response("Projet n'existe pas");
        }

        $MarcheEtConcurrence =$this->vivitoolsService->check_MarcheEtConcurrence($Projet);
                        

        if (!$MarcheEtConcurrence->getProblem() ) {
            $MarcheEtConcurrence->setAvancement($MarcheEtConcurrence->getAvancement() + 1);
        }

        if ($MarcheEtConcurrence->getProblem() and ($informationuser["probleme"] == "" or $informationuser["probleme"] == null)) {
            $MarcheEtConcurrence->setAvancement($MarcheEtConcurrence->getAvancement() - 1);
        }

        $MarcheEtConcurrence->setProblem($informationuser["probleme"]);
        if ($request->isMethod('PUT')) {
            $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        }
        $this->entityManager->flush();
        $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);

        return $this->json(["status" => '200',"avancement"=>$avancement]);     
    }



    #[Route("/api/{idProjet}/business-plan/marche-concurrence/probleme", name:'getProbleme', methods: ['GET'])]
    public function getProbleme($idProjet,Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }
             
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);        
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if(!$Projet){
            return new Response("Projet n'existe pas");
        }
        $MarcheEtConcurrence =$this->vivitoolsService->check_MarcheEtConcurrence($Projet);

        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
        }else{
            return $this->json(["probleme"=>"","avancement"=>0 ]);   

        }
        $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);

        
        return $this->json(["probleme"=>$MarcheEtConcurrence->getProblem(),"avancement"=>$avancement ]);   
    }



    #[Route("/api/{idProjet}/business-plan/marche-concurrence/societe/add", name:'addSociete', methods: ['POST'])]
    public function addSociete($idProjet,Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());                    
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);        
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }

      
            $MarcheEtConcurrence =$this->vivitoolsService->check_MarcheEtConcurrence($Projet);

            

        $societe = new Societe();
        $avancementSociete = 0;
        if(isset($informationuser["logo"]) and $informationuser["logo"] !=""){
            $societe->setLogo($informationuser["logo"]);
            $avancementSociete ++;
        }
        
        
        if(isset($informationuser["name"]) and $informationuser["name"] !=""){
            $societe->setName($informationuser["name"]);
            $avancementSociete ++;
        }

        if(isset($informationuser["pointFort"]) and $informationuser["pointFort"] !=""){
            $societe->setPointFort($informationuser["pointFort"]);
            $avancementSociete ++;
        }

        if(isset($informationuser["pointFaible"]) and $informationuser["pointFaible"] !=""){
            $societe->setPointFaible($informationuser["pointFaible"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["directIndirect"]) and $informationuser["directIndirect"] !=""){
            $societe->setDirectIndirect($informationuser["directIndirect"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["taille"]) and $informationuser["taille"] !=""){
            $societe->setTaille($informationuser["taille"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["effectif"]) and $informationuser["effectif"] !=""){
            $societe->setEffectif($informationuser["effectif"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["CA"]) and $informationuser["CA"] !=""){
            
            if(is_numeric($informationuser["CA"]) == 1){
                $societe->setCA($informationuser["CA"]);
                $avancementSociete ++;
            }else{
                return new Response("CA doit être numérique",400);
            }

        }

        $societe->setAvancement($avancementSociete);

        $this->entityManager->persist($societe);

        if (count($MarcheEtConcurrence->getSociete()) == 0 ) {
            $MarcheEtConcurrence->setAvancement($MarcheEtConcurrence->getAvancement() + 1);
        }

        $MarcheEtConcurrence->addSociete($societe);
        $this->entityManager->flush();

        $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);

        return $this->json(["idSociete"=>$societe->getId(),"avancement"=>$avancement]);   
    }
    
    #[Route("/api/{idProjet}/business-plan/marche-concurrence/societe/{idSociete}", name:'getSociete', methods: ['GET'])]
    public function getSociete($idProjet,$idSociete,Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);        
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        
        if(!$Projet){
            return new Response("Projet n'existe pas");
        }         
        
        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id"=>$idSociete,"deleted"=>"0"]); 
        $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence();

        if($societe){
            $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);

            return $this->json([
                "id"=>$societe->getId(),
                "logo"=>$societe->getLogo(),
               "name" => $societe->getName(),
               "pointFort" => $societe->sgetPointFort(),
               "pointFaible" => $societe->getPointFaible(),
               "directIndirect" => $societe->getDirectIndirect(),
               "taille" => $societe->getTaille(),
               "effectif" => $societe->getEffectif(),
               "CA" => $societe->getCA(),
               "avancement"=>$avancement
            ]);
        }
        return $this->json([]);       
    }



    #[Route("/api/{idProjet}/business-plan/marche-concurrence/societe/all/societes", name:'getAllSociete', methods: ['GET'])]
    public function getAllSociete($idProjet,Request $request)
    {
        
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }   

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);       
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
         
        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }
        $MarcheEtConcurrence = $this->vivitoolsService->check_MarcheEtConcurrence($Projet);

        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
        }else{
            return $this->json(["societes"=>[],"avancement"=>0]);
        }    
        
       // $societes = $MarcheEtConcurrence->getSociete();
        $societesListe = $this->MarcheEtConcurrenceRepository->getSocieteByMarcheEtConcurrenceId($MarcheEtConcurrence->getId());
        $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);
      
        return $this->json([$societesListe,"avancement"=> $avancement]);
    }

    #[Route("/api/{idProjet}/business-plan/marche-concurrence/societe/{idSociete}", name:'editSociete', methods: ['PUT'])]
    public function editSociete($idProjet,$idSociete,Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);        

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        
        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());                    
        
        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id"=>$idSociete,"deleted"=>0]); 
        
        $avancementSociete = 0;
        if(isset($informationuser["logo"]) and $informationuser["logo"] !=""){
            $societe->setLogo($informationuser["logo"]);
            $avancementSociete ++;
        }
        
        
        if(isset($informationuser["name"]) and $informationuser["name"] !=""){
            $societe->setName($informationuser["name"]);
            $avancementSociete ++;
        }

        if(isset($informationuser["pointFort"]) and $informationuser["pointFort"] !=""){
            $societe->setPointFort($informationuser["pointFort"]);
            $avancementSociete ++;
        }

        if(isset($informationuser["pointFaible"]) and $informationuser["pointFaible"] !=""){
            $societe->setPointFaible($informationuser["pointFaible"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["directIndirect"]) and $informationuser["directIndirect"] !=""){
            $societe->setDirectIndirect($informationuser["directIndirect"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["taille"]) and $informationuser["taille"] !=""){
            $societe->setTaille($informationuser["taille"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["effectif"]) and $informationuser["effectif"] !=""){
            $societe->setEffectif($informationuser["effectif"]);
            $avancementSociete ++;
        }
        
        if(isset($informationuser["CA"]) and $informationuser["CA"] !=""){
            
            if(is_numeric($informationuser["CA"]) == 1){
                $societe->setCA($informationuser["CA"]);
                $avancementSociete ++;
            }else{
                return new Response("CA doit être numérique",400);
            }

        }
        
       
        $societe->setAvancement($avancementSociete);
 
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
         
        $this->entityManager->flush();

        return $this->json(["idSociete"=>$societe->getId()]);   
    }

    #[Route("/api/{idProjet}/business-plan/marche-concurrence/societe/{idSociete}", name:'deletedSociete', methods: ['DELETE'])]

    public function deletedSociete($idProjet,$idSociete,Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }
                 
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);  
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
                      
        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }
        
        $MarcheEtConcurrence =$this->vivitoolsService->check_MarcheEtConcurrence($Projet);

        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
        }else{
            return $this->json(["societes"=>[],"avancement"=>0]);
        }    

        $societe =  $this->doctrine->getRepository(Societe::class)->find($idSociete); 
        $societe->setDeleted(1);
        
        if (count($MarcheEtConcurrence->getSociete()) == 0 ) {
            $MarcheEtConcurrence->setAvancement($MarcheEtConcurrence->getAvancement() - 1);
        }

        $this->entityManager->flush();
        $avancement = $this->vivitoolsService->calcAvancement($MarcheEtConcurrence->getAvancement(),2);

        return $this->json(["idSociete"=>$societe->getId(),"avancement"=>$avancement]);   
    }
    

}