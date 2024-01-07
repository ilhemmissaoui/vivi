<?php

namespace App\Controller\BusinessPlan;

use App\Entity\CollaborateurProjet;
use App\Entity\Equipe;
use App\Entity\HistoireEtEquipe;
use App\Entity\Projet;
use App\Entity\User;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\HistoireEtEquipeRepository;
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
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Date;

class HistoireEquipeController extends AbstractController
{
    private $UserRepository;
    private $HistoireEtEquipeRepository;
    private $ProjetRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $serializer;
    private $CollaborateurProjetRepository;
    const PERMISSION = "histpoire_equipe";

    public function __construct(CollaborateurProjetRepository $CollaborateurProjetRepository, SerializerInterface $serializer, HistoireEtEquipeRepository $HistoireEtEquipeRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->HistoireEtEquipeRepository = $HistoireEtEquipeRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->serializer = $serializer;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;
    }

    #[Route('/api/{idProjet}/business-plan/histoire-equipe/information/', name: 'HistoireInfo', methods: ['POST', 'PUT'])]
    public function HistoireInfo(Request $request, $idProjet)
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
            return new Response("Projet n'existe pas");
        }

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        if (isset($informationuser["presentationSociete"])) {

            $histoireEtEquipe->setPresentationSociete($informationuser["presentationSociete"]);
        }

        if (isset($informationuser["partenaire"])) {


            $histoireEtEquipe->setPartenaire($informationuser["partenaire"]);
        }

        if (isset($informationuser["secteur"])) {
          
            $histoireEtEquipe->setSecteur($informationuser["secteur"]);
        }

        if (isset($informationuser["tendance"])) {
            
            $histoireEtEquipe->setTendance($informationuser["tendance"]);
        }

        if (isset($informationuser["cible"])) {
            
            $histoireEtEquipe->setCible($informationuser["cible"]);
        }
        
        if ($request->isMethod('PUT')) {
            $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        }

        $this->entityManager->flush();
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);
        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);

        return $this->json(["status" => '200', "avancement" => $avancement]);
    }


    #[Route('/api/{idProjet}/business-plan/histoire-equipe/information/{typeInfo}', name: 'getHistoireInfo', methods: ['GET'])]
    public function getHistoireInfo(Request $request, $idProjet, $typeInfo)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
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

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);


        if (!$histoireEtEquipe) {
            return $this->json(["HistoireInfo" => ""]);
        }

        $HistoireInfo = [];

        $hasValues = false;
        if ($typeInfo == "presentationSociete" or $typeInfo == "all" and $histoireEtEquipe and $histoireEtEquipe->getPresentationSociete()) {
            $HistoireInfo["presentationSociete"] = $histoireEtEquipe->getPresentationSociete();
            $hasValues = true;
        }else{
            $HistoireInfo["presentationSociete"] = "";
        }

        if ($typeInfo == "partenaire" or $typeInfo == "all" and $histoireEtEquipe and $histoireEtEquipe->getPartenaire()) {
            $HistoireInfo["partenaire"] = $histoireEtEquipe->getPartenaire();
            $hasValues = true;
        }else{
            $HistoireInfo["partenaire"] = "";
        }

        if ($typeInfo == "secteur" or $typeInfo == "all" and $histoireEtEquipe and $histoireEtEquipe->getSecteur()) {
            $HistoireInfo["secteur"] = $histoireEtEquipe->getSecteur();
            $hasValues = true;
        }else{
            $HistoireInfo["secteur"] = "";
        }

        if ($typeInfo == "tendance" or $typeInfo == "all" and $histoireEtEquipe and $histoireEtEquipe->getTendance()) {
            $HistoireInfo["tendance"] = $histoireEtEquipe->getTendance();
            $hasValues = true;
        }else{
            $HistoireInfo["tendance"] = "";
        }

        if ($typeInfo == "cible" or $typeInfo == "all" and $histoireEtEquipe and $histoireEtEquipe->getCible()) {
            $HistoireInfo["cible"] = $histoireEtEquipe->getCible();
            $hasValues = true;
        }
        else{
            $HistoireInfo["cible"] = "";
        }
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        if ($histoireEtEquipe) {
            $HistoireInfo["avancement"] = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);
        }

        if ($hasValues == false) {
            $HistoireInfo = [];
            $id = null;
        } else {
            $id = $histoireEtEquipe->getId();
        }


        return $this->json(["HistoireInfo" => $HistoireInfo, "id" => $id]);
    }



    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/membre-equipe/', name: 'getmembreEquipe', methods: ['Get'])]
    public function getmembreEquipe($idProjet, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $equipeMumber = [];
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

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        if (!$histoireEtEquipe) {
            return $this->json([]);
        }
        $equipeMumber = $this->CollaborateurProjetRepository->findMembreEquipeProjet($idProjet);
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);

        return $this->json(["equipeMumber" => $equipeMumber, "avancement" => $avancement]);
    }

    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/get-membre-equipe/{idMembre}', name: 'GetOnemembreEquipe', methods: ['GET'])]
    public function GetOnemembreEquipe($idProjet, $idMembre, Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
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

       $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        $equipeMumber = $this->CollaborateurProjetRepository->findOneCollaborateurProjet($idMembre, $idProjet);
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);

        return $this->json(["equipeMumber" => $equipeMumber, "avancement" => $avancement]);
    }

    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/add-collaborateur-membre-equipe/{idCollaborateur}', name: 'addMembreEquipeFromCollaborateur', methods: ['POST'])]
    public function addMembreEquipeFromCollaborateur($idProjet, $idCollaborateur, Request $request)
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

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

     
        $equipe =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["projet" => $Projet, 'id' => $idCollaborateur, "deleted" => 0]);

        if (!$equipe) {
            return new Response("collaborateur n'existe pas", 400);
        }

        $equipe->setEquipe(true);
        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        $equipe->setDateCreation(new DateTime());
        $this->entityManager->flush();

        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);

        return $this->json(["status" => '200', "avancement" => $avancement]);
    }


    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/membre/equipe-collaborateur', name: 'GetAllcollaborateurToBeEquipe', methods: ['GET'])]
    public function GetAllcollaborateurToBeEquipe(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, null, false);
        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $listeCollaborateurToBeMembre = [];

        //  $listeOfcollaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findBy(["projet"=>$Projet,"Equipe"=>0,"deleted"=>0]);
        $listeOfcollaborateur = $this->CollaborateurProjetRepository->getListCollaborateurProjetNotEquipe($Projet->getId());

        foreach ($listeOfcollaborateur as $collaborateur) {

            $listeCollaborateurToBeMembre[] = [
                "idCollaborateur" => $collaborateur?->getId(),
                "firstname" => $collaborateur?->getUser()?->getFirstname(),
                "lastname" => $collaborateur?->getUser()?->getLastname(),
                "email" => $collaborateur?->getUser()?->getEmail(),
                "username" => $collaborateur?->getUser()?->getUsername(),
                "SalarieFirsteName" => $collaborateur?->getFirstename(),
                "SalarieLasteName" => $collaborateur?->getLastname(),
                "SalarieUserName" => $collaborateur?->getUsername(),
                "ProjetId" => $collaborateur?->getProjet()->getId()
            ];
        }


        return $this->json($listeCollaborateurToBeMembre);
    }



    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/membre-equipe/{idMembre}', name: 'editmembreEquipe', methods: ['PUT'])]
    public function editmembreEquipe($idProjet, $idMembre, Request $request)
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

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        $equipe =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["projet" => $Projet, 'id' => $idMembre, "IsSalarie" => 0, "deleted" => 0]);

        if (isset($informationuser['firstename']) and $informationuser['firstename'] != "") {
            $equipe->setFirstename($informationuser['firstename']);
        } else {
            return new Response("firstename est oblig", 400);
        }

        if (isset($informationuser['lastename']) and $informationuser['lastename'] != "") {
            $equipe->setLastname($informationuser['lastename']);
        } else {
            return new Response("lastename est oblig", 400);
        }

        if (isset($informationuser['email']) and $informationuser['email'] != "") {

            if ($this->vivitoolsService->verificationEmail($informationuser['email']) == false) {
                return new Response("email invalid ", 400);
            }

            $equipe->setEmail($informationuser['email']);
        }

        if ($equipe->getFirstename() and $equipe->getLastname()) {
            $equipe->setUsername($equipe->getFirstename() . " " . $equipe->getLastname());
        }

        if (isset($informationuser["diplome"]) and $informationuser["diplome"] != "" and $informationuser["diplome"]) {
            $equipe->setDiplome($informationuser["diplome"]);
            $equipe?->getUser()->setDiplome($informationuser["diplome"]);
        }

        if (isset($informationuser["caracteristique"]) and $informationuser["caracteristique"] != "" and $informationuser["caracteristique"]) {
            $equipe->setCaracteristique($informationuser["caracteristique"]);
            $equipe?->getUser()->setCaracteristique($informationuser["caracteristique"]);
        }

        if (isset($informationuser["role"]) and $informationuser["role"] != "" and $informationuser["role"]) {
            $equipe->setRole($informationuser["role"]);
            $equipe?->getUser()->setRole($informationuser["role"]);
        }
        $equipe->setEquipe(true);

        if (isset($informationuser["isDirigeant"]) and $informationuser["isDirigeant"] != "") {
            $equipe->setDirigeant($informationuser["isDirigeant"]);
        }

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);

        return $this->json(["status" => '200', "avancement" => $avancement]);
    }


    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/add-membre-equipe', name: 'addInvitMembreEquipe', methods: ['POST'])]
    public function addInvitMembreEquipe($idProjet, Request $request)
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

       $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        $equipe = new CollaborateurProjet();
        if (isset($informationuser['firstename']) and $informationuser['firstename'] != "") {
            $equipe->setFirstename($informationuser['firstename']);
        } else {
            return new Response("firstename est oblig", 400);
        }

        if (isset($informationuser['lastename']) and $informationuser['lastename'] != "") {
            $equipe->setLastname($informationuser['lastename']);
        } else {
            return new Response("lastename est oblig", 400);
        }

        if (isset($informationuser['email']) and $informationuser['email'] != "") {

            if ($this->vivitoolsService->verificationEmail($informationuser['email']) == false) {
                return new Response("email invalid ", 400);
            }
            $userCollaborateurExiste = null;
            $equipeMembreExiste = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["email" => $informationuser['email'], "projet" => $Projet, "deleted" => 0]);
            $userExiste = $this->doctrine->getRepository(User::class)->findOneBy(["email" => $informationuser['email'],"deleted" => 0]);
            if($userExiste){
                $userCollaborateurExiste = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["user" => $userExiste, "projet" => $Projet, "deleted" => 0]);
            }
            if($userExiste and !$userCollaborateurExiste){
                return new Response("Utilisateur déjà existant, veuillez l'ajouter en tant que collaborateur.", 200);

            }
         
            if ($equipeMembreExiste || $userCollaborateurExiste) {
                return new Response("email existe ", 200);
            }

            if (isset($informationuser["inviter"]) and $informationuser["inviter"] == 1) {

                $html = $this->renderView("email/invitationUser.html.twig", [
                    "user" => $informationuser['firstename'],

                ]);
                $status = $this->sendEmail->sendEmail("Invitation ViviTool", $informationuser['email'], $html);
            }
            $equipe->setEmail($informationuser['email']);
        }

        $equipe->setUsername($informationuser['firstename'] . " " . $informationuser['lastename']);

        if (isset($informationuser["diplome"]) and $informationuser["diplome"] != "" and $informationuser["diplome"]) {
            $equipe->setDiplome($informationuser["diplome"]);
            $equipe?->getUser()?->setDiplome($informationuser["diplome"]);
        }

        if (isset($informationuser["caracteristique"]) and $informationuser["caracteristique"] != "" and $informationuser["caracteristique"]) {
            $equipe->setCaracteristique($informationuser["caracteristique"]);
            $equipe?->getUser()?->setCaracteristique($informationuser["caracteristique"]);
        }

        if (isset($informationuser["role"]) and $informationuser["role"] != "" and $informationuser["role"]) {
            $equipe->setRole($informationuser["role"]);
            $equipe?->getUser()?->setRole($informationuser["role"]);
        }
        $equipe->setEquipe(1);
        $equipe->setDateCreation(new DateTime());

        if (isset($informationuser["isDirigeant"]) and $informationuser["isDirigeant"] != "") {
            $equipe->setDirigeant($informationuser["isDirigeant"]);
        }


        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        $equipe->setProjet($Projet);
        $this->entityManager->persist($equipe);


        $this->entityManager->flush();
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);
        return $this->json(["status" => '200', "avancement" => $avancement]);
    }


    #[Route('/api/{idProjet}/business-plan/Histoire-equipe/membre-equipe-delete/{idMembre}', name: 'suppEquipeMembre', methods: ['DELETE'])]
    public function suppEquipeMembre($idProjet, $idMembre,   Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
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

        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);

        $equipeMumber = $this->CollaborateurProjetRepository->findOneBy(["id" => $idMembre, "projet" => $Projet, "Equipe" => 1]);
        if (!$equipeMumber) {
            return new Response("Mumber n'existe pas", 400);
        }
        $equipeMumber->setEquipe(0);
        $this->entityManager->flush();

        $equipeMumbers = $this->CollaborateurProjetRepository->findBy(["projet" => $Projet, "Equipe" => 1]);

        if (count($equipeMumbers) == 0) {
            $histoireEtEquipe->setAvancement($histoireEtEquipe?->getAvancement() - 1);
            $this->entityManager->flush();
        }
        $this->vivitoolsService->calcAvancementHistoireEquipe($histoireEtEquipe,$Projet);

        $avancement = $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6);
        return $this->json(["status" => '200', "avancement" => $avancement]);
    }
}
