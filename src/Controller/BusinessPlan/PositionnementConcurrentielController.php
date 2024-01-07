<?php

namespace App\Controller\BusinessPlan;

use App\Entity\Besoins;
use App\Entity\Concurrents;
use App\Entity\PositionnementConcurrentiel;
use App\Entity\Projet;
use App\Entity\Societe;
use App\Repository\BesoinsRepository;
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

class PositionnementConcurrentielController extends AbstractController
{
    private $UserRepository;
    private $ProjetRepository;
    private $BesoinsRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    const PERMISSION ="positionnement_concurrentiel";

    public function __construct(BesoinsRepository $BesoinsRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->BesoinsRepository = $BesoinsRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/add', name: 'addBesoin', methods: ['POST'])]
    public function addBesoin($idProjet, Request $request)
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
        
        if ($Projet->getBusinessPlan()->getPositionnementConcurrentiel()) {
            $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();
        } else {
            $PositionnementConcurrentiel = new PositionnementConcurrentiel();
            $Projet->getBusinessPlan()->setPositionnementConcurrentiel($PositionnementConcurrentiel);
            $this->entityManager->persist($PositionnementConcurrentiel);

            $Projet->getBusinessPlan()->setAvancement($Projet->getBusinessPlan()->getAvancement() + 1);
 
            $this->entityManager->flush();
        }

        $besoinsExistant =  $this->BesoinsRepository->getBesoinId($PositionnementConcurrentiel->getId());
        if (count($besoinsExistant) >= 7) {
            return new Response("Vous avez atteint le nombre maximum de besoin", 400);
        }

        $besoin = new Besoins();

        if (isset($informationuser["name"]) and $informationuser["name"] != "") {
            $besoin->setName($informationuser["name"]);
        } else {
            return new Response("nom de besoin est oblig", 400);
        }

        if (isset($informationuser["position"]) and $informationuser["position"] != "") {
            $besoin->setPosition($informationuser["position"]);
        } else {
            return new Response("position de besoin est oblig", 400);
        }

        $this->entityManager->persist($besoin);
        $besoinexist =  $this->doctrine->getRepository(Besoins::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);

        if(count($besoinexist) == 0){
            $PositionnementConcurrentiel->setAvancement(1);
        }
        $PositionnementConcurrentiel->addBesoin($besoin);


        $this->entityManager->flush();
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["idBesoin" => $besoin->getId(), "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }



    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/edit-besoin/{idBesoin}', name: 'EditBesoin', methods: ['PUT'])]
    public function EditBesoin($idProjet, $idBesoin, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        if (!$besoin) {
            return $this->json([]);
        }

        if (isset($informationuser["name"])) {
            $besoin->setName($informationuser["name"]);
        }
        if (isset($informationuser["position"]) and $informationuser["position"] != "") {
            $besoin->setPosition($informationuser["position"]);
        } else {
            return new Response("position de besoin est oblig", 400);
        }
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        return $this->json(["idBesoin" => $idBesoin]);
    }



    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/supp-besoin/{idBesoin}', name: 'suppBesoin', methods: ['DELETE'])]
    public function suppBesoin($idProjet, $idBesoin, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();
        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);

        if (!$besoin) {
            return $this->json([]);
        }

        
        $besoin->setDeleted(1);
        $this->entityManager->flush();
        $besoinexist =  $this->doctrine->getRepository(Besoins::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
       
        if(count($besoinexist) == 0){
            $PositionnementConcurrentiel->setAvancement(0);
            $this->entityManager->flush();

        }
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);
       
        return $this->json(["status" => 200, "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/societe/{idSociete}/add', name: 'addSocieteToPositionnement', methods: ['POST'])]
    public function addSocieteToPositionnement($idProjet, $idSociete, Request $request)
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
        if ($Projet->getBusinessPlan()->getPositionnementConcurrentiel()) {
            $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();
        } else {
            $PositionnementConcurrentiel = new PositionnementConcurrentiel();
            $Projet->getBusinessPlan()->setPositionnementConcurrentiel($PositionnementConcurrentiel);
            $Projet->getBusinessPlan()->setAvancement($Projet->getBusinessPlan()->getAvancement() + 1);
            
            $this->entityManager->persist($PositionnementConcurrentiel);
            $this->entityManager->flush();
        }

        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id" => $idSociete, "deleted" => 0]);

        if (!$societe) {
            return new Response("societe n'existe pas",400);
        }

        
        $PositionnementConcurrentiel->addSociete($societe);

        $this->entityManager->flush();

        $societeExiste = $this->doctrine->getRepository(Societe::class)->findOneBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        if(!$societeExiste){
            $PositionnementConcurrentiel->setAvancement($PositionnementConcurrentiel->getAvancement() + 1);
            $this->entityManager->flush();

        }

        $this->entityManager->flush();

        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["idSociete" => $societe->getId(), "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/get-all-societe', name: 'getAllSocietefromPositionnement', methods: ['GET'])]
    public function getAllSocietefromPositionnement($idProjet, Request $request)
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

        $PositionnementConcurrentiel = $Projet?->getBusinessPlan()?->getPositionnementConcurrentiel();
        if (!$PositionnementConcurrentiel) {
            return new Response("PositionnementConcurrentiel n'existe pas",400);
        }
        $societes =  $this->doctrine->getRepository(Societe::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);

        if (count($societes) == 0) {
            return new Response("societe n'existe pas",400);
        }
        $listeSociete = [];

        foreach ($societes as $societe) {
            $listeSociete[] = [
                "id" => $societe->getId(),
                "logo" => $societe->getLogo(),
                "name" => $societe->getName(),
            ];
        }


        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["listeSociete" => $listeSociete, "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }



    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/get-all-societe-besoin', name: 'getAllSocieteBesoinfromPositionnement', methods: ['GET'])]
    public function getAllSocieteBesoinfromPositionnement($idProjet, Request $request)
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

        $PositionnementConcurrentiel = $Projet?->getBusinessPlan()?->getPositionnementConcurrentiel();
        if (!$PositionnementConcurrentiel) {
            return new Response("PositionnementConcurrentiel n'existe pas",400);
        }
        
        $societes =  $this->doctrine->getRepository(Societe::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);

        
        $listeSociete = [];
        $listeSociete[] = [
            "id" => 0,
            "logo" => null,
            "name" => $Projet->getName(),
        ];
        foreach ($societes as $societe) {
            $listeSociete[] = [
                "id" => $societe->getId(),
                "logo" => $societe->getLogo(),
                "name" => $societe->getName(),
            ];
        }

        $besoins = $this->doctrine->getRepository(Besoins::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        $besoinListe = [];
        foreach ($besoins as $besoin) {

            $besoinListe[] = [
                "id" => $besoin->getId(),
                "name" => $besoin->getName(),
                "position" => $besoin->getPosition(),
                "concurrent" => $this->BesoinsRepository->getConcurrentsByBesoinId($besoin->getId())
            ];
        }
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["listeSociete" => $listeSociete, "besoinListe" => $besoinListe, "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/getsocieteListe', name: 'getAllSocieteBesoinNotInPositionnement', methods: ['GET'])]
    public function getAllSocieteBesoinNotInPositionnement($idProjet, Request $request)
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

        $PositionnementConcurrentiel = $Projet?->getBusinessPlan()?->getPositionnementConcurrentiel();
        if (!$PositionnementConcurrentiel) {
            return new Response("PositionnementConcurrentiel n'existe pas",400);
        }
        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
        }else{
            return $this->json(["listeSociete"=>[]]);
        }  

        $societes =  $this->doctrine->getRepository(Societe::class)->findBy(["marcheEtConcurrence"=>$MarcheEtConcurrence ,"positionnementConcurrentiel" =>null, "deleted" => 0]);

        if (count($societes) == 0) {
            return $this->json(["listeSociete"=>[]]);
        }

        $listeSociete = [];

        foreach ($societes as $societe) {
            $listeSociete[] = [
                "id" => $societe->getId(),
                "logo" => $societe->getLogo(),
                "name" => $societe->getName(),
            ];
        }
        return $this->json(["listeSociete" => $listeSociete]);
    }


    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/supp-societe/{idSociete}', name: 'SuppSocietefromPositionnement', methods: ['DELETE'])]
    public function SuppSocietefromPositionnement($idProjet, $idSociete, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id" => $idSociete, "deleted" => 0]);

        if (!$societe) {
            return new Response("societe n'existe pas",400);
        }
        
        
        $PositionnementConcurrentiel->removeSociete($societe);

        $this->entityManager->flush();

        $PositionnementConcurrentielHasConcurrent = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel]);
        
        if(!$PositionnementConcurrentielHasConcurrent){
            $PositionnementConcurrentiel->setAvancement($PositionnementConcurrentiel->getAvancement() - 1);
            $this->entityManager->flush();
        }
        
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }




    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/{idBesoin}/societe/{idSociete}/concurrent/add', name: 'addConcurrentToBesoin', methods: ['POST'])]
    public function addConcurrentToBesoin($idBesoin, $idProjet, $idSociete, Request $request)
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
        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        
        if (!$besoin) {
            return new Response("besoin n'existe pas",400);
        }
        $societe = null;

        if( $idSociete > 0){
            $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id" => $idSociete, "deleted" => 0]);

            if (!$societe) {
                return new Response("societe n'existe pas",400);
            }
        }

        

        $concurrentexist = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["societe" => $societe, "besoins" => $besoin]);
        
        if ($concurrentexist) {
            $concurrentexist->setVolume($informationuser["volume"]);
            $concurrent = $concurrentexist;
            
        }else{

            $PositionnementConcurrentielHasConcurrent = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel]);
            if(!$PositionnementConcurrentielHasConcurrent){
                
                $PositionnementConcurrentiel->setAvancement($PositionnementConcurrentiel->getAvancement() +1);
            }

            $concurrent = new Concurrents();
            $concurrent->setVolume($informationuser["volume"]);
            $concurrent->setSociete($societe);
            $concurrent->setPositionnementConcurrentiel($PositionnementConcurrentiel);

            $this->entityManager->persist($concurrent);

            $besoin->addConcurrent($concurrent);
        }
        $this->entityManager->flush();

        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["idBesoin" => $besoin->getId(), "idConcurrent" => $concurrent->getId(), "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }



    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/{idBesoin}/societe/{idSociete}/concurrent/edit/{idConncurent}', name: 'EditConcurrentToBesoin', methods: ['PUT'])]
    public function EditConcurrentToBesoin($idProjet, $idBesoin, $idConncurent, $idSociete, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();
        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        if (!$besoin) {
            return new Response("besoin n'existe pas",400);
        }

        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id" => $idSociete, "deleted" => 0]);

        if (!$societe) {
            return new Response("societe n'existe pas",400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $concurrent = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["id" => $idConncurent, "societe" => $societe, "besoins" => $besoin]);

        if (!$concurrent) {
            return new Response("concurrent n'existe pas",400);
        }

        $concurrent->setVolume($informationuser["volume"]);


        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["idBesoin" => $concurrent->getBesoins()->getId(), "idConcurrent" => $concurrent->getId(), "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet->getBusinessPlan()?->getAvancement()]);
    }


    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/liste/{idBesoin}', name: 'GetBesoin', methods: ['GET'])]
    public function GetBesoin($idBesoin, $idProjet, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        if (!$besoin) {
            return $this->json([]);
        }
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(
            [
                "id" => $besoin->getId(),
                "name" => $besoin->getName(),
                "position" => $besoin->getPosition(),
                "concurrent" => $this->BesoinsRepository->getConcurrentsByBesoinId($idBesoin),
                "PositionnementConcurrentielAvancement" => $avancement,
                "BusinessPlanAvancement" => $Projet->getBusinessPlan()?->getAvancement()
            ]
        );
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/all', name: 'allBesoin', methods: ['GET'])]
    public function allBesoin($idProjet, Request $request)
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

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $besoinListe = [];

        $besoins = $this->doctrine->getRepository(Besoins::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);

        foreach ($besoins as $besoin) {

            $ConcurrentsByBesoinIdForProjet = [];
            $ConcurrentsByBesoinIdForProjetArray = $this->BesoinsRepository->getConcurrentsByBesoinIdForProjet($besoin->getId());
              
            if(count( $ConcurrentsByBesoinIdForProjetArray ) == 0){
              
                $ConcurrentsByBesoinIdForProjet[] = [
                    "id" => null,
                    "volume" => null,
                    "societe" => 0,
                    "nameSociete" => null,
                ];
            } else{
                
                $ConcurrentsByBesoinIdForProjet[] = [
                    "id" => $ConcurrentsByBesoinIdForProjetArray[0]["id"],
                    "volume" => $ConcurrentsByBesoinIdForProjetArray[0]["volume"],
                    "societe" => 0,
                    "nameSociete" => 0,
                ];
            }
            
            $conncurent = array_merge($ConcurrentsByBesoinIdForProjet,$this->BesoinsRepository->getConcurrentsByBesoinId($besoin->getId()));
            $besoinListe[] = [
                "id" => $besoin->getId(),
                "name" => $besoin->getName(),
                "position" => $besoin->getPosition(),
                "concurrent" => $conncurent 
            ];
        }
        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel?->getAvancement(),2);

        return $this->json(["besoin" => $besoinListe, "PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }

    #[Route('/api/{idProjet}/business-plan/Positionnement-Concurrentiel/besoin/{idBesoin}/societe/{idSociete}/concurrent/delete', name: 'suppConcurrent', methods: ['DELETE'])]
    public function suppConcurrent($idBesoin, $idProjet, $idSociete, Request $request)
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
        $PositionnementConcurrentiel = $Projet->getBusinessPlan()->getPositionnementConcurrentiel();

        $besoin =  $this->doctrine->getRepository(Besoins::class)->findOneBy(["id" => $idBesoin, "positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
        
        if (!$besoin) {
            return new Response("besoin n'existe pas",400);
        }
        $societe =  $this->doctrine->getRepository(Societe::class)->findOneBy(["id" => $idSociete, "deleted" => 0]);

        if (!$societe) {
            return new Response("societe n'existe pas",400);
        }

        $concurrentexist = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["societe" => $societe, "besoins" => $besoin]);
        
        if ($concurrentexist) {
            $this->entityManager->remove($concurrentexist);
            $this->entityManager->flush();
            
        }else{
            return new Response("concurrent n'existe pas",400);
        }

        $this->entityManager->flush();

        $avancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel->getAvancement(),2);

        return $this->json(["PositionnementConcurrentielAvancement" => $avancement, "BusinessPlanAvancement" => $Projet?->getBusinessPlan()?->getAvancement()]);
    }
}
