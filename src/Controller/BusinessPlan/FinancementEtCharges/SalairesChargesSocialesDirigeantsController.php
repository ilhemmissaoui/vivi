<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\Collaborateur;
use App\Entity\CollaborateurProjet;
use App\Entity\Dirigents;
use App\Entity\Equipe;
use App\Entity\FinancementEtCharges;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\SalaireEtchargeCollaborateur;
use App\Entity\SalaireEtchargeDirigentsInfo;
use App\Entity\SalaireEtchargeSocial;
use App\Entity\SalaireEtchargeSocialDirigents;
use App\Entity\Salarie;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\EquipeRepository;
use App\Repository\HistoireEtEquipeRepository;
use App\Repository\ProjetRepository;
use App\Repository\SalaireEtchargeDirigentsInfoRepository;
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

class SalairesChargesSocialesDirigeantsController extends AbstractController
{
    private $UserRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $equipeRepository;
    private $HistoireEtEquipeRepository;
    private $SalaireEtchargeDirigentsInfoRepository;
    private $CollaborateurProjetRepository;
    

    const PERMISSION = "financement_charge";

    public function __construct(CollaborateurProjetRepository $CollaborateurProjetRepository, SalaireEtchargeDirigentsInfoRepository $SalaireEtchargeDirigentsInfoRepository, HistoireEtEquipeRepository $HistoireEtEquipeRepository, EquipeRepository $equipeRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->equipeRepository = $equipeRepository;
        $this->HistoireEtEquipeRepository = $HistoireEtEquipeRepository;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;
        $this->SalaireEtchargeDirigentsInfoRepository = $SalaireEtchargeDirigentsInfoRepository;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/add", name: 'addSalaireEtChargeSocialDirigeants', methods: ['POST'])]
    public function addSalaireEtChargeSocialDirigeants(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if(isset($informationuser["name"]) and $informationuser["name"] != null){
            $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findOneBy(["projet"=>$Projet,"annee" => trim($informationuser["name"]),"deleted"=>0]);
            
            if(!$ProjetAnnees){
                $ProjetAnnees = new ProjetAnnees();
                $ProjetAnnees->setAnnee(trim($informationuser["name"]));
                $ProjetAnnees->setProjet($Projet);
                $this->entityManager->persist($ProjetAnnees);
            }
            $ProjetAnnees->setFinancementEtCharges($FinancementEtCharges);
            $this->entityManager->flush();


        }else{
            return new Response("annee est oblig", 400);            
        }
        $ProjetAnnees->setFinancementEtCharges($FinancementEtCharges);
        $this->entityManager->persist($ProjetAnnees);
        $this->entityManager->flush();


        $SalaireEtchargeSocialDirigents = new SalaireEtchargeSocialDirigents();

        if (isset($informationuser["name"])  and $informationuser["name"] != "") {
            $SalaireEtchargeSocialDirigents->setName($informationuser["name"]);
        } else {
            return new Response("name est oblig", 400);
        }

        $this->entityManager->persist($SalaireEtchargeSocialDirigents);

        $FinancementEtCharges->addSalaireEtchargeSocialDirigent($SalaireEtchargeSocialDirigents);
        $ProjetAnnees->setSalaireEtchargeSocialDirigents($SalaireEtchargeSocialDirigents);

        $this->entityManager->flush();

        return $this->json(["IdSalaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigents->getId()]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/edit/{IdSalaireEtchargeSocialDirigents}", name: 'editSalaireEtChargeSocialDirigeants', methods: ['PUT'])]
    public function editSalaireEtChargeSocialDirigeants(Request $request, $idProjet, $IdSalaireEtchargeSocialDirigents)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $IdSalaireEtchargeSocialDirigents, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (isset($informationuser["name"]) and $informationuser["name"] != "") {
            $SalaireEtchargeSocialDirigents->setName($informationuser["name"]);
        }else{
            return new Response("name est oblig",400);
        }

        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());
        $this->entityManager->flush();
        return $this->json(["IdSalaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigents->getId()]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/get-all-dirigents", name: 'getDirigents', methods: ['get'])]
    public function getDirigents(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $dirigents = [];
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]); 
        
        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }       
        
        $histoireEtEquipe = $Projet?->getBusinessPlan()?->getHistoireEtEquipe(); 
     
        if(!$histoireEtEquipe){
            return new Response("histoireEtEquipe n'existe pas",400);
        }

        $histoireEtEquipe = $Projet?->getBusinessPlan()?->getHistoireEtEquipe();

        if (!$histoireEtEquipe) {
            return new Response("histoireEtEquipe n'existe pas", 404);
        }

        $dirigents = $this->CollaborateurProjetRepository->findAllCollaborateurProjet($idProjet, false, true);
        return $this->json(["dirigents" => $dirigents]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/{idSalaireEtchargeSocialDirigents}/dirigeant/add", name: 'addDirigeantsSalaireEtChargeSocial', methods: ['POST'])]
    public function addDirigeantsSalaireEtChargeSocial(Request $request, $idProjet, $idSalaireEtchargeSocialDirigents)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {

            return new Response('No API token provided', 401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtchargeSocialDirigents, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$SalaireEtchargeSocialDirigents) {
            return new Response("SalaireEtchargeSocialDirigents n'existe pas",400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $newDirigeantTab = [];
        if (isset($informationuser["dirigeant"])) {
            foreach ($informationuser["dirigeant"] as $idDirigeant) {

            $Dirigents = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idDirigeant, "Dirigeant" => 1 ,"deleted"=>0]);
            if (!$Dirigents) {            
                return new Response("Dirigents n'existe pas",400);
            }

                if (!$SalaireEtchargeSocialDirigents?->getCollaborateurProjet()->contains($Dirigents)) {
                    $SalaireEtchargeSocialDirigents->addCollaborateurProjet($Dirigents);
                    $newDirigeantTab[] = $this->getOneDirigentInfo($SalaireEtchargeSocialDirigents, $Dirigents);
                }

                $this->entityManager->flush();
            }
        }


        if (isset($informationuser["newDirigeant"]) and $informationuser["newDirigeant"]["firstename"] != "" and $informationuser["newDirigeant"]["lastename"] != "") {


            $collaborateurProjet = new CollaborateurProjet();
            if (isset($informationuser["newDirigeant"]['firstename']) and $informationuser["newDirigeant"]['firstename'] != "") {
                $collaborateurProjet->setFirstename($informationuser["newDirigeant"]['firstename']);
            } else {
                return new Response("firstename est oblig",400);
            }
    
            if (isset($informationuser["newDirigeant"]['lastename']) and $informationuser["newDirigeant"]['lastename'] != "") {
                $collaborateurProjet->setLastname($informationuser["newDirigeant"]['lastename']);
            } else {
                return new Response("lastename est oblig",400);
            }

            if (isset($informationuser["newDirigeant"]['email']) and $informationuser["newDirigeant"]['email'] != "") {

                if($this->vivitoolsService->verificationEmail($informationuser["newDirigeant"]['email']) == false){
                    return new Response("email invalid ",400); 
                }
                $collaborateurExiste = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["email" => $informationuser["newDirigeant"]['email'],"projet"=>$Projet, "deleted" => 0]);
                if($collaborateurExiste){
                    return new Response("email existe ",400); 
                }
                $collaborateurProjet->setEmail($informationuser["newDirigeant"]['email']);

                if(isset($informationuser["newDirigeant"]['invitation']) and $informationuser["newDirigeant"]['invitation'] == true ){
                    $html = $this->renderView("email/invitationUser.html.twig", [
                        "user" => $informationuser["newDirigeant"]['firstename'],
                      
                    ]);  
                    $this->sendEmail->sendEmail("Invitation ViviTool",$informationuser["newDirigeant"]['email'],$html);
                }
            } else {
                return new Response("email est oblig",400);
            }

            
            $collaborateurProjet->setUsername($informationuser["newDirigeant"]['firstename'] . " " . $informationuser["newDirigeant"]['lastename']);
    
            $collaborateurProjet->setDateCreation(new DateTime());
            $collaborateurProjet->setProjet($Projet);
            $collaborateurProjet->setDirigeant(true);

            $this->entityManager->persist($collaborateurProjet);
            $SalaireEtchargeSocialDirigents->addCollaborateurProjet($collaborateurProjet);

            $this->entityManager->flush();
            $newDirigeantTab[] =
                $this->getOneDirigentInfo($SalaireEtchargeSocialDirigents, $collaborateurProjet);
        }
        return $this->json(["newDirigeant" => $newDirigeantTab]);
    }
    public function addEditsalarie($informationuser, $salarie)
    {

        if (isset($informationuser['firstename']) and $informationuser['firstename'] != "") {
            $salarie->setFirstename($informationuser['firstename']);
        } else {
            return "firstename est oblig";
        }

        if (isset($informationuser['lastename']) and $informationuser['lastename'] != "") {
            $salarie->setLastename($informationuser['lastename']);
        } else {
            return "lastename est oblig";
        }

        $salarie->setUsername($informationuser['firstename'] . " " . $informationuser['lastename']);
        return $salarie;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/{idSalaireEtchargeSocialDirigents}/dirigeant-info/information", name: 'AddEInfoDirigeant', methods: ['POST'])]
    public function AddEInfoDirigeant(Request $request, $idProjet, $idSalaireEtchargeSocialDirigents)
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
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtchargeSocialDirigents, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$SalaireEtchargeSocialDirigents) {
            return new Response("SalaireEtchargeSocialDirigents n'existe pas",400);
        }

        $Dirigents = null;
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        foreach ($informationuser as $idDirigents => $item) {
            $Dirigents = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idDirigents, "Dirigeant" => 1, "deleted" => 0]);

            $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigents, "collaborateurProjet" => $Dirigents]);

            if (!$SalaireEtchargeDirigentsInfo) {
                $SalaireEtchargeDirigentsInfo = new SalaireEtchargeDirigentsInfo();
            }
            $SalaireEtchargeDirigentsInfo->setFinancementEtCharges($FinancementEtCharges);
            $SalaireEtchargeDirigentsInfo = $this->addEditInfoDirigeant($item, $SalaireEtchargeDirigentsInfo);
            
            if (gettype($SalaireEtchargeDirigentsInfo) != "object") {
                return new Response($SalaireEtchargeDirigentsInfo, 400);
            }

            $SalaireEtchargeDirigentsInfo->setSalaireEtchargeSocialDirigents($SalaireEtchargeSocialDirigents);
            $SalaireEtchargeDirigentsInfo->setCollaborateurProjet($Dirigents);

            if (!$SalaireEtchargeDirigentsInfo?->getId()) {
                $this->entityManager->persist($SalaireEtchargeDirigentsInfo);
            }

            $this->entityManager->flush();
        }
        
        return new Response("success");
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/{idSalaireEtchargeSocialDirigents}/dirigeant/{idDirigeant}/information", name: 'EditInfoDirigeant', methods: ['PUT'])]
    public function EditInfoDirigeant(Request $request, $idProjet, $idSalaireEtchargeSocialDirigents, $idDirigeant)
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
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtchargeSocialDirigents, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$SalaireEtchargeSocialDirigents) {
            return new Response("SalaireEtchargeSocialDirigents n'existe pas",400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $Dirigents = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idDirigeant, "Dirigeant" => 1, "deleted" => 0]);

        $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigents, "collaborateurProjet" => $Dirigents]);

 
        if (!$SalaireEtchargeDirigentsInfo) {
            $SalaireEtchargeDirigentsInfo = new SalaireEtchargeDirigentsInfo();
            $SalaireEtchargeDirigentsInfo->setFinancementEtCharges($FinancementEtCharges);
            $SalaireEtchargeDirigentsInfo->setSalaireEtchargeSocialDirigents($SalaireEtchargeSocialDirigents);
            $SalaireEtchargeDirigentsInfo->setCollaborateurProjet($Dirigents);
            $this->entityManager->persist($SalaireEtchargeDirigentsInfo);

        }

        $SalaireEtchargeDirigentsInfo = $this->addEditInfoDirigeant($informationuser, $SalaireEtchargeDirigentsInfo);

        if (gettype($SalaireEtchargeDirigentsInfo) != "object") {
            return new Response($SalaireEtchargeDirigentsInfo, 400);
        }

        $this->entityManager->flush();
        return $this->json(["Dirigents" => $Dirigents->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/getAll", name: 'GetAllSalaireEtChargeSocial', methods: ['GET'])]
    public function GetAllSalaireEtChargeSocial(Request $request, $idProjet)
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

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findBy(["financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$SalaireEtchargeSocialDirigents) {
            return $this->json([]);
        }
        $infoSalaireEtChargeSocialDirigents = [];
        foreach ($SalaireEtchargeSocialDirigents as $item) {
            $Dirigents = $item->getCollaborateurProjet();
            if ($item?->getProjetAnnees() and $item?->getProjetAnnees()->getDeleted() == 0) {

                $infoSalaireEtChargeSocialDirigents["idAnne"][] = [
                    "SalaireEtChargeSocialDirigentsId" => $item->getId(),
                    "SalaireEtChargeSocialDirigentsName" => $item?->getProjetAnnees()?->getAnnee(),
                    "DirigentsListe" => $this->getDirigentInfo($item, $Dirigents),
                    "total" =>$this->vivitoolsService->calcSalaireNetDirigeants($item)["Salaire net des dirigeants"]
                ];
            }
        }
        
        return $this->json($infoSalaireEtChargeSocialDirigents);
    }
    #[Route('/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/{idSalaireEtchargeSocialDirigents}/get-collaborateurToDirigents', name: 'GetAllcollaborateurTobeSalarieDirigents', methods: ['GET'])]
    public function GetAllcollaborateurTobeSalarieDirigents(Request $request, $idProjet,$idSalaireEtchargeSocialDirigents)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
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
            return new Response("Projet n'existe pas", 400);
        }

        $listCollaborateurTobeSalarie = [];
        $listeOfcollaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findBy(["projet"=>$Projet,"deleted"=>0,"Dirigeant"=>1]);

        foreach($listeOfcollaborateur as $collaborateur){
            $collaborateurSalaireEtCharge = $this->CollaborateurProjetRepository->findOneCollaborateurProjetBySalaireEtchargeSocialDirigieantObjet($collaborateur->getId(), $idSalaireEtchargeSocialDirigents);
            if    (count($collaborateurSalaireEtCharge) == 0) {

            $listCollaborateurTobeSalarie[] =[
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
        }
        
        
        return $this->json($listCollaborateurTobeSalarie);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeants/get/{idSalaireEtchargeSocialDirigents}", name: 'GetOneSalaireEtChargeSocialDirigeants', methods: ['GET'])]
    public function GetOneSalaireEtChargeSocial(Request $request, $idProjet, $idSalaireEtchargeSocialDirigents)
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
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

       
        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtchargeSocialDirigents, "financementEtCharges" => $FinancementEtCharges ,"deleted"=>0]);
        
        if(!$SalaireEtchargeSocialDirigents){
            
            return new Response("SalaireEtchargeSocialDirigents n'existe pas",400);
        }

        $Dirigents = $SalaireEtchargeSocialDirigents->getCollaborateurProjet();
        $DirigentsListe[] = $this->getDirigentInfo($SalaireEtchargeSocialDirigents, $Dirigents);

        return $this->json([
            "SalaireEtChargeSocialDirigentsId" => $SalaireEtchargeSocialDirigents->getId(),
            "SalaireEtChargeSocialDirigentsName" => $SalaireEtchargeSocialDirigents?->getProjetAnnees()?->getAnnee(),
            "DirigentsListe" => $DirigentsListe
        ]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-dirigeant/supp-annee/{idSalaireEtChargeSocialDirigeant}", name: 'suppSalaireEtChargeSocial', methods: ['DELETE'])]
    public function suppSalaireEtChargeSocial(Request $request, $idProjet, $idSalaireEtChargeSocialDirigeant)
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
            return new Response("Projet n'existe pas");
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtChargeSocialDirigeant, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);
        $salaireEtchargeSocial->setDeleted(1);
        $this->entityManager->flush();
        foreach($salaireEtchargeSocial->getCollaborateurProjet() as $dirigeant){
            $salaireEtchargeSocial->removeCollaborateurProjet($dirigeant);

            $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $salaireEtchargeSocial, "collaborateurProjet" => $dirigeant]);
            if ($SalaireEtchargeDirigentsInfo) {
                $this->entityManager->remove($SalaireEtchargeDirigentsInfo);
            }
            $this->entityManager->flush();
        }
        return new Response("ok", 200);
    }
    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/{idSalaireEtChargeSocial}/supp-dirigeant/{idDirigeant}", name: 'suppSalaireEtChargeSocialDirigeant', methods: ['DELETE'])]
    public function suppSalaireEtChargeSocialCollaborateur(Request $request, $idProjet, $idSalaireEtChargeSocial, $idDirigeant)
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
            return new Response("Projet n'existe pas");
        }
        if (!$Projet) {
            return new Response("Projet n'existe pas",400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $SalaireEtchargeSocialDirigents = $this->doctrine->getRepository(SalaireEtchargeSocialDirigents::class)->findOneBy(["id" => $idSalaireEtChargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);
        if (!$SalaireEtchargeSocialDirigents) {
            return new Response("SalaireEtchargeSocialDirigents n'existe pas",400);
        }

        $dirigeant = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idDirigeant, 'projet' => $Projet, "deleted" => 0]);

        if (!$dirigeant) {
            return new Response("Collaborateur n'existe pas",400);
        }
        if ($SalaireEtchargeSocialDirigents->getCollaborateurProjet()->contains($dirigeant)) {
            $SalaireEtchargeSocialDirigents->removeCollaborateurProjet($dirigeant);

            $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigents, "collaborateurProjet" => $dirigeant]);
            if ($SalaireEtchargeDirigentsInfo) {
                $this->entityManager->remove($SalaireEtchargeDirigentsInfo);
            }
            $this->entityManager->flush();
        } else {
            return new Response("Collaborateur n'existe pas dans ce SalaireEtchargeSocialDirigents",400);
        }


        return new Response("ok", 200);
    }
    public function getOneDirigentInfo($SalaireEtchargeSocialDirigent, $Dirigent)
    {

        $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigent, "collaborateurProjet" => $Dirigent]);
        $DirigentsListe = [
            "IdDirigeant" => $Dirigent->getId(),
            "firsteName" => $Dirigent?->getUser()?->getFirstname(),
            "LasteName" => $Dirigent?->getUser()?->getLastname(),
            "UserName" => $Dirigent?->getUser()?->getUsername(),
            "email" => $Dirigent?->getUser()?->getEmail(),
            "diplome" => $Dirigent?->getDiplome(),
            "DirigentirsteName" => $Dirigent?->getFirstename(),
            "DirigentLasteName" => $Dirigent?->getLastname(),
            "DirigentUserName" => $Dirigent?->getUsername(),
            "DirigentsInfoId" => $SalaireEtchargeDirigentsInfo?->getId(),
            "pourcentageParticipationCapital" => $SalaireEtchargeDirigentsInfo?->getPourcentageParticipationCapital(),
            "reparationRenumeratinAnnee" => $SalaireEtchargeDirigentsInfo?->getReparationRenumeratinAnnee(),
            "beneficier" => $SalaireEtchargeDirigentsInfo?->getBeneficier(),
        ];

        return $DirigentsListe;
    }

    public function getDirigentInfo($SalaireEtchargeSocialDirigent, $Dirigents)
    {
        $DirigentsListe = [];
        foreach ($Dirigents as $Dirigent) {
            $SalaireEtchargeDirigentsInfo = $this->doctrine->getRepository(SalaireEtchargeDirigentsInfo::class)->findOneBy(["salaireEtchargeSocialDirigents" => $SalaireEtchargeSocialDirigent, "collaborateurProjet" => $Dirigent]);
            $DirigentsListe[] = [
                "IdDirigeant" => $Dirigent->getId(),
                "firsteName" => $Dirigent?->getUser()?->getFirstname(),
                "LasteName" => $Dirigent?->getUser()?->getLastname(),
                "UserName" => $Dirigent?->getUser()?->getUsername(),
                "email" => $Dirigent?->getUser()?->getEmail(),
                "diplome" => $Dirigent?->getDiplome(),
                "DirigentirsteName" => $Dirigent?->getFirstename(),
                "DirigentLasteName" => $Dirigent?->getLastname(),
                "DirigentUserName" => $Dirigent?->getUsername(),
                "DirigentsInfoId" => $SalaireEtchargeDirigentsInfo?->getId(),
                "pourcentageParticipationCapital" => $SalaireEtchargeDirigentsInfo?->getPourcentageParticipationCapital(),
                "reparationRenumeratinAnnee" => $SalaireEtchargeDirigentsInfo?->getReparationRenumeratinAnnee(),
                "beneficier" => $SalaireEtchargeDirigentsInfo?->getBeneficier(),
            ];
        }
        return $DirigentsListe;
    }

    public function addEditInfoDirigeant($informationuser, $SalaireEtchargeDirigentsInfo)
    {

        if (is_numeric($informationuser["pourcentageParticipationCapital"])) {
            $SalaireEtchargeDirigentsInfo->setPourcentageParticipationCapital((int)$informationuser["pourcentageParticipationCapital"]);
        } else {
            return "La valeur pour pourcentage Participation Capital doit être numérique.";
        }
        
        if (is_numeric($informationuser["reparationRenumeratinAnnee"])) {
            $SalaireEtchargeDirigentsInfo->setReparationRenumeratinAnnee((float)$informationuser["reparationRenumeratinAnnee"]);
        } else {
            return "La valeur pour reparation Renumeratin Annee doit être numérique.";
        }
        
        if (is_numeric($informationuser["beneficier"])) {
            $SalaireEtchargeDirigentsInfo->setBeneficier((float)$informationuser["beneficier"]);
        } else {
            return "La valeur pour beneficier doit être numérique.";
        }

        return $SalaireEtchargeDirigentsInfo;
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

        $this->vivitoolsService->avancementFinancementEtChargesChargeSocialEtDirigeant($FinancementEtCharges);


        return $FinancementEtCharges;
    }
}
