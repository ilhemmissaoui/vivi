<?php

namespace App\Controller\BusinessPlan\FinancementEtCharges;

use App\Entity\Collaborateur;
use App\Entity\CollaborateurProjet;
use App\Entity\FinancementEtCharges;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\SalaireEtchargeCollaborateurInfo;
use App\Entity\SalaireEtchargeSocial;
use App\Entity\Salarie;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\ProjetRepository;
use App\Repository\SalaireEtchargeCollaborateurInfoRepository;
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

class SalaireEtChargeSocialController extends AbstractController
{
    private $UserRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;
    private $collaborateurProjetRepository;
    private $SalaireEtchargeCollaborateurInfoRepository;
    const PERMISSION = "financement_charge";

    public function __construct(SalaireEtchargeCollaborateurInfoRepository $SalaireEtchargeCollaborateurInfoRepository, CollaborateurProjetRepository $collaborateurProjetRepository, ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->collaborateurProjetRepository = $collaborateurProjetRepository;
        $this->SalaireEtchargeCollaborateurInfoRepository = $SalaireEtchargeCollaborateurInfoRepository;
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/add", name: 'addSalaireEtChargeSocial', methods: ['POST'])]
    public function addSalaireEtChargeSocial(Request $request, $idProjet): Response
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
            return new Response("Projet n'existe pas", 400);
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
            return new Response("annee est oblig", 404);            
        }
     

        $salaireEtchargeSocial = new SalaireEtchargeSocial();

        $salaireEtchargeSocial = $this->addEditSalaireEtChargeSocial($informationuser, $salaireEtchargeSocial);

        if (gettype($salaireEtchargeSocial) != "object") {
            return new Response($salaireEtchargeSocial, 400);
        }

        $this->entityManager->persist($salaireEtchargeSocial);

        $FinancementEtCharges->addSalaireEtchargeSocial($salaireEtchargeSocial);
        $ProjetAnnees->setSalaireEtchargeSocial($salaireEtchargeSocial);
        $this->entityManager->flush();

        return $this->json(["idSalaireEtchargeSocial" => $salaireEtchargeSocial->getId()]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/edit/{idSalaireEtchargeSocial}", name: 'editSalaireEtChargeSocial', methods: ['PUT'])]
    public function editSalaireEtChargeSocial(Request $request, $idProjet, $idSalaireEtchargeSocial): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtchargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        $salaireEtchargeSocial = $this->addEditSalaireEtChargeSocial($informationuser, $salaireEtchargeSocial);

        if (gettype($salaireEtchargeSocial) != "object") {
            return new Response($salaireEtchargeSocial, 400);
        }


        $Projet->getBusinessPlan()->setLasteUpdate(new DateTime());

        $this->entityManager->flush();

        return $this->json(["idSalaireEtchargeSocialAnnee" => $salaireEtchargeSocial->getId()]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/get/{idSalaireEtchargeSocial}", name: 'GetOneSalaireEtChargeSocial', methods: ['GET'])]
    public function GetOneSalaireEtChargeSocial(Request $request, $idProjet, $idSalaireEtchargeSocial): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtchargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$salaireEtchargeSocial) {
            return new Response("salaireEtchargeSocial n'existe pas", 400);
        }

        return $this->json([
            "idProjet" => $idProjet,
            "SalaireEtChargeSocialAnneId" => $salaireEtchargeSocial->getId(),
            "SalaireEtChargeSocialAnneName" => $salaireEtchargeSocial?->getProjetAnnees()?->getAnnee(),
            "collaborateurListe" => $this->getCollaborateurEtInfo($salaireEtchargeSocial)
        ]);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/get-all", name: 'GetSalaireChargeSocial', methods: ['GET'])]
    public function GetSalaireChargeSocial(Request $request, $idProjet): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);


