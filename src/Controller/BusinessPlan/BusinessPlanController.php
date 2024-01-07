<?php
namespace App\Controller\BusinessPlan;

use App\Entity\Besoins;
use App\Entity\BusinesModel;
use App\Entity\BusinessPlan;
use App\Entity\Concurrents;
use App\Entity\HistoireEtEquipe;
use App\Entity\Projet;
use App\Entity\Societe;
use App\Entity\Solution;
use App\Entity\VisionStrategies;
use App\Repository\BesoinsRepository;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\MarcheEtConcurrenceRepository;
use App\Repository\ProjetRepository;
use Knp\Snappy\Pdf;
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
use Proxies\__CG__\App\Entity\ProjetAnnees;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Knp\Snappy\Image;
use Imagick;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class BusinessPlanController extends AbstractController
{
    private $vivitoolsService;
    private $FinancemenService;
    private $entityManager;
    private $doctrine;
    private $UserRepository;
    private $BesoinsRepository;
    private $CollaborateurProjetRepository;
    private $MarcheEtConcurrenceRepository; 

    public function __construct(FinancemenService $FinancemenService,BesoinsRepository $BesoinsRepository,MarcheEtConcurrenceRepository $MarcheEtConcurrenceRepository,CollaborateurProjetRepository $CollaborateurProjetRepository, UserRepository $UserRepository, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->entityManager = $entityManager;
        $this->vivitoolsService = $vivitoolsService;
        $this->FinancemenService = $FinancemenService;
        $this->doctrine = $doctrine;
        $this->BesoinsRepository = $BesoinsRepository;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;
        $this->MarcheEtConcurrenceRepository = $MarcheEtConcurrenceRepository;


    }


    #[Route('/api/{idProjet}/business-plan/pdf/generator/', name: 'business_pdf_generator')]
    public function business_pdf_generator($idProjet,Request $request, SessionInterface $session): Response
    {
        
        $Projet =  $this->doctrine->getRepository(Projet::class)->findOneBy(["id"=>$idProjet]);
        
        if(!$Projet){
            return new Response("Projet n'existe pas");
        }

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
           'pdf_generator/businessPlan.html.twig',
            [
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
                 
            ]
        );

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
    

         
        $dompdf = new Dompdf($options);
        $paperSize = array(0, 0, 1200, 1000); // width, height
        $dompdf->setPaper($paperSize);
        $dompdf->loadHtml($html
    );
        
        $dompdf->render();

        $pdfContent = $dompdf->output();

        return new Response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }
    #[Route('/api/{idProjet}/business-plan/module-avancement', name: 'business_Module_avancement')]
    public function business_Module_avancement($idProjet,Request $request, SessionInterface $session): Response
    {
         $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken || !$user || !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
        
        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, null,false);

        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 404);
        }
        $BusinessPlan = $Projet->getBusinessPlan();
        
        $histoireEtEquipe = $this->vivitoolsService->check_HistoireEtEquipe($Projet);
        $FinancementEtCharges = $this->FinancemenService->checkFinancementEtCharges($Projet, $BusinessPlan);
        $MarcheEtConcurrence =$this->vivitoolsService->check_MarcheEtConcurrence($Projet);
        $NotreSolution = $this->vivitoolsService->checkNotreSolution($Projet, $BusinessPlan);
        $visionStrategiesForBusinessPlan = $this->vivitoolsService->check_visionStrategiesForBusinessPlan($BusinessPlan);

        $PositionnementConcurrentiel = $Projet->getBusinessPlan()?->getPositionnementConcurrentiel();
        if($PositionnementConcurrentiel ){
            $PositionnementConcurrentielAvancement = $this->vivitoolsService->calcAvancement($PositionnementConcurrentiel?->getAvancement(), 2);
        }else{
            $PositionnementConcurrentielAvancement = 0;
        }
        $now = new DateTime();
        $creationDate =  $Projet->getDateCreation();
        $interval = $creationDate->diff($now);
        $months = $interval->format('%m');

        $infoBusinessPlan=[
            "histoireEtEquipe"=> $this->vivitoolsService->calcAvancement($histoireEtEquipe?->getAvancement(), 6),
            "MarcheEtConcurrence"=> $this->vivitoolsService->calcAvancement($MarcheEtConcurrence?->getAvancement(), 2),
            "NotreSolution"=> $this->vivitoolsService->calcAvancement($NotreSolution?->getAvancement(), 1),
            "visionStrategiesForBusinessPlan"=> $this->vivitoolsService->calcAvancement($visionStrategiesForBusinessPlan?->getAvancement(), 1),
            "PositionnementConcurrentiel"=> $PositionnementConcurrentielAvancement,
            "FinancementEtCharges"=> $this->vivitoolsService->calcAvancement($this->vivitoolsService->calSumAvancementFinancementEtCharges($FinancementEtCharges), 6),
            "dateCreation" =>$Projet->getDateCreation()->format('M j, Y'),
            "month"=>$months
        ];

        return $this->json($infoBusinessPlan);
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