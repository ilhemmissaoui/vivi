<?php

namespace App\Controller\BusinesModel;

use App\Entity\Besoins;
use App\Entity\BusinesModel;
use App\Entity\BusinessPlan;
use App\Entity\Concurrents;
use App\Entity\HistoireEtEquipe;
use App\Entity\Projet;
use App\Entity\ProjetAnnees;
use App\Entity\Societe;
use App\Entity\Solution;
use App\Entity\VisionStrategies;
use App\Repository\BesoinsRepository;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\MarcheEtConcurrenceRepository;
use App\Repository\ProjetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Service\FinancemenService;
use App\Service\SendEmail;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;

class BusinesModelController extends AbstractController
{
    private $vivitoolsService;

    private $FinancemenService;
    private $entityManager;
    private $doctrine;
    private $UserRepository;
    private $BesoinsRepository;
    private $CollaborateurProjetRepository;
    private $MarcheEtConcurrenceRepository; 
    const PERMISSION ="busines_canva";

    public function __construct(FinancemenService $FinancemenService,BesoinsRepository $BesoinsRepository,MarcheEtConcurrenceRepository $MarcheEtConcurrenceRepository,CollaborateurProjetRepository $CollaborateurProjetRepository,UserRepository $UserRepository, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->entityManager = $entityManager;
        $this->vivitoolsService = $vivitoolsService;
        $this->doctrine = $doctrine;

        $this->BesoinsRepository = $BesoinsRepository;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;
        $this->MarcheEtConcurrenceRepository = $MarcheEtConcurrenceRepository;

        $this->FinancemenService = $FinancemenService;

    }