        $salaireEtchargeSocials = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findBy(["financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);
        $collaborateurProjet = $this->collaborateurProjetRepository->findAllCollaborateurProjet($idProjet, null);

        if (count($salaireEtchargeSocials) == 0) {
            $salaireEtchargeSocialsListe[] = [];
            $salaireEtchargeSocialsListe["allCollaborateurProjet"] =  $collaborateurProjet;
            return $this->json($salaireEtchargeSocialsListe);
        }

        $salaireEtchargeSocialsListe = [];

        foreach ($salaireEtchargeSocials as $salaireEtchargeSocial) {
            if ($salaireEtchargeSocial?->getProjetAnnees() and $salaireEtchargeSocial?->getProjetAnnees()->getDeleted() == 0) {
                $salaireEtchargeSocialsListe["idAnnee"][] = [
                    "SalaireEtChargeSocialAnneId" => $salaireEtchargeSocial->getId(),
                    "SalaireEtChargeSocialAnneName" => $salaireEtchargeSocial?->getProjetAnnees()?->getAnnee(),
                    "collaborateurListe" => $this->getCollaborateurEtInfo($salaireEtchargeSocial)
                ];
            }
        }
        $salaireEtchargeSocialsListe["allCollaborateurProjet"] =  $collaborateurProjet;

        return $this->json($salaireEtchargeSocialsListe);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/supp-annee/{idSalaireEtChargeSocial}", name: 'suppSalaireEtChargeSocialAnnee', methods: ['DELETE'])]
    public function suppSalaireEtChargeSocialAnnee(Request $request, $idProjet, $idSalaireEtChargeSocial)
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtChargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);
        $salaireEtchargeSocial->setDeleted(1);

        foreach($salaireEtchargeSocial->getCollaborateurProjets() as $Collaborateur) {
            
            $salaireEtchargeSocial->removeCollaborateurProjet($Collaborateur);
            $SalaireEtchargeCollaborateurInfo = $this->doctrine->getRepository(SalaireEtchargeCollaborateurInfo::class)->findOneBy(["SalaireEtchargeSocial" => $salaireEtchargeSocial, "CollaborateurProjet" => $Collaborateur]);
            if ($SalaireEtchargeCollaborateurInfo) {
                $this->entityManager->remove($SalaireEtchargeCollaborateurInfo);
            }
            $this->entityManager->flush();

            
        }
        $this->entityManager->flush();

        return new Response("ok", 200);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/get-all-collaborateur-projet/", name: 'GetAllcollaborateurProjet', methods: ['GET'])]
    public function GetAllcollaborateurProjet(Request $request, $idProjet): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $collaborateurProjet = $this->collaborateurProjetRepository->findAllCollaborateurProjet($idProjet, null);

        return $this->json(["collaborateurProjet" => $collaborateurProjet]);
    }


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-collaborateur/{idSalaireEtchargeSocial}/collaborateur-salarie/add", name: 'addCollaborateurSalarie', methods: ['POST'])]
    public function addCollaborateurSalarie(Request $request, $idProjet, $idSalaireEtchargeSocial): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);


        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtchargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$salaireEtchargeSocial) {
            return new Response("salaire et charge Social n'existe pas");
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $newCollaborateur = [] ;
        if (isset($informationuser["collaborateurs"])) {
            foreach ($informationuser["collaborateurs"] as $idCollaborateur) {
                $Collaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idCollaborateur, 'projet' => $Projet, "deleted" => 0]);
                $salaireEtchargeSocial->addCollaborateurProjet($Collaborateur);
                $this->entityManager->flush();
                $newCollaborateur[] =
                    $this->getCollaborateurEtInfoForOneCollaborateur($salaireEtchargeSocial, $Collaborateur);
            }
        }
 
        if (isset($informationuser["salarie"]) and $informationuser["salarie"]["firstename"] != "" and $informationuser["salarie"]["lastename"] != "") {
          

            $collaborateurProjet = new CollaborateurProjet();
            if (isset($informationuser["salarie"]['firstename']) and $informationuser["salarie"]['firstename'] != "") {
                $collaborateurProjet->setFirstename($informationuser["salarie"]['firstename']);
            } else {
                return new Response("firstename est oblig",400);
            }
    
            if (isset($informationuser["salarie"]['lastename']) and $informationuser["salarie"]['lastename'] != "") {
                $collaborateurProjet->setLastname($informationuser["salarie"]['lastename']);
            } else {
                return new Response("lastename est oblig",400);
            }

            if (isset($informationuser["salarie"]['email']) and $informationuser["salarie"]['email'] != "") {

                if($this->vivitoolsService->verificationEmail($informationuser["salarie"]['email']) == false){
                    return new Response("email invalid ",400); 
                }
                
                $collaborateurExiste = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["email" => $informationuser["salarie"]['email'],"projet"=>$Projet, "deleted" => 0]);
                if($collaborateurExiste){
                    return new Response("email existe ",400); 
                }

                $collaborateurProjet->setEmail($informationuser["salarie"]['email']);
                if(isset($informationuser["salarie"]['invitation']) and $informationuser["salarie"]['invitation'] == true ){
                    
                    $html = $this->renderView("email/invitationUser.html.twig", [
                        "user" => $informationuser["salarie"]['firstename'],
                      
                    ]);             
                    $this->sendEmail->sendEmail("Invitation ViviTool",$informationuser["salarie"]['email'],$html);
                }
            }
    
            $collaborateurProjet->setUsername($informationuser["salarie"]['firstename'] . " " . $informationuser["salarie"]['lastename']);

            $collaborateurProjet->setDateCreation(new DateTime());
            $collaborateurProjet->setProjet($Projet);
            
            $collaborateurProjet->setIsSalarie(true);

            $this->entityManager->persist($collaborateurProjet);
            $salaireEtchargeSocial->addCollaborateurProjet($collaborateurProjet);

            $this->entityManager->flush();
            $newCollaborateur[] =
                $this->getCollaborateurEtInfoForOneCollaborateur($salaireEtchargeSocial, $collaborateurProjet);
        }


        return $this->json(["salaireEtchargeSocialAnnee" => $salaireEtchargeSocial->getId(), "newCollaborateur" => $newCollaborateur, "projetId" => $idProjet]);
    }


    #[Route('/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-collaborateur/{idSalaireEtchargeSocial}/get-collaborateurTobeSalarie', name: 'GetAllcollaborateurTobeSalarie', methods: ['GET'])]
    public function GetAllcollaborateurTobeSalarie(Request $request, $idProjet,$idSalaireEtchargeSocial)
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
        $listeOfcollaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findBy(["projet"=>$Projet,"deleted"=>0]);

        foreach($listeOfcollaborateur as $collaborateur){
            $collaborateurSalaireEtCharge = $this->collaborateurProjetRepository->findOneCollaborateurProjetBySalaireEtchargeSocialObjet($collaborateur->getId(), $idSalaireEtchargeSocial);
            if(count($collaborateurSalaireEtCharge) == 0 and ($collaborateur->getUser() or $collaborateur->isIsSalarie() == true)) {

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


    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social/{idSalaireEtChargeSocial}/supp-collaborateur/{idCollaborateur}", name: 'suppSalaireEtChargeSocialCollaborateur', methods: ['DELETE'])]
    public function suppSalaireEtChargeSocialCollaborateur(Request $request, $idProjet, $idSalaireEtChargeSocial, $idCollaborateur)
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtChargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);
        if (!$salaireEtchargeSocial) {
            return new Response("salaireEtchargeSocial n'existe pas", 400);
        }

        $Collaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idCollaborateur, 'projet' => $Projet, "deleted" => 0]);

        if (!$Collaborateur) {
            return new Response("Collaborateur n'existe pas", 400);
        }
        if ($salaireEtchargeSocial->getCollaborateurProjets()->contains($Collaborateur)) {
            $salaireEtchargeSocial->removeCollaborateurProjet($Collaborateur);
            $SalaireEtchargeCollaborateurInfo = $this->doctrine->getRepository(SalaireEtchargeCollaborateurInfo::class)->findOneBy(["SalaireEtchargeSocial" => $salaireEtchargeSocial, "CollaborateurProjet" => $Collaborateur]);
            if ($SalaireEtchargeCollaborateurInfo) {
                $this->entityManager->remove($SalaireEtchargeCollaborateurInfo);
            }
            $this->entityManager->flush();
        } else {
            return new Response("Collaborateur n'existe pas dans ce salaireEtchargeSocial", 400);
        }


        return new Response("ok", 200);
    }

    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-collaborateur/{idSalaireEtchargeSocial}/edit-info-collaborateur/{idCollaborateur}", name: 'EditInfoCollaborateur', methods: ['PUT'])]
    public function EditInfoCollaborateur(Request $request, $idProjet, $idSalaireEtchargeSocial, $idCollaborateur): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtchargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$salaireEtchargeSocial) {
            return new Response("salaire et charge Social n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $Collaborateur = $this->collaborateurProjetRepository->findOneCollaborateurProjetBySalaireEtchargeSocialObjet($idCollaborateur, $idSalaireEtchargeSocial);

        if (count($Collaborateur) == 0) {
            return new Response("Collaborateur n'existe pas", 400);
        } else {
            $Collaborateur = $Collaborateur[0];
        }

        $SalaireEtchargeCollaborateurInfo = $this->SalaireEtchargeCollaborateurInfoRepository->getOneCollaborateurInfoObjet($Collaborateur->getId(), $salaireEtchargeSocial->getId());

        if (count($SalaireEtchargeCollaborateurInfo) > 0) {
            $SalaireEtchargeCollaborateurInfo = $SalaireEtchargeCollaborateurInfo[0];
        }  else {
            $SalaireEtchargeCollaborateurInfo = new SalaireEtchargeCollaborateurInfo();
            $SalaireEtchargeCollaborateurInfo->setFinancementEtCharges($FinancementEtCharges);
            $SalaireEtchargeCollaborateurInfo->setSalaireEtchargeSocial($salaireEtchargeSocial);

            $this->entityManager->persist($SalaireEtchargeCollaborateurInfo);
            

        }
        $SalaireEtchargeCollaborateurInfo = $this->addEditCollaborateurInfo($informationuser, $SalaireEtchargeCollaborateurInfo, $salaireEtchargeSocial, $idCollaborateur);
 

        $Collaborateur->addSalaireEtchargeCollaborateurInfo($SalaireEtchargeCollaborateurInfo);
        if (gettype($SalaireEtchargeCollaborateurInfo) != "object") {
            return new Response($SalaireEtchargeCollaborateurInfo, 400);
        }
        
        $this->entityManager->flush();
       
        return $this->json(["salaireEtchargeSocialAnnee" => $salaireEtchargeSocial->getId(), "projetId" => $idProjet]);
    }



    #[Route("/api/{idProjet}/business-plan/financement-charges/salaire-charge-social-collaborateur/{idSalaireEtchargeSocial}/info-collaborateur", name: 'addInfoCollaborateur', methods: ['POST'])]
    public function addInfoCollaborateur(Request $request, $idProjet, $idSalaireEtchargeSocial): Response
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
            return new Response("Projet n'existe pas", 400);
        }

        $BusinessPlan = $Projet->getBusinessPlan();
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $salaireEtchargeSocial = $this->doctrine->getRepository(SalaireEtchargeSocial::class)->findOneBy(["id" => $idSalaireEtchargeSocial, "financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        if (!$salaireEtchargeSocial) {
            return new Response("salaire et charge Social n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        foreach ($informationuser as $idCollaborateur => $item) {

            $Collaborateur = $this->collaborateurProjetRepository->findOneCollaborateurProjetBySalaireEtchargeSocialObjet($idCollaborateur, $idSalaireEtchargeSocial);

            if (count($Collaborateur) > 0) {

                $Collaborateur = $Collaborateur[0];
                $SalaireEtchargeCollaborateurInfo = $this->SalaireEtchargeCollaborateurInfoRepository->getOneCollaborateurInfoObjet($Collaborateur->getId(), $salaireEtchargeSocial->getId());

                if (count($SalaireEtchargeCollaborateurInfo) > 0) {
                    $SalaireEtchargeCollaborateurInfo = $SalaireEtchargeCollaborateurInfo[0];
                } else {
                    $SalaireEtchargeCollaborateurInfo = new SalaireEtchargeCollaborateurInfo();
                }
                $SalaireEtchargeCollaborateurInfo->setFinancementEtCharges($FinancementEtCharges);
                $SalaireEtchargeCollaborateurInfo = $this->addEditCollaborateurInfo($item, $SalaireEtchargeCollaborateurInfo, $salaireEtchargeSocial, $idCollaborateur);

                if (gettype($SalaireEtchargeCollaborateurInfo) != "object") {
                    return new Response($SalaireEtchargeCollaborateurInfo, 400);
                }

                $SalaireEtchargeCollaborateurInfo->setSalaireEtchargeSocial($salaireEtchargeSocial);

                $this->entityManager->persist($SalaireEtchargeCollaborateurInfo);

                $Collaborateur->addSalaireEtchargeCollaborateurInfo($SalaireEtchargeCollaborateurInfo);
                $this->entityManager->flush();
            }
        }

        return $this->json(["salaireEtchargeSocialAnnee" => $salaireEtchargeSocial->getId(), "projetId" => $idProjet]);
    }
    public function getCollaborateurEtInfoForOneCollaborateur($salaireEtchargeSocial, $collaborateur)
    {
        $SalaireEtchargeCollaborateurInfo = $this->doctrine->getRepository(SalaireEtchargeCollaborateurInfo::class)->findOneBy(["SalaireEtchargeSocial" => $salaireEtchargeSocial, "CollaborateurProjet" => $collaborateur]);

        $collaborateurListe =
            [
                "idCollaborateur" => $collaborateur?->getId(),
                "firstname" => $collaborateur?->getUser()?->getFirstname(),
                "lastname" => $collaborateur?->getUser()?->getLastname(),
                "email" => $collaborateur?->getUser()?->getEmail(),
                "username" => $collaborateur?->getUser()?->getUsername(),
                "SalarieFirsteName" => $collaborateur?->getFirstename(),
                "SalarieLasteName" => $collaborateur?->getLastname(),
                "SalarieUserName" => $collaborateur?->getUsername(),
                "collaborateurInfoId" => $SalaireEtchargeCollaborateurInfo?->getId(),
                "salaireBrut" => $SalaireEtchargeCollaborateurInfo?->getSalaireBrut(),
                "typeContrat" => $SalaireEtchargeCollaborateurInfo?->getTypeContrat(),
                "chargeSocial" => $SalaireEtchargeCollaborateurInfo?->getChargeSocial(),
                "ProjetId" => $collaborateur?->getProjet()->getId()
            ];


        return $collaborateurListe;
    }

    public function getCollaborateurEtInfo($salaireEtchargeSocial)
    {
        $collaborateurs = $salaireEtchargeSocial->getCollaborateurProjets();
        $collaborateurListe = [];

        foreach ($collaborateurs as $collaborateur) {
            $SalaireEtchargeCollaborateurInfo = $this->doctrine->getRepository(SalaireEtchargeCollaborateurInfo::class)->findOneBy(["SalaireEtchargeSocial" => $salaireEtchargeSocial, "CollaborateurProjet" => $collaborateur]);

            $collaborateurListe[] =
                [
                    "idCollaborateur" => $collaborateur?->getId(),
                    "firstname" => $collaborateur?->getUser()?->getFirstname(),
                    "lastname" => $collaborateur?->getUser()?->getLastname(),
                    "email" => $collaborateur?->getUser()?->getEmail(),
                    "username" => $collaborateur?->getUser()?->getUsername(),
                    "SalarieFirsteName" => $collaborateur?->getFirstename(),
                    "SalarieLasteName" => $collaborateur?->getLastname(),
                    "SalarieUserName" => $collaborateur?->getUsername(),
                    "collaborateurInfoId" => $SalaireEtchargeCollaborateurInfo?->getId(),
                    "salaireBrut" => $SalaireEtchargeCollaborateurInfo?->getSalaireBrut(),
                    "typeContrat" => $SalaireEtchargeCollaborateurInfo?->getTypeContrat(),
                    "chargeSocial" => $SalaireEtchargeCollaborateurInfo?->getChargeSocial(),
                    "ProjetId" => $collaborateur?->getProjet()->getId()
                ];
        }

        return $collaborateurListe;
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


    public function addEditCollaborateurInfo($informationuser, $SalaireEtchargeCollaborateurInfo, $salaireEtchargeSocial, $idCollaborateur = null)
    {
        $erreur = [];
        $match = match (isset($informationuser["salaireBrut"]) and $informationuser['salaireBrut'] != "") {
            true => $SalaireEtchargeCollaborateurInfo->setSalaireBrut($informationuser["salaireBrut"]),
            false => $erreur[] = 'salaireBrut est oblig pour collaborateur ' . $idCollaborateur
        };

        
        if(isset($informationuser["typeContrat"]) and $informationuser['typeContrat'] != ""){
            $SalaireEtchargeCollaborateurInfo->setTypeContrat($informationuser["typeContrat"]);
        }else{
            $SalaireEtchargeCollaborateurInfo->setTypeContrat("contrat-pro");
        }

        $match = match (isset($informationuser["chargeSocial"]) and $informationuser['chargeSocial'] != "") {
            true => $SalaireEtchargeCollaborateurInfo->setChargeSocial($informationuser["chargeSocial"]),
            false => $erreur[] = 'chargeSocial est oblig pour collaborateur ' . $idCollaborateur
        };

        if (count($erreur) != 0) {

            return $erreur[0];
        }

        return $SalaireEtchargeCollaborateurInfo;
    }

    public function addEditSalaireEtChargeSocial($informationuser, $salaireEtchargeSocial)
    {
        if (isset($informationuser["name"]) and $informationuser['name'] != "") {
            $salaireEtchargeSocial->setName($informationuser["name"]);
        } else {
            return "name SalaireEtChargeSocial est oblig";
        }
        return $salaireEtchargeSocial;
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
}
