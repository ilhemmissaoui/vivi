<?php

namespace App\Service;

use App\Entity\CollaborateurProjet;
use App\Entity\FinancementChiffreAffaire;
use App\Entity\FinancementEtCharges;
use App\Entity\HistoireEtEquipe;
use App\Entity\MarcheEtConcurrence;
use App\Entity\NotreSolution;
use App\Entity\VisionStrategiesForBusinessPlan;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\MonthListeChiffreAffaireRepository;
use App\Repository\ProjetRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class vivitoolsService
{
    private $UserRepository;
    private $entityManager;
    private $doctrine;
    private $ProjetRepository;
    private $MonthListeChiffreAffaireRepository;
    private $CollaborateurProjetRepository;

    public function __construct(CollaborateurProjetRepository $CollaborateurProjetRepository,MonthListeChiffreAffaireRepository $MonthListeChiffreAffaireRepository,ProjetRepository $ProjetRepository, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, UserRepository $UserRepository)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->MonthListeChiffreAffaireRepository = $MonthListeChiffreAffaireRepository;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;

    }

    function generatetoken($length = 25)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ9876543210';
        $charactersLength = strlen($characters);
        $token = '';
        for ($i = 0; $i < $length; $i++) {
            $token .= $characters[rand(0, $charactersLength - 1)];
        }
        return $token;
    }

    function jsonToarray($jsonArray)
    {
        if ($jsonArray) {
            $informationuser = json_decode($jsonArray, true);
            return $informationuser;
        } else {
            return null;
        }
    }

    function verificationEmail($email)
    {
        $patternEmail = '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/';
        if (!preg_match($patternEmail, $email)) {
            return false;
        } else {
            return true;
        }
    }
    function veruficationPassword($Password)
    {
        $patternPassword = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+}{:?><~`\-=\[\]\\;',.|]{8,}$/";
        if (!preg_match($patternPassword, $Password)) {
            return false;
        } else {
            return true;
        }
    }

    public function checkCollaborateurInProject($user, $projet, $idProjet,$permission,$nedPermission = true)
    {
        if (!$projet) {
            $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet]);

            if (!$projet) {
                return new Response("Projet n'existe pas", 400);
            }

            $collaborateurProjet = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["user" => $user, "projet" => $projet]);

            if (!$collaborateurProjet) {
                return new Response("collaborateur n'a pas ce projet", 400);
            }
            
            if($nedPermission == true ){
                if (!in_array($permission, $collaborateurProjet->getPagePermission())) {
                    return new Response("accès refusé", 403);
                }
            }
           
            return [$collaborateurProjet, $projet];
        }
        return true;
    }

    public function check_HistoireEtEquipe($Projet){
        if ($Projet->getBusinessPlan()->getHistoireEtEquipe()) {
            $histoireEtEquipe = $Projet->getBusinessPlan()->getHistoireEtEquipe();
        } else {
            $histoireEtEquipe = new HistoireEtEquipe();
            $this->entityManager->persist($histoireEtEquipe);
            $Projet->getBusinessPlan()->setHistoireEtEquipe($histoireEtEquipe);
            $this->entityManager->flush();
        }

        return $histoireEtEquipe;
    }


    public function check_MarcheEtConcurrence($Projet){
        if($Projet->getBusinessPlan()->getMarcheEtConcurrence()){
            $MarcheEtConcurrence = $Projet->getBusinessPlan()->getMarcheEtConcurrence(); 
        }else{
            $MarcheEtConcurrence = new MarcheEtConcurrence();
            $Projet->getBusinessPlan()->setMarcheEtConcurrence($MarcheEtConcurrence);
            $Projet->getBusinessPlan()->setAvancement($Projet->getBusinessPlan()->getAvancement() + 1);
            $this->entityManager->persist($MarcheEtConcurrence);
            $this->entityManager->flush();
        }  

        return $MarcheEtConcurrence;
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


    public function checkFinancementChiffreAffaire($FinancementEtCharges)
    {
        if ($FinancementEtCharges ->getFinancementChiffreAffaire()) {
            $FinancementChiffreAffaire = $FinancementEtCharges ->getFinancementChiffreAffaire();
        } else {
            $FinancementChiffreAffaire = new FinancementChiffreAffaire();
            $this->entityManager->persist($FinancementChiffreAffaire);
            $FinancementEtCharges->setFinancementChiffreAffaire($FinancementChiffreAffaire);
            $this->entityManager->flush();
        }
        return $FinancementChiffreAffaire;
    }
    public function calcSalaireBrutCollaborateur($collaborateurs){
        $somme = 0;
        if($collaborateurs and $collaborateurs?->getSalaireEtchargeCollaborateurInfos()){
            foreach($collaborateurs->getSalaireEtchargeCollaborateurInfos() as $collaborateurInfo)
            {
                $somme += $collaborateurInfo->getSalaireBrut();
            }
   
        }
        
        return $somme;
    }



    public function calcSalaireNetDirigeants($dirigeants)
    {
        $somme = 0;
        $TauxACRE = 30 / 100;
        $TauxCotisation = 25 / 100;
        $CotisationSocialeDirigeants = 0;
        $RevenuBrutAnnuel = 0;

        $CotisationsSocialsPatronal = 0;
        $RevenuBrutAnnuelPatronal = 0;

        if (!$dirigeants?->getSalaireEtchargeDirigentsInfo()) {
            return [
                "Salaire net des dirigeants" => $somme, "Cotisation sociale des dirigeants" => $CotisationSocialeDirigeants, "Revenu Brut Annuel" => $RevenuBrutAnnuel,
                "CotisationsSocialsPatronal" => $CotisationsSocialsPatronal

            ];
        }

        foreach ($dirigeants->getSalaireEtchargeDirigentsInfo() as $infoDirigeant) 
        {
            $RemunerationAnnuelle = $infoDirigeant->getReparationRenumeratinAnnee();
          
             $PourcentageParticipationCapital = $infoDirigeant->getPourcentageParticipationCapital();
           
            if($RemunerationAnnuelle  != 0 and (1 - ($PourcentageParticipationCapital / 100)) != 0){
                $RevenuBrutAnnuel =  $RemunerationAnnuelle / (1 - ($PourcentageParticipationCapital / 100));

            }else{
                $RevenuBrutAnnuel = 0;
            }
             
            $ReductionACRE = ($RevenuBrutAnnuel - $RemunerationAnnuelle) * $TauxACRE;
           
            $CotisationSocialeDirigeants += $CotisationsSocialesBrutes = $RevenuBrutAnnuel * $TauxCotisation;
            
            $SalaireNetAnnuel = $RevenuBrutAnnuel - $CotisationsSocialesBrutes - $ReductionACRE;
            
            $somme += $SalaireNetAnnuel;


            $RevenuBrutAnnuelPatronal = $RemunerationAnnuelle;
            
            $ReductionAcrePatronal  = $RevenuBrutAnnuelPatronal *  $TauxACRE;

            $CotisationsSocialsPatronal += $RevenuBrutAnnuelPatronal - $ReductionAcrePatronal;
        }

        return [
            "Salaire net des dirigeants" =>number_format($somme , 2, '.', ''), "Cotisation sociale des dirigeants" => number_format($CotisationSocialeDirigeants , 2, '.', ''),
            "Revenu Brut Annuel" =>number_format($RevenuBrutAnnuel , 2, '.', '') , "CotisationsSocialsPatronal" => number_format($CotisationsSocialsPatronal , 2, '.', '')
        ];

    }



    public function calcAvancement($avancement,$total){
        
        if(!$avancement or $avancement == 0){
            return 0;
        }
        
        $avancementPrc = ($avancement / $total) * 100;
        if( $avancementPrc > 100){
            return 100;
        }
        return   number_format($avancementPrc, 0, '.', '');
       
    }


    public function calcAvancementBusinessPlan($BusinessPlan){
        
        $avancement = 0;

        $avancement += $this->calcAvancement($BusinessPlan?->getHistoireEtEquipe()?->getAvancement(),5);
        $avancement += $this->calcAvancement($BusinessPlan?->getNotreSolution()?->getAvancement(),1);
        $avancement += $this->calcAvancement($BusinessPlan?->getMarcheEtConcurrence()?->getAvancement(),2);
        $avancement += $this->calcAvancement($BusinessPlan?->getPositionnementConcurrentiel()?->getAvancement(),2);
        $avancement += $this->calcAvancement($BusinessPlan?->getVisionStrategiesForBusinessPlan()?->getAvancement(),1);
 
        $avancement += $this->calcAvancement($this->calSumAvancementFinancementEtCharges($BusinessPlan?->getFinancementEtCharges()), 6);

        $avancement = $avancement / 6;
        if( $avancement > 100){
            return 100;
        }
        return   number_format($avancement, 0, '.', '');
    }

    public function calcAvancementHistoireEquipe($histoireEtEquipe,$Projet){
        $avancement = 0;
        if($histoireEtEquipe->getPresentationSociete() and $histoireEtEquipe->getPresentationSociete() !=""){
            $avancement++;
        }

        if($histoireEtEquipe->getPartenaire() and $histoireEtEquipe->getPartenaire() != "")
        {
            $avancement++;
        }

        if($histoireEtEquipe->getSecteur() and $histoireEtEquipe->getSecteur() != ""){
            $avancement++;
        }
        if($histoireEtEquipe->getTendance() and $histoireEtEquipe->getTendance() !=""){
            $avancement++;

        }
        if($histoireEtEquipe->getCible() and $histoireEtEquipe->getCible() !=""){
            $avancement++;
        }

        $equipeMumbers = $this->CollaborateurProjetRepository->findBy(["projet" => $Projet, "Equipe" => 1,"deleted"=>0]);

        if (count($equipeMumbers) > 0) {
            $avancement++;                        
        }

        $histoireEtEquipe->setAvancement($avancement);
        $this->entityManager->flush();

    }


    public function check_visionStrategiesForBusinessPlan($BusinessPlan)
    {
        if (!$BusinessPlan->getVisionStrategiesForBusinessPlan()) {
            $visionStrategiesForBusinessPlan = new VisionStrategiesForBusinessPlan();
            $BusinessPlan->setVisionStrategiesForBusinessPlan($visionStrategiesForBusinessPlan);
            $BusinessPlan->setAvancement($BusinessPlan->getAvancement() + 1);
            $this->entityManager->flush();
        } else {
            $visionStrategiesForBusinessPlan = $BusinessPlan->getVisionStrategiesForBusinessPlan();
        }
        return $visionStrategiesForBusinessPlan;
    }

    public function checkNotreSolution($Projet, $BusinessPlan)
    {
        if ($BusinessPlan->getNotreSolution()) {
            $NotreSolution = $BusinessPlan->getNotreSolution();
        } else {
            $NotreSolution = new NotreSolution();
            $this->entityManager->persist($NotreSolution);
            $BusinessPlan->setNotreSolution($NotreSolution);
            
            $this->entityManager->flush();
        }

       
        return $NotreSolution;
    }
    public function avancementFinancementEtChargesChargeSocialEtDirigeant($FinancementEtCharges){
     
       $avantage = 0;
        if(count($FinancementEtCharges->getSalaireEtchargeCollaborateurInfos()) > 0){
            $avantage += 1;
        }
        if(count($FinancementEtCharges->getSalaireEtchargeDirigentsInfos()) > 0){
            $avantage += 1;
        }
        $FinancementEtCharges->setAvanecement($avantage);
        $this->entityManager->flush();
    }

    public function getSolutionWithgetAnneeArray($Solution,$Projet, $BusinessPlan)
    {
        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
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


    public function calSumAvancementFinancementEtCharges($FinancementEtCharges){
        $avancement = 0;
        $avancement += $FinancementEtCharges?->getAvanecement() ?? 0;
        $avancement += $FinancementEtCharges?->getFinancementDepense()?->getAvancement() ?? 0;
        $avancement += $FinancementEtCharges?->getFinancementInvestissement()?->getAvancement() ?? 0;
        $avancement += $FinancementEtCharges?->getFinancementEncaisseDecaissement()?->getAvancement() ?? 0;
        $avancement += $FinancementEtCharges?->getFinancementChiffreAffaire()?->getAvancement() ?? 0;

        return $avancement;
    }
}