    #[Route('/api/{idProjet}/busness-model/information/', name: 'busnessmodel', methods: ['POST', "PUT"])]
    public function busnessmodelInfo(Request $request, $idProjet,)
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
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }

        if (isset($informationuser["segmentClient"])) {
            if (!$Projet->getBusinesModel()->getSegmentClient()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }
            if ($Projet->getBusinesModel()->getSegmentClient() and ($informationuser["segmentClient"] == "" or $informationuser["segmentClient"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setSegmentClient($informationuser["segmentClient"]);
            
        }

        if (isset($informationuser["propositionValeur"])) {
            if (!$Projet->getBusinesModel()->getPropositionValeur()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }

            if ($Projet->getBusinesModel()->getPropositionValeur() and ($informationuser["propositionValeur"] == "" or $informationuser["propositionValeur"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setPropositionValeur($informationuser["propositionValeur"]);
        }

        if (isset($informationuser["canauxDistribution"])) {
            if (!$Projet->getBusinesModel()->getCanauxDistribution()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }
            if ($Projet->getBusinesModel()->getCanauxDistribution() and ($informationuser["canauxDistribution"] == "" or $informationuser["canauxDistribution"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setCanauxDistribution($informationuser["canauxDistribution"]);
        }

        if (isset($informationuser["fluxRevenus"])) {

            if (!$Projet->getBusinesModel()->getFluxRevenus()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }
            if ($Projet->getBusinesModel()->getFluxRevenus() and ($informationuser["fluxRevenus"] == "" or $informationuser["fluxRevenus"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setFluxRevenus($informationuser["fluxRevenus"]);
        }

        if (isset($informationuser["resourceCles"])) {
            if (!$Projet->getBusinesModel()->getResourceCles()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }
            if ($Projet->getBusinesModel()->getResourceCles() and ($informationuser["resourceCles"] == "" or $informationuser["resourceCles"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }
            $Projet->getBusinesModel()->setResourceCles($informationuser["resourceCles"]);
        }

        if (isset($informationuser["activiteCles"])) {
            
            if (!$Projet->getBusinesModel()->getActiviteCles()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }

            if ($Projet->getBusinesModel()->getActiviteCles() and ($informationuser["activiteCles"] == "" or $informationuser["activiteCles"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }
            
            $Projet->getBusinesModel()->setActiviteCles($informationuser["activiteCles"]);
        }

        if (isset($informationuser["partenaireStratedique"])) {

            if (!$Projet->getBusinesModel()->getPartnaireStratedique()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }
            
            if ($Projet->getBusinesModel()->getPartnaireStratedique() and ($informationuser["partenaireStratedique"] == "" or $informationuser["partenaireStratedique"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }
            
            $Projet->getBusinesModel()->setPartnaireStratedique($informationuser["partenaireStratedique"]);
        }

        if (isset($informationuser["structureCouts"])) {
            
            if (!$Projet->getBusinesModel()->getStructureCouts()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }

            if ($Projet->getBusinesModel()->getStructureCouts() and ($informationuser["structureCouts"] == "" or $informationuser["structureCouts"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setStructureCouts($informationuser["structureCouts"]);
        }

        if (isset($informationuser["relationClient"])) {
            if (!$Projet->getBusinesModel()->getRelationClient()) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() + 1);
            }

            if ($Projet->getBusinesModel()->getRelationClient() and ($informationuser["relationClient"] == "" or $informationuser["relationClient"] == null)) {
                $Projet->getBusinesModel()->setAvancement($Projet->getBusinesModel()->getAvancement() - 1);
            }

            $Projet->getBusinesModel()->setRelationClient($informationuser["relationClient"]);
        }

        if ($request->isMethod('PUT')) {
            $Projet->getBusinesModel()->setLasteUpdate(new DateTime());
        }

        $this->entityManager->flush();

        $avancement = $this->vivitoolsService->calcAvancement($Projet->getBusinesModel()->getAvancement(),9);

        return $this->json(["status"=>200,"avancement"=> $avancement]);
    }

    #[Route('/api/{idProjet}/busness-model/information/{typeBusinessModel}', name: 'GetbusnessModelinfo', methods: ['GET'])]
    public function GetbusnessModelinfo(Request $request, $idProjet, $typeBusinessModel)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if(!$Projet){
            return new Response("Projet n'existe pas");
        }
        
        $Projet->getBusinesModel();
        
        if($Projet->getBusinesModel()){
            $BusinesModel = $Projet->getBusinesModel();
        }else{
            return new Response("BusinesModel not found",400);
        }
        
        
        if ($typeBusinessModel == "segmentClient") {
            $GetbusnessModelinfo = $BusinesModel->getSegmentClient();
        }

        if ($typeBusinessModel == "propositionValeur") {
            $GetbusnessModelinfo = $BusinesModel->getPropositionValeur();
        }

        if ($typeBusinessModel == "canauxDistribution") {
            $GetbusnessModelinfo = $BusinesModel->getCanauxDistribution();
        }

        if ($typeBusinessModel == "fluxRevenus") {
            $GetbusnessModelinfo = $BusinesModel->getFluxRevenus();
        }


        if ($typeBusinessModel == "resourceCles") {
            $GetbusnessModelinfo = $BusinesModel->getResourceCles();
        }

        if ($typeBusinessModel == "activiteCles") {
            $GetbusnessModelinfo = $BusinesModel->getActiviteCles();
        }

        if ($typeBusinessModel == "partenaireStratedique") {
            $GetbusnessModelinfo = $BusinesModel->getPartnaireStratedique();
        }

        if ($typeBusinessModel == "structureCouts") {
            $GetbusnessModelinfo = $BusinesModel->getStructureCouts();
        }

        if ($typeBusinessModel == "relationClient") {
            $GetbusnessModelinfo = $BusinesModel->getRelationClient();
        }
        $avancement = $this->vivitoolsService->calcAvancement($Projet->getBusinesModel()->getAvancement(),9);

        return $this->json(["busnessModelinfo"=>$GetbusnessModelinfo,"avancement"=>$avancement]);
    }


    #[Route('/api/{idProjet}/busnessModelinfo/pdf/generator/', name: 'app_pdf_generator')]
    public function index($idProjet,Request $request,Security $security): Response
    {
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet]);
        if(!$Projet){
            return new Response("Projet n'existe pas");
        }
        $businessModel = $Projet->getBusinesModel();
        $businessPlan = $Projet->getBusinessPlan();

        $equipes = $this->membreEquipe($Projet);

        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
            $societesListe = $this->MarcheEtConcurrenceRepository->getSocieteByMarcheEtConcurrenceId($MarcheEtConcurrence->getId());
        }else{
            $societesListe = [];
        }

        $visionStratigique = $this->getVisionStrategique($businessPlan,$Projet);
        $solutions = $this->getSolutions($Projet,$businessPlan);
        $besoinListe = $this->getbesoinListe($businessPlan)["besoinListe"];
        $concurrents = $this->getbesoinListe($businessPlan)["concurrent"];
        $conncurentValue = $this->getbesoinListe($businessPlan)["conncurentValue"];
        
        $compteResultat = $this->FinancemenService->compteResultat($Projet);
   
        $BusinessPlan = $Projet->getBusinessPlan();
         $bilans = [];
         $Tresorerie = [];
        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $PlanFinancement= $this->FinancemenService->PlanFinancement($Projet);
 
        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["FinancementEtCharges" => $FinancementEtCharges, "projet" => $Projet], ["annee" => "ASC"]);
         
        foreach($ProjetAnnees as $ProjetAnnee){
            $bilans[$ProjetAnnee->getAnnee()] = $this->FinancemenService->getBilan($ProjetAnnee,$FinancementEtCharges);
            $Tresorerie[$ProjetAnnee->getAnnee()] = $this->FinancemenService->getTresorerie($ProjetAnnee,$FinancementEtCharges);
         }
      
        $html =  $this->renderView(
            'pdf_generator/businessModelCanvas.html.twig',
            [
                "businessModel" => $businessModel,
                "equipes" => $equipes,
                "societesListe" =>$societesListe,
                "visionStratigiques"=> $visionStratigique,
                "solutions"=>$solutions,
                "besoinListe"=>$besoinListe,
                "concurrents"=>$concurrents,
                "conncurentValue"=>$conncurentValue,
                "compteResultats"=>$compteResultat,
                "ProjetAnnees"=>$ProjetAnnees,
                "PlanFinancements"=>$PlanFinancement,
                "bilans"=>$bilans,
                "Tresoreries"=>$Tresorerie,
                "Projet"=>$Projet
            ]
        );
         
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
  
        $dompdf = new Dompdf($options);
        $paperSize = array(0, 0, 1200, 1080); // width, height
        $dompdf->setPaper($paperSize);
        $dompdf->loadHtml($html);
        
        $dompdf->render();

        $pdfContent = $dompdf->output();

        return new Response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }


    #[Route('/api/{idProjet}/busness-model/all/information/', name: 'GetAllbusnessModelinfo', methods: ['GET'])]
    public function GetAllbusnessModelinfo(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER",$user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided',401);
        }

        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet,"instance"=>$user->getInstance()]);
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, self::PERMISSION);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if(!$Projet){
            return new Response("Projet n'existe pas",400);
        }
        if($Projet->getBusinesModel()){
            $BusinesModel = $Projet->getBusinesModel();
        }else{
            return new Response("BusinesModel not found",400);
        }
        $GetbusnessModelinfo =[
            "segmentClient"=> $BusinesModel->getSegmentClient(),
            "propositionValeur"=>$BusinesModel->getPropositionValeur(),
            "canauxDistribution"=>$BusinesModel->getCanauxDistribution(),
            "fluxRevenus"=>$BusinesModel->getFluxRevenus(),
            "resourceCles"=>$BusinesModel->getResourceCles(),
            "activiteCles"=>$BusinesModel->getActiviteCles(),
            "partenaireStratedique"=>$BusinesModel->getPartnaireStratedique(),
            "structureCouts"=>$BusinesModel->getStructureCouts(),
            "relationClient"=>$BusinesModel->getRelationClient()
        ];
        $avancement = $this->vivitoolsService->calcAvancement($Projet->getBusinesModel()->getAvancement(),9);

        return $this->json(["busnessModelinfo"=>$GetbusnessModelinfo,"avancement"=>$avancement]);
    }


   

    public function membreEquipe($Projet){
        $histoireEtEquipe = $this->getAddHistoireEtEquipe($Projet);
        $equipeMumber = $this->CollaborateurProjetRepository->findMembreEquipeProjet($Projet->getId());
         return $equipeMumber ;
     }
 
     public function getAddHistoireEtEquipe($Projet){
         if ($Projet->getBusinessPlan()->getHistoireEtEquipe()) {
             $histoireEtEquipe = $Projet->getBusinessPlan()->getHistoireEtEquipe();
         } else {
             $histoireEtEquipe = new HistoireEtEquipe();
             $Projet->getBusinessPlan()->setHistoireEtEquipe($histoireEtEquipe);
             $Projet->getBusinessPlan()->setAvancement($Projet->getBusinessPlan()->getAvancement() + 1);
             $this->entityManager->flush();
         }
         return $histoireEtEquipe;
     }
 
 
     public function getVisionStrategique($BusinessPlan,$Projet){
         $VisionStrategiesListeAnnee=[];
         $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);
         $projetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);
         foreach ($projetAnnees as $projetAnnee) {
             $VisionStrategies =  $this->doctrine->getRepository(VisionStrategies::class)->findBy(["projetAnnees" => $projetAnnee, "visionStrategiesForBusinessPlan" => $visionStrategiesForBusinessPlan, "deleted" => 0]);
 
             if (count($VisionStrategies) == 0) {
                 return $this->json([]);
             }
 
             $VisionStrategiesListe = [];
 
             foreach ($VisionStrategies as $VisionStrategie) {
 
                 $VisionStrategieAction = [];
                 $VisionStrategieObjectif = [];
                 $VisionStrategieCout = [];
 
                 if ($VisionStrategie->getAction()) {
                     if ($VisionStrategie->getAction()->getFin()?->format("Y-m-d")) {
                         $date = $VisionStrategie->getAction()->getFin()?->format("Y-m-d");
                     } else {
                         $date = "";
                     }
                     $VisionStrategieAction = [
                         "actionDateFin" => $date,
                         "action" => $VisionStrategie->getAction()->getAction(),
                         "cible" => $VisionStrategie->getAction()->getCible(),
                     ];
                 }
 
                 if ($VisionStrategie->getObjectif()) {
 
                     $VisionStrategieObjectif = [
 
                         "description" => $VisionStrategie->getObjectif()->getDescription()
 
                     ];
                 }
 
                 if ($VisionStrategie->getCout()) {
 
                     $VisionStrategieCout = [
                         "cout" => $VisionStrategie->getCout()->getCout(),
                     ];
                 }
                 if ($VisionStrategie->getAvancement() < 0) {
                     $VisionStrategie->setAvancement(0);
                     $this->entityManager->flush();
                 }
                 $VisionStrategiesListe[] = [
                     "idVisionStrategies" => $VisionStrategie->getId(),
                     "annee" => $VisionStrategie->getProjetAnnees()->getAnnee(),
                     "dateVisionStrategies" => $VisionStrategie->getDateVisionStrategies(),
                     "actionVision" => $VisionStrategieAction,
                     "objectifVision" => $VisionStrategieObjectif,
                     "coutVision" => $VisionStrategieCout,
                     "VisionStrategieAvancement" => $VisionStrategie->getAvancement()
                 ];
             }
             $VisionStrategiesListeAnnee[] = [
                 "idAnnee" => $projetAnnee->getId(),
                 "annee" => $projetAnnee->getAnnee(),
                 "VisionStrategiesListe" => $VisionStrategiesListe
             ];
         }
         return $VisionStrategiesListeAnnee;
     }
 
     public function getSolutions($Projet, $BusinessPlan){
        
         
         $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
         $SolutionListe = [];
         
         $Solutions = $this->doctrine->getRepository(Solution::class)->findBy([ "notreSolution"=>$NotreSolution,"deleted"=>0]);
             
         foreach ($Solutions as $Solution) {
             
             $SolutionListe[] = $this->vivitoolsService->getSolutionWithgetAnneeArray($Solution,$Projet, $BusinessPlan);
 
         }
 
         return $SolutionListe;
     }
 
 
     public function getbesoinListe($businessPlan) {
         $PositionnementConcurrentiel = $businessPlan->getPositionnementConcurrentiel();
 
         $besoinListe = [];
 
         $besoins = $this->doctrine->getRepository(Besoins::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel, "deleted" => 0]);
         $listeSociete = [];
        
         $conncurentValue=[] ;
         $Societes = $this->doctrine->getRepository(Societe::class)->findBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel]);
         $listeSociete[] = ["id"=>"projet","name"=>$businessPlan->getProjet()->getName()];
         $societeExiste=[];
 
         foreach ($besoins as $besoin) {
          
             $besoinListe[] = [
                 "id" => $besoin->getId(),
                 "name" => $besoin->getName(),
                 
             ];
             $ConcurrentProjet = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel,"societe"=>null,"besoins"=>$besoin]);
 
             if($ConcurrentProjet){
                 $conncurentValue[$besoin->getId()]["projet"] = $ConcurrentProjet->getVolume();
             }else{
                 $conncurentValue[$besoin->getId()]["projet"] = "*";
             }
             foreach ($Societes as $Societe) {
                  $Concurrent = $this->doctrine->getRepository(Concurrents::class)->findOneBy(["positionnementConcurrentiel" => $PositionnementConcurrentiel,"societe"=>$Societe,"besoins"=>$besoin]);
                 if($Concurrent){
                     $conncurentValue[$besoin->getId()][$Societe->getId()] = $Concurrent->getVolume();
                 }else{
                     $conncurentValue[$besoin->getId()][$Societe->getId()] = "*";
                 }
                 if(!in_array($Societe->getId(),$societeExiste)){
 
                     $listeSociete[]=["name"=>$Societe->getName(),"id"=>$Societe->getId()];
                     
                     $societeExiste[]=$Societe->getId();
                 }
             }
         }
         
             
         
            
         return   ["besoinListe"=>$besoinListe,"concurrent"=>$listeSociete,"conncurentValue"=>$conncurentValue];
     }
}
