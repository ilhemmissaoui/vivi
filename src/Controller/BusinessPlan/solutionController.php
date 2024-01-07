<?php

namespace App\Controller\BusinessPlan;

use App\Entity\NotreSolution;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\Solution;
use App\Repository\MonthListeChiffreAffaireRepository;
use App\Repository\ProjetRepository;
use App\Repository\SolutionRepository;
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

class solutionController extends AbstractController
{
    private $UserRepository;
    private $ProjetRepository;
    private $SolutionRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $MonthListeChiffreAffaireRepository;
    const PERMISSION ="notre_solution";

    public function __construct(MonthListeChiffreAffaireRepository $MonthListeChiffreAffaireRepository,SolutionRepository $SolutionRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->SolutionRepository = $SolutionRepository;
        $this->MonthListeChiffreAffaireRepository = $MonthListeChiffreAffaireRepository;
    }

    #[Route('/api/{idProjet}/business-plan/annee-solution/add', name: 'addAnneeSolution', methods: ['POST'])]
    public function addAnneeSolution($idProjet, Request $request)
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

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $nbAnneSolution = count($BusinessPlan?->getNotreSolution()?->getProjetAnnees());
/*
       
        if(isset($informationuser["annee"]) and $informationuser["annee"] != null){
            $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($informationuser["annee"]),"deleted"=>0]);
            
            if(!$ProjetAnnees){
                $ProjetAnnees = new ProjetAnnees();
                $ProjetAnnees->setAnnee(trim($informationuser["annee"]));
                $ProjetAnnees->setProjet($Projet);
                $this->entityManager->persist($ProjetAnnees);
                $this->entityManager->flush();
            }

        }else{
            //return new Response("annee est oblig", 404);            
        }
        
        $ProjetAnnees->setNotreSolution($NotreSolution);
        $this->entityManager->persist($ProjetAnnees);
        if ($nbAnneSolution == 0) {
            $BusinessPlan->setAvancement($BusinessPlan->getAvancement() + 1);
        }

        

        $this->entityManager->flush();*/
        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);

        //return $this->json(["idAnneeSolution" => $ProjetAnnees->getId(),"avancement"=> $avancement ,"avancementBusinessPlan" => $BusinessPlan->getAvancement()]);
        return $this->json(["idAnneeSolution" => 1,"avancement"=> $avancement ,"avancementBusinessPlan" => $BusinessPlan->getAvancement()]);
    }



    #[Route('/api/{idProjet}/business-plan/annee-solution/{anneeSolution}', name: 'getAnneeSolution', methods: ['GET'])]
    public function GetAnneeSolution($idProjet, $anneeSolution, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);

        $SolutionListe = [];
        $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["id"=>$anneeSolution,"projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

        foreach ($anneeSolutions->getSolutions() as $Solution) {
            if ($Solution) {
                $SolutionListe[] = $this->getSolutionArray($Solution,$Projet, $BusinessPlan,$anneeSolutions);
            }
        }

        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);

        return $this->json(
            [
                "id" => $anneeSolutions->getId(),
                "annee" => $anneeSolutions->getAnnee(),
                "solutionListe" => $SolutionListe,
                "avancementBusinessPlan" => $BusinessPlan->getAvancement(),
                "avancement"=>$avancement
            ]
        );
    }


    #[Route('/api/{idProjet}/business-plan/annee-solution-all/', name: 'getAllAnneeSolution', methods: ['GET'])]
    public function GetAllAnneeSolution($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $AllanneeSolutions = [];
        
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

        foreach ($anneeSolutions as $annes) {
            $Solutions = $this->SolutionRepository->getSolutionWithProjetAnnee($NotreSolution->getId(),$annes->getId());
            $SolutionListe = [];
            foreach ($Solutions as $Solution) {
                if ($Solution) {
                    $SolutionListe[] = $this->getSolutionArray($Solution,$Projet, $BusinessPlan,$annes);
                }
            }
            $AllanneeSolutions[] = [
                "id" => $annes->getId(),
                "annee" => $annes->getAnnee(),
                "SolutionListe" => $SolutionListe
            ];
        }
        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);
            
        return $this->json(["AllanneeSolutions" => $AllanneeSolutions,"avancement"=>$avancement, "avancementBusinessPlan" => $BusinessPlan->getAvancement()]);
    }



    #[Route('/api/{idProjet}/business-plan/solution/add', name: 'addSolution', methods: ['POST'])]
    public function addSolution($idProjet, Request $request)
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
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
       
        $Solutionsexist = $this->doctrine->getRepository(Solution::class)->findBy(["notreSolution" => $NotreSolution,"deleted" => 0]);
        
        if(count($Solutionsexist) == 0){
            $NotreSolution->setAvancement($NotreSolution->getAvancement() + 1);
        }

        if(isset($informationuser["id"])){
            
            $Solutions = $this->doctrine->getRepository(Solution::class)->findOneBy(["id" => $informationuser["id"], "deleted" => 0]);
            
            foreach($Solutions->getProjetAnnees() as $key => $annee) {
                $annee->removeSolution($Solutions);
                if (count($annee->getSolutions()) == 0) {
                    $annee->setNotreSolution(null);
                }
                $this->entityManager->flush();
            }

        }else{
            if (!isset($informationuser["id"])) {
          
                $Solutions = new Solution();
                $Solutions->setNotreSolution($NotreSolution);
                
            }
        }
        $nbAnneSolution = count($BusinessPlan?->getNotreSolution()?->getAnneeProjet());

        if ($nbAnneSolution == 0) {
            $BusinessPlan->setAvancement($BusinessPlan->getAvancement() + 1);
        }
        
        $avancement = 0;
        if (isset($informationuser["name"])) {
            $Solutions->setName($informationuser["name"]);
            $avancement += 1;
        }       

        if (isset($informationuser["innovation"])) {
            $Solutions->setInnovation($informationuser["innovation"]);
            $avancement += 1;
        }

        if (isset($informationuser["pointFort"])) {
            $Solutions->setPointFort($informationuser["pointFort"]);
            $avancement += 1;
        }

        if (isset($informationuser["descTechnique"])) {
            $Solutions->setDescTechnique($informationuser["descTechnique"]);
            $avancement += 1;
        }

        $Solutions->setAvancement($avancement);

        $this->entityManager->persist($Solutions);
 
        if(isset($informationuser["annee"]) and $informationuser["annee"] != null ){
            foreach($informationuser["annee"] as $item){
              
                $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($item),"deleted"=>0]);
                
                if(!$anneeSolutions){
                    $anneeSolutions = new ProjetAnnees();
                    $anneeSolutions->setAnnee(trim( $item));
                    $anneeSolutions->setProjet($Projet);
                    $this->entityManager->persist($anneeSolutions);
                   
                }

                $anneeSolutions->addSolution($Solutions);
                $anneeSolutions->setNotreSolution($NotreSolution);
                $this->entityManager->flush();
               
            }
 
        }else{
            $this->entityManager->flush();

        }
       
        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);
   
        return $this->json(["idSolutions" => $Solutions->getId(),"avancement"=>$avancement, "avancementBusinessPlan" => $BusinessPlan->getAvancement()]);
    }

    #[Route("/api/{idProjet}/business-plan/get-all-solution-one-annee/{anneeSolution}", name: 'getAllSolutionForAnnee', methods: ['GET'])]
    public function getAllSolutionForAnnee($anneeSolution, $idProjet, Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $SolutionListe = [];

        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $AnneeSolution = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["id"=>$anneeSolution,"projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

        if (!$AnneeSolution) {
            return $this->json([]);
        }

        
        $Solutions = $this->SolutionRepository->getSolutionWithProjetAnnee($NotreSolution->getId(),$AnneeSolution);
        
        foreach ($Solutions as $Solution) {
            if ($Solution) {
                $SolutionListe[] = $this->getSolutionArray($Solution,$Projet, $BusinessPlan,$AnneeSolution);
            }
        }

        return $this->json(
            [
                "id" => $AnneeSolution->getId(),
                "annee" => $AnneeSolution->getAnnee(),
                "solutionListe" => $SolutionListe
            ]
        );
    }

    #[Route("/api/{idProjet}/business-plan/solution/{idSolution}", name: 'getSolution', methods: ['GET'])]
    public function getSolution($idSolution, $idProjet, Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $SolutionListe = [];
        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);

        $Solution = $this->doctrine->getRepository(Solution::class)->findOneBy(["id" => $idSolution, "notreSolution"=>$NotreSolution,"deleted" => 0]);
        

        if ($Solution) {
            $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);           
            $SolutionListe = $this->vivitoolsService->getSolutionWithgetAnneeArray($Solution,$Projet, $BusinessPlan );
                    
        } else {
            return $this->json(
                []
            );
        }

        return $this->json(
            ["solutionListe"=>$SolutionListe,"avancement"=>$avancement]
        );
    }


    #[Route("/api/{idProjet}/business-plan/all-solutions/", name: 'getAllSolution', methods: ['GET'])]
    public function getAllSolution($idProjet, Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
         
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $SolutionListe = [];
            
        //$Solutions = $this->SolutionRepository->getSolutionWithProjetAnnee($NotreSolution->getId(),$anneeSolution);
        $Solutions = $this->doctrine->getRepository(Solution::class)->findBy([ "notreSolution"=>$NotreSolution,"deleted"=>0]);
            
        foreach ($Solutions as $Solution) {
            
            $SolutionListe[] = $this->vivitoolsService->getSolutionWithgetAnneeArray($Solution,$Projet, $BusinessPlan);

        }

        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);           
        return $this->json(["SolutionListe"=>$SolutionListe,"avancement"=>$avancement]);
    }



    #[Route("/api/{idProjet}/business-plan/all-solutions/pagination/{limit}/{offset}", name: 'getAllSolutionWithPagination', methods: ['GET'])]
    public function getAllSolutionWithPagination($idProjet,$limit,$offset, Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        

        $allSolution[] = [];

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
         
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

        foreach ($anneeSolutions as $anneeSolution) {
            
            $Solutions = $this->SolutionRepository->getSolutionWithProjetAnneePagination($NotreSolution->getId(),$anneeSolution,$limit,$offset);

            $SolutionListe = [];
            foreach ($Solutions as $Solution) {
                if ($Solution) {
                    $SolutionListe[] = $this->getSolutionArray($Solution,$Projet, $BusinessPlan,$anneeSolution);
                }
            }

            $allSolution[] = [
                "id" => $anneeSolution->getId(),
                "annee" => $anneeSolution->getAnnee(),
                "solutionListe" => $SolutionListe
            ];
        }
        $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);
           
        $allSolution["avancement"]=$avancement;
        return $this->json($allSolution);
    }


    #[Route('/api/{idProjet}/business-plan/edit-solution/{idSolution}', name: 'editSolution', methods: ['PUT'])]
    public function editSolution($idSolution, $idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        
        $BusinessPlan = $Projet->getBusinessPlan();         
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);

        $Solutions = $this->doctrine->getRepository(Solution::class)->findOneBy(["notreSolution"=>$NotreSolution,"deleted" => 0, "id" => $idSolution]);

        if ($Solutions and isset($informationuser["innovation"])) {
            $Solutions->setInnovation($informationuser["innovation"]);
            if ($informationuser["innovation"] == "" or $informationuser["innovation"] == null) {
                $Solutions->setAvancement($Solutions->getAvancement() - 1);
            }
        }

        if ($Solutions and isset($informationuser["name"])) {
            $Solutions->setName($informationuser["name"]);
            if ($informationuser["name"] == "" or $informationuser["name"] == null) {
                $Solutions->setAvancement($Solutions->getAvancement() - 1);
            }
        }

        if ($Solutions and isset($informationuser["pointFort"])) {
            $Solutions->setPointFort($informationuser["pointFort"]);
            if ($informationuser["pointFort"] == "" or $informationuser["pointFort"] == null) {
                $Solutions->setAvancement($Solutions->getAvancement() - 1);
            }
        }

        if ($Solutions and isset($informationuser["descTechnique"])) {
            $Solutions->setDescTechnique($informationuser["descTechnique"]);
            if ($informationuser["descTechnique"] == "" or $informationuser["descTechnique"] == null) {
                $Solutions->setAvancement($Solutions->getAvancement() - 1);
            }
        }

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        

        $this->entityManager->flush();

        return new Response(200);
    }



    #[Route('/api/{idProjet}/business-plan/delete-solution/{idSolution}', name: 'deletedSolution', methods: ['DELETE'])]
    public function deletedSolution($idProjet, $idSolution, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas");
        }

        $BusinessPlan = $Projet->getBusinessPlan();         
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);

        $Solutions = $this->doctrine->getRepository(Solution::class)->findOneBy(["notreSolution"=>$NotreSolution,"deleted" => 0, "id" => $idSolution]);
        if ($Solutions) {
            $Solutions->setDeleted(1);
            $this->entityManager->flush();
        }

        $Solutions = $this->doctrine->getRepository(Solution::class)->findBy(["notreSolution"=>$NotreSolution,"deleted" => 0]);
        if (count($Solutions) == 0) {
            $NotreSolution->setAvancement($NotreSolution->getAvancement() - 1);
            $this->entityManager->flush();

            $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);
             
        }
        return $this->json(["status" => 200,"avancement"=>$avancement]);
    }


    #[Route('/api/{idProjet}/business-plan/delete-annee-solution/{anneeSolution}', name: 'deletedAnneeSolution', methods: ['DELETE'])]
    public function deletedAnneeSolution($idProjet, $anneeSolution, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet,self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();


        $BusinessPlan = $Projet->getBusinessPlan();
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["id"=>$anneeSolution,"projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

      

        if ($anneeSolutions) {
            
            foreach ($anneeSolutions->getSolutions() as $Solution) {
                if ($Solution) {
                    $Solution->setDeleted(1);
                    $this->entityManager->flush();
                }
            }

            $this->entityManager->flush();
        }
        $anneeSolutions = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"notreSolution"=>$NotreSolution,"deleted"=>0]);

        if (count($anneeSolutions) == 0) {
            $NotreSolution->setAvancement(0);
            $this->entityManager->flush();
            $avancement = $this->vivitoolsService->calcAvancement($NotreSolution->getAvancement(),2);             
        }

        

        
        return $this->json(["status" => 200,"avancement"=>$avancement]);
    }

    public function getSolutionArray($Solution,$Projet, $BusinessPlan,$annes)
    {
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
       // $FinancementChiffreAffaire = $this->vivitoolsService->checkFinancementChiffreAffaire($FinancementEtCharges);        
        
        $chiffreAffaireListes = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaireForYear($FinancementEtCharges->getId(),$annes->getId());
        $listeActiviteChiffreAffaire=[];
        
        foreach($chiffreAffaireListes as $item){
            $listeActiviteChiffreAffaire[]=[
                "chiffreAffaireActiviteId"=>$item['chiffreAffaireActiviteId'],
                "chiffreAffaireActiviteName"=>$item['chiffreAffaireActiviteName'],
                "sommeVente"=>$item['Valeur']
            ];
        }
       
        return [
            "id" => $Solution->getId(),
            "name" => $Solution->getName(),
            "innovation" => $Solution->getInnovation(),
            "pointFort" => $Solution->getPointFort(),
            "descTechnique" => $Solution->getDescTechnique(),
            "chiffreAffaireListe"=>$listeActiviteChiffreAffaire,
            "avancement" => $Solution->getAvancement()
        ];
    }


    public function getSolutionWithgetAnneeArray($Solution,$Projet, $BusinessPlan)
    {
        $FinancementEtCharges = $this->vivitoolsService->checkFinancementEtCharges($Projet, $BusinessPlan);
       // $FinancementChiffreAffaire = $this->vivitoolsService->checkFinancementChiffreAffaire($FinancementEtCharges);        
       $listeActiviteChiffreAffaire=[];
        $listeAnnee = [];
        foreach($Solution->getProjetAnnees() as $annes){

            $chiffreAffaireListes = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaireForYear($FinancementEtCharges->getId(),$annes->getId());
            
            foreach($chiffreAffaireListes as $item){
                $listeActiviteChiffreAffaire[]=[
                    "chiffreAffaireActiviteId"=>$item['chiffreAffaireActiviteId'],
                    "chiffreAffaireActiviteName"=>$item['chiffreAffaireActiviteName'],
                    "sommeVente"=>$item['Valeur']
                ];
            }
            $listeAnnee[]=[
                "id"=>$annes->getId(),
                "annee"=>$annes->getAnnee()
            ];
        }
        return [
            "id" => $Solution->getId(),
            "name" => $Solution->getName(),
            "innovation" => $Solution->getInnovation(),
            "pointFort" => $Solution->getPointFort(),
            "descTechnique" => $Solution->getDescTechnique(),
            "listeAnnee"=>$listeAnnee,
            "chiffreAffaireListe"=>$listeActiviteChiffreAffaire,
            "avancement" => $Solution->getAvancement()
        ];
    }


  
}
