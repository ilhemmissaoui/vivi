<?php

namespace App\Service;

use App\Entity\ChargeExt;
use App\Entity\CollaborateurProjet;
use App\Entity\EncaisseDecaissement;
use App\Entity\FinancementChiffreAffaire;
use App\Entity\FinancementEtCharges;
use App\Entity\InfoBilan;
use App\Entity\Investissement;
use App\Entity\InvestissementNature;
use App\Entity\MonthChargeExt;
use App\Entity\PlanFinancementInfo;
use App\Entity\ProjetAnnees;
use App\Entity\TresorerieInfo;
use App\Repository\MonthListeChiffreAffaireRepository;
use App\Repository\ProjetRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;

class FinancemenService
{
    private $UserRepository;
    private $entityManager;
    private $doctrine;
    private $ProjetRepository;
    private $MonthListeChiffreAffaireRepository;
    private $vivitoolsService;

    public function __construct(vivitoolsService $vivitoolsService,MonthListeChiffreAffaireRepository $MonthListeChiffreAffaireRepository,ProjetRepository $ProjetRepository, ManagerRegistry $doctrine, EntityManagerInterface $entityManager, UserRepository $UserRepository)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
        $this->MonthListeChiffreAffaireRepository = $MonthListeChiffreAffaireRepository;
        $this->vivitoolsService = $vivitoolsService;

    }
    public function ResultatExloitation($ChiffreAffaire , $TotalChargesExloitation,$ProjetAnnees, $FinancementEtCharges){
        
        
        $SouscriptionEmprunts = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $totalSouscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);
        $apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);        
        $apports = $this->calcTotalArray($apports);

        $ChargesSociales = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $totalSChargesSociales = $this->calcTotalArray($ChargesSociales);
        
        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);
      
        $c_c_associeSum= $this->c_c_associeSum($ProjetAnnees, $FinancementEtCharges);

        $EcheanceEmprunt = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);
        $EcheanceEmprunt = $this->calcTotalArray($EcheanceEmprunt);


        $somme = $ChiffreAffaire - $TotalChargesExloitation -$totalSChargesSociales -$totalSouscriptionEmprunts -$c_c_associeSum - $apports - $AutresImpotsTaxes -$EcheanceEmprunt;
        return $somme;
    }


    function c_c_associeSum($ProjetAnnees, $FinancementEtCharges)
    {

        $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => 1]);
        $summe = 0;

        $summe += $TresorerieInfo?->getJan();
        $summe += $TresorerieInfo?->getFrv();
        $summe += $TresorerieInfo?->getMar();
        $summe += $TresorerieInfo?->getAvr();
        $summe += $TresorerieInfo?->getMai();
        $summe += $TresorerieInfo?->getJuin();
        $summe += $TresorerieInfo?->getJuil();
        $summe += $TresorerieInfo?->getAou();
        $summe += $TresorerieInfo?->getSept();
        $summe += $TresorerieInfo?->getOct();
        $summe += $TresorerieInfo?->getNov();
        $summe += $TresorerieInfo?->getDece();


        return number_format($summe, 2, '.', '');
    }


    function EditTresorerieInfo($TresorerieInfo, $data)
    {
        if (isset($data["Jan"])) $TresorerieInfo?->setJan((float)$data["Jan"]);
        if (isset($data["Frv"])) $TresorerieInfo?->setFrv((float)$data["Frv"]);
        if (isset($data["Mar"])) $TresorerieInfo?->setMar((float)$data["Mar"]);
        if (isset($data["Avr"])) $TresorerieInfo?->setAvr((float)$data["Avr"]);
        if (isset($data["Mai"])) $TresorerieInfo?->setMai((float)$data["Mai"]);
        if (isset($data["Juin"])) $TresorerieInfo?->setJuin((float)$data["Juin"]);
        if (isset($data["Juil"])) $TresorerieInfo?->setJuil((float)$data["Juil"]);
        if (isset($data["Aou"])) $TresorerieInfo?->setAou((float)$data["Aou"]);
        if (isset($data["Sept"])) $TresorerieInfo?->setSept((float)$data["Sept"]);
        if (isset($data["Oct"])) $TresorerieInfo?->setOct((float)$data["Oct"]);
        if (isset($data["Nov"])) $TresorerieInfo?->setNov((float)$data["Nov"]);
        if (isset($data["Dece"])) $TresorerieInfo?->setDece((float)$data["Dece"]);

        $this->entityManager->flush();
        return $TresorerieInfo;
    }

    public function calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements)
    {

        $Jan = 0;
        $Frv = 0;
        $Mar = 0;
        $Avr = 0;
        $Mai = 0;
        $Juin = 0;
        $Juil = 0;
        $Aou = 0;
        $Sept = 0;
        $Oct = 0;
        $Nov = 0;
        $Dece = 0;

        foreach ($EncaisseDecaissements as $EncaisseDecaissement) {
            $Jan += $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getJan();
            $Frv += $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getFrv();
            $Mar +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getMar();
            $Avr += $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getAvr();
            $Mai +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getMai();
            $Juin +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getJuin();
            $Juil +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getJuil();
            $Aou +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getAou();
            $Sept +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getSept();
            $Oct +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getOct();
            $Nov +=  $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getNov();
            $Dece += $EncaisseDecaissement?->getMontheListeEncaisseDecaissement()?->getDece();
        }

        $MonthListeValue = [
            "Jan" => $Jan,
            "Frv" => $Frv,
            "Mar" => $Mar,
            "Avr" => $Avr,
            "Mai" => $Mai,
            "Juin" => $Juin,
            "Juil" => $Juil,
            "Aou" => $Aou,
            "Sept" => $Sept,
            "Oct" => $Oct,
            "Nov" => $Nov,
            "Dece" => $Dece
        ];

        return $MonthListeValue;
    }



    public function ChiffreAffaire($ProjetAnnees, $FinancementEtCharges)
    {
        $ValueListeChiffreAffaire = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaireTresorerie($FinancementEtCharges->getId(), $ProjetAnnees->getId());

        $Jan = 0;
        $Frv = 0;
        $Mar = 0;
        $Avr = 0;
        $Mai = 0;
        $Juin = 0;
        $Juil = 0;
        $Aou = 0;
        $Sept = 0;
        $Oct = 0;
        $Nov = 0;
        $Dece = 0;
        $somme = 0;

        foreach ($ValueListeChiffreAffaire as $item) {
            $Jan += $item["JanPrixHt"] * $item["JanVolumeVente"];
            $Frv +=  $item["FevPrixHt"] * $item["FrvVolumeVente"];
            $Mar +=  $item["MarPrixHt"] * $item["MarVolumeVente"];
            $Avr +=  $item["AvrPrixHt"] * $item["AvrVolumeVente"];
            $Mai +=  $item["MaiPrixHt"] * $item["MaiVolumeVente"];
            $Juin += $item["JuinPrixHt"] * $item["JuinVolumeVente"];
            $Juil += $item["JuilPrixHt"] * $item["JuilVolumeVente"];
            $Aou +=  $item["AouPrixHt"] * $item["AouVolumeVente"];
            $Sept += $item["SeptPrixHt"] * $item["SeptVolumeVente"];
            $Oct +=  $item["OctPrixHt"] * $item["OctVolumeVente"];
            $Nov +=  $item["NovPrixHt"] * $item["NovVolumeVonte"];
            $Dece += $item["DecPrixHt"] * $item["DecVolumeVonte"];
            $somme += $item["Valeur"];
        }
        $MonthListeValue = [
            "Jan" => $Jan,
            "Frv" => $Frv,
            "Mar" => $Mar,
            "Avr" => $Avr,
            "Mai" => $Mai,
            "Juin" => $Juin,
            "Juil" => $Juil,
            "Aou" => $Aou,
            "Sept" => $Sept,
            "Oct" => $Oct,
            "Nov" => $Nov,
            "Dece" => $Dece,
            "Total" => $somme
        ];

        return $MonthListeValue;
    }


    public function ChiffreAffaireSumVente($ProjetAnnees, $FinancementEtCharges)
    {
        $ValueListeChiffreAffaire = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaireTresorerie($FinancementEtCharges->getId(), $ProjetAnnees->getId());

        $somme = 0;

        foreach ($ValueListeChiffreAffaire as $item) {
            $somme +=  $item["JanVolumeVente"];
            $somme +=   $item["FrvVolumeVente"];
            $somme +=   $item["MarVolumeVente"];
            $somme += $item["AvrVolumeVente"];
            $somme += $item["MaiVolumeVente"];
            $somme += $item["JuinVolumeVente"];
            $somme += $item["JuilVolumeVente"];
            $somme +=   $item["AouVolumeVente"];
            $somme += $item["SeptVolumeVente"];
            $somme +=  $item["OctVolumeVente"];
            $somme +=  $item["NovVolumeVonte"];
            $somme +=  $item["DecVolumeVonte"];
        }


        return  number_format($somme, 2, '.', '');
    }


    public function depenseTotal($ProjetAnnees, $FinancementEtCharges)
    {
        $ChargeExt =  $this->doctrine->getRepository(ChargeExt::class)->findBy(["financementEtCharges" => $FinancementEtCharges, "deleted" => 0]);

        $sommeCExt = 0;

        foreach ($ChargeExt as $key => $charge) {
            $MonthChargeExt =  $this->doctrine->getRepository(MonthChargeExt::class)->findOneBy(["chargeExt" => $charge, "projetAnnees" => $ProjetAnnees, "deleted" => 0]);

            $sommeCExt +=  $MonthChargeExt?->getJan();
            $sommeCExt += $MonthChargeExt?->getFrv();
            $sommeCExt += $MonthChargeExt?->getMar();
            $sommeCExt +=  $MonthChargeExt?->getAvr();
            $sommeCExt += $MonthChargeExt?->getMai();
            $sommeCExt +=  $MonthChargeExt?->getJuin();
            $sommeCExt +=  $MonthChargeExt?->getJuil();
            $sommeCExt +=  $MonthChargeExt?->getAou();
            $sommeCExt +=  $MonthChargeExt?->getSept();
            $sommeCExt +=  $MonthChargeExt?->getOct();
            $sommeCExt += $MonthChargeExt?->getNov();
            $sommeCExt += $MonthChargeExt?->getDece();
        }

        return number_format($sommeCExt, 2, '.', '');
    }

    public function tauxTva($ProjetAnnees, $FinancementEtCharges)
    {
        $ValueListeChiffreAffaire = $this->MonthListeChiffreAffaireRepository->findAllMonthListeChiffreAffaireTresorerie($FinancementEtCharges->getId(), $ProjetAnnees->getId());


        $sommeCF = 0;

        foreach ($ValueListeChiffreAffaire as $item) {
            $sommeCF += $item["JanPrixHt"];
            $sommeCF +=  $item["FevPrixHt"];
            $sommeCF +=  $item["MarPrixHt"];
            $sommeCF +=  $item["AvrPrixHt"];
            $sommeCF +=  $item["MaiPrixHt"];
            $sommeCF += $item["JuinPrixHt"];
            $sommeCF += $item["JuilPrixHt"];
            $sommeCF +=  $item["AouPrixHt"];
            $sommeCF += $item["SeptPrixHt"];
            $sommeCF +=  $item["OctPrixHt"];
            $sommeCF +=  $item["NovPrixHt"];
            $sommeCF += $item["DecPrixHt"];
            $sommeCF += $item["Valeur"];
        }
        $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => 4]);
        $TvaSomme = 0;


        if ($TresorerieInfo) {
            $TvaSomme += $TresorerieInfo->getJan();
            $TvaSomme +=  $TresorerieInfo->getFrv();
            $TvaSomme +=  $TresorerieInfo->getMar();
            $TvaSomme +=  $TresorerieInfo->getAvr();
            $TvaSomme +=  $TresorerieInfo->getMai();
            $TvaSomme += $TresorerieInfo->getJuin();
            $TvaSomme += $TresorerieInfo->getJuil();
            $TvaSomme +=  $TresorerieInfo->getAou();
            $TvaSomme += $TresorerieInfo->getSept();
            $TvaSomme +=  $TresorerieInfo->getOct();
            $TvaSomme +=  $TresorerieInfo->getNov();
            $TvaSomme += $TresorerieInfo->getDece();
        }


        if ($TvaSomme == 0 or $sommeCF == 0) {

            return 0;
        }
        return number_format(($TvaSomme / $sommeCF) * 100, 2, '.', '');
    }

    public function sumAchat($ProjetAnnees, $FinancementEtCharges)
    {


        $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => 7]);
        $sommee = 0;

        if ($TresorerieInfo) {
            $sommee += $TresorerieInfo->getJan();
            $sommee +=  $TresorerieInfo->getFrv();
            $sommee +=  $TresorerieInfo->getMar();
            $sommee +=  $TresorerieInfo->getAvr();
            $sommee +=  $TresorerieInfo->getMai();
            $sommee += $TresorerieInfo->getJuin();
            $sommee += $TresorerieInfo->getJuil();
            $sommee +=  $TresorerieInfo->getAou();
            $sommee += $TresorerieInfo->getSept();
            $sommee +=  $TresorerieInfo->getOct();
            $sommee +=  $TresorerieInfo->getNov();
            $sommee += $TresorerieInfo->getDece();
        }


        return number_format($sommee , 2, '.', '');
    }


    public function sumEmprunt($ProjetAnnees, $FinancementEtCharges)
    {


        $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => 17]);
        $sommee = 0;

        if ($TresorerieInfo) {
            $sommee += $TresorerieInfo->getJan();
            $sommee +=  $TresorerieInfo->getFrv();
            $sommee +=  $TresorerieInfo->getMar();
            $sommee +=  $TresorerieInfo->getAvr();
            $sommee +=  $TresorerieInfo->getMai();
            $sommee += $TresorerieInfo->getJuin();
            $sommee += $TresorerieInfo->getJuil();
            $sommee +=  $TresorerieInfo->getAou();
            $sommee += $TresorerieInfo->getSept();
            $sommee +=  $TresorerieInfo->getOct();
            $sommee +=  $TresorerieInfo->getNov();
            $sommee += $TresorerieInfo->getDece();
        }
        return number_format($sommee , 2, '.', '');
    }


    public function calcResultatExercice($ProjetAnnees, $FinancementEtCharges)
    {
        $totalCF = $this->ChiffreAffaireSumVente($ProjetAnnees, $FinancementEtCharges);
        $totalCExt = $this->depenseTotal($ProjetAnnees, $FinancementEtCharges);
        return number_format($totalCF - $totalCExt , 2, '.', '');
    }

   
    public function DotationAmortissements($ProjetAnnee, $FinancementEtCharges)
    {

        $CoutTotalActif = 0;
        $Achats = $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 7);
        $totalAchat = $this->calcTotalArray($Achats);
        $depense = $this->depenseTotal($ProjetAnnee, $FinancementEtCharges);
        $ChiffreAffaire = $this->ChiffreAffaire($ProjetAnnee, $FinancementEtCharges)["Total"];

        $CoutTotalActif =  $totalAchat + $depense;
        if ($CoutTotalActif == 0 or $ChiffreAffaire == 0) {
            return 0;
        }
        $DotationAmortissementsAnnuelle = $ChiffreAffaire / $CoutTotalActif;

        return number_format($DotationAmortissementsAnnuelle , 2, '.', '');
    }

    public function TotalChargesExloitation($ProjetAnnees, $FinancementEtCharges)
    {
        $somme = 0;

        $FraisGenereaux = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 8);
        $somme += $FraisGenereaux = $this->calcTotalArray($FraisGenereaux);

        $SalaireDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 9);
        $somme += $SalaireDirigeant = $this->calcTotalArray($SalaireDirigeant);

        $chargeSocialDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 10);
        $somme += $chargeSocialDirigeant = $this->calcTotalArray($chargeSocialDirigeant);

        $SalaireCollaborateur = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 11);
        $somme += $SalaireCollaborateur = $this->calcTotalArray($SalaireCollaborateur);

        $ChargesSocialesCollaborateurs = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 12);
        $somme += $ChargesSocialesCollaborateurs = $this->calcTotalArray($ChargesSocialesCollaborateurs);

        $tvaPaye = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 13);
        $somme += $tva = $this->calcTotalArray($tvaPaye);

        $IS = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 14);
        $somme += $IS = $this->calcTotalArray($IS);

        $ImpoTax = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $ImpoTax = $this->calcTotalArray($ImpoTax);

        $echance = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);
        $somme += $echance = $this->calcTotalArray($echance);

        $EncaissementsComptesCourantsAssociés = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 16);
        $somme += $EncaissementsComptesCourantsAssociés = $this->calcTotalArray($EncaissementsComptesCourantsAssociés);

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseDecaissements = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);
        $somme += $EncaisseDecaissements = $this->calcTotalArray($EncaisseDecaissements);

        $Variation = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 18);
        $somme += $Variation = $this->calcTotalArray($Variation);

        $Investissements = $this->doctrine->getRepository(Investissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "deleted" => 0]);
        $totalinvest = 0;

        foreach ($Investissements as $Investissement) {
            if ($Investissement?->getInvestissementMontant() != null and $Investissement?->getProjetAnnees() == $ProjetAnnees) {
                $totalinvest += $Investissement->getInvestissementMontant()->getMontant();
            }
        }
        $somme += $totalinvest;

        $chargeSocial  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $somme += $chargeSocial = $this->calcTotalArray($chargeSocial);

        $somme += $ChiffreAaffaires = $this->ChiffreAffaire($ProjetAnnees, $FinancementEtCharges)["Total"];

        $SouscriptionEmprunts = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $somme += $SouscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);

        $c_c_Associe = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 1);
        $somme += $c_c_Associe = $this->calcTotalArray($c_c_Associe);

        $Apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);
        $somme += $Apports = $this->calcTotalArray($Apports);

        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

        return number_format($somme , 2, '.', '');
    }

    public function ResultatFiscal($ProjetAnnees, $FinancementEtCharges, $ResultatExloitation)
    {
        $somme = 0;

        $encaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $encaissement = $this->calcEncaisseDecaissementsDecaissementTotalForManth($encaissement);
        $encaissement = $this->calcTotalArray($encaissement);

        $decaissement =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "decaissement", "deleted" => 0]);
        $decaissement = $this->calcEncaisseDecaissementsDecaissementTotalForManth($decaissement);
        $decaissement = $this->calcTotalArray($decaissement);

        $somme += $encaissement - $decaissement;


        $echance = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);
        $somme += $echance = $this->calcTotalArray($echance);

        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

        $Variation  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 18);
        $somme += $Variation = $this->calcTotalArray($Variation);

        return  number_format($ResultatExloitation - $somme , 2, '.', '');
    }


    public function autresDepenses($ProjetAnnees, $FinancementEtCharges)
    {
        $somme = 0;

        $SalaireDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 9);
        $somme += $SalaireDirigeant = $this->calcTotalArray($SalaireDirigeant);

        $chargeSocialDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 10);
        $somme += $chargeSocialDirigeant = $this->calcTotalArray($chargeSocialDirigeant);

        $SalaireCollaborateur = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 11);
        $somme += $SalaireCollaborateur = $this->calcTotalArray($SalaireCollaborateur);

        $ChargesSocialesCollaborateurs = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 12);
        $somme += $ChargesSocialesCollaborateurs = $this->calcTotalArray($ChargesSocialesCollaborateurs);

        $tvaPaye = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 13);
        $somme += $tva = $this->calcTotalArray($tvaPaye);

        $IS = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 14);
        $somme += $IS = $this->calcTotalArray($IS);

        $ImpoTax = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $ImpoTax = $this->calcTotalArray($ImpoTax);

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseDecaissements = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);
        $somme += $EncaisseDecaissements = $this->calcTotalArray($EncaisseDecaissements);


        $chargeSocial  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $somme += $chargeSocial = $this->calcTotalArray($chargeSocial);

        $somme += $ChiffreAaffaires = $this->ChiffreAffaire($ProjetAnnees, $FinancementEtCharges)["Total"];

        $SouscriptionEmprunts = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $somme += $SouscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);

        $c_c_Associe = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 1);
        $somme += $c_c_Associe = $this->calcTotalArray($c_c_Associe);

        $Apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);
        $somme += $Apports = $this->calcTotalArray($Apports);

        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

        return   number_format($somme, 2, '.', '');
    }
    public function calcTotalArray($listes)
    {
        $somme = 0;
        
        foreach ($listes as $key => $liste) {
            if ($key != "id") {
                $somme += $liste;
            }
        }

        return  number_format($somme, 2, '.', '');
    }


    public function calcTotalResources($ApportCapitalValue ,$ProjetAnnees, $FinancementEtCharges){

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);        
        $totalEncaissement = $this->calcTotalArray($EncaisseMonthValueTotal);

        $SouscriptionEmprunts  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);        
        $souscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);

        $c_c_associe  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 1);        
        $c_c_associe = $this->calcTotalArray($c_c_associe);
        $sommee = $ApportCapitalValue + $totalEncaissement + $souscriptionEmprunts + $c_c_associe ;
        
        return number_format($sommee , 2, '.', '');
    }

    public function calcCapaciteAutofinancement($InvestissementsInitiaux ,$ProjetAnnees, $FinancementEtCharges){

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);        
        $totalEncaissement = $this->calcTotalArray($EncaisseMonthValueTotal);

        return number_format($totalEncaissement-$InvestissementsInitiaux, 2, '.', '');
    }

    public function CalcApportCapital($InvestissementsInitiaux,$ProjetAnnees, $FinancementEtCharges){
     
        
        $apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);        
        $apports = $this->calcTotalArray($apports);
        
        $depense = $this->depenseTotal($ProjetAnnees, $FinancementEtCharges);
        $InvestissementEntreprise = $InvestissementsInitiaux - $depense;

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);
        
        $totalEncaissement = $this->calcTotalArray($EncaisseMonthValueTotal);

        $apportCapital =$apports - $InvestissementEntreprise - $totalEncaissement;
        
        return number_format( $apportCapital, 2, '.', '');
    }
    public function CalcRessources($ProjetAnnees, $FinancementEtCharges){
        $somme = 0;
        
        $apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);        
        $somme += $apports = $this->calcTotalArray($apports);
        
        $ComptesCourantsAssocies = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 1);        
        $ComptesCourantsAssocies += $ComptesCourantsAssocies = $this->calcTotalArray($ComptesCourantsAssocies);
        
        $SouscriptionEmprunts  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);        
        $somme += $SouscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);

        $EncaissementsComptesCourantsAssocies   = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 16);        
        $somme += $EncaissementsComptesCourantsAssocies = $this->calcTotalArray($EncaissementsComptesCourantsAssocies);

        return  number_format($somme, 2, '.', '');
    }
    public function CalcTotaldesbesoins($InvestissementsInitiaux,$RemboursementEmprunts ,$ProjetAnnees, $FinancementEtCharges){

        $somme = $InvestissementsInitiaux + $RemboursementEmprunts;

        $SalaireDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 9);        
        $somme += $SalaireDirigeant = $this->calcTotalArray($SalaireDirigeant);

        $chargeSocialDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 10);
        $somme += $chargeSocialDirigeant = $this->calcTotalArray($chargeSocialDirigeant);

        $SalaireCollaborateur = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 11);
        $somme += $SalaireCollaborateur = $this->calcTotalArray($SalaireCollaborateur);
        
        $ChargesSocialesCollaborateurs = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 12);
        $somme += $ChargesSocialesCollaborateurs = $this->calcTotalArray($ChargesSocialesCollaborateurs);

        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $somme += $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

        $FraisGenereaux = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 8);
        $somme += $FraisGenereaux = $this->calcTotalArray($FraisGenereaux);
       
        return number_format(  $somme, 2, '.', '') ;

    }

    public function calcRemboursementApportsCompteCourantAssocies($ProjetAnnees, $FinancementEtCharges){
        $tauxInteret = 5/100;
        $InteretMensuel = $tauxInteret /12;
        
        $MontantEmprunte = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $totalMontantEmprunte = $this->calcTotalArray($MontantEmprunte);

        $PaiementTotalMensuel  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);
        $totalPaiementTotalMensuel = $this->calcTotalArray($PaiementTotalMensuel);
        

        $SoldeRestantCapital  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 19);
        $totalSoldeRestantCapital = $this->calcTotalArray($SoldeRestantCapital);
        
        $InteretMensuel =$totalSoldeRestantCapital * $InteretMensuel ;

        $RemboursementCapital = $totalPaiementTotalMensuel - $InteretMensuel;
        return number_format(  $RemboursementCapital, 2, '.', '');
    }

    public function RemboursementEmprunts($ProjetAnnees, $FinancementEtCharges){
        $tauxInteret = 5/100;
        $InteretMensuel = $tauxInteret /12;
        
        $MontantEmprunte = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $totalMontantEmprunte = $this->calcTotalArray($MontantEmprunte);

        $PaiementTotalMensuel  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);
        $totalPaiementTotalMensuel = $this->calcTotalArray($PaiementTotalMensuel);
        

        $SoldeRestantCapital  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 19);
        $totalSoldeRestantCapital = $this->calcTotalArray($SoldeRestantCapital);
        
        $InteretMensuel =$totalSoldeRestantCapital * $InteretMensuel ;

        $RemboursementCapital = $totalPaiementTotalMensuel - $InteretMensuel;
        return number_format( $RemboursementCapital, 2, '.', '');
    }

    public function calcVariationBesoinFondsRoulements($ProjetAnnees, $FinancementEtCharges){
        
        $Achats = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 7);
        $totalAchat = $this->calcTotalArray($Achats);

        $Variation = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 18);
        $totalVariation = $this->calcTotalArray($Variation);
        

        $Stocks = $totalAchat - $totalVariation ;

        $SouscriptionEmprunts = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $totalSouscriptionEmprunts = $this->calcTotalArray($SouscriptionEmprunts);
        
        $ChargesSociales = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $totalSChargesSociales = $this->calcTotalArray($ChargesSociales);
        
        $TVA = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 4);
        $totalTVA = $this->calcTotalArray($TVA);

        $investissementTreso = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 6);
        $totalinvestissementTreso = $this->calcTotalArray($investissementTreso);

        $FraisGenereaux = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 8);
        $totalFraisGenereaux = $this->calcTotalArray($FraisGenereaux);
        
        $salaireCollaborateurs  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 11);
        $totalSalaireCollaborateurs = $this->calcTotalArray($salaireCollaborateurs);

        $chargeSocialeDirigeants  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 10);
        $totalchargeSocialeDirigeants = $this->calcTotalArray($chargeSocialeDirigeants);

        $TvaPaye  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 13);
        $totalTvaPaye = $this->calcTotalArray($TvaPaye);

        $IS  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 14);
        $totalIS = $this->calcTotalArray($IS);

        $AutresImpotsTaxes  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $totalAutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

        $CreancesClients = $totalSouscriptionEmprunts - $totalSChargesSociales - $totalTVA 
                            - $totalinvestissementTreso - $totalFraisGenereaux - $totalSalaireCollaborateurs
                             - $totalchargeSocialeDirigeants - $totalTvaPaye - $totalIS  - $totalAutresImpotsTaxes ;

        $detteFournisseurs = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 4);
                              
        return number_format(($Stocks + $CreancesClients) -  $detteFournisseurs["valeur"], 2, '.', '');
    }

    public function calcTreso($ProjetAnnees, $FinancementEtCharges)
    {
        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "decaissement", "deleted" => 0]);
        $DecaissementsMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);

        $totalEncaissement = $this->calcTotalArray($EncaisseMonthValueTotal);
        $totalDecaissement = $this->calcTotalArray($DecaissementsMonthValueTotal);

        $totalEncaissementBrut = $totalEncaissement * 1.2;
        $totalDecaissementBrut = $totalDecaissement * 1.2;

        $tresoNet = $totalEncaissement - $totalDecaissement;
        $tresoBrut = $totalEncaissementBrut - $totalDecaissementBrut;
        $amort = ($tresoBrut - $tresoNet) / 12;
        return ["net" => $tresoNet, "brut" => $tresoBrut, "amort" => $amort];
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


    function checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, $type)
    {

        $TresorerieInfo = $this->doctrine->getRepository(TresorerieInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => $type]);

        if (!$TresorerieInfo) {

            $TresorerieInfo = new TresorerieInfo();
            $TresorerieInfo->setFinancementEtCharges($FinancementEtCharges);
            $TresorerieInfo->setProjetAnnees($ProjetAnnees);
            $TresorerieInfo->setType($type);
            $this->entityManager->persist($TresorerieInfo);
            $this->entityManager->flush();
        }
        $MonthListeValue = [
            "Jan" => $TresorerieInfo?->getJan(),
            "Frv" => $TresorerieInfo?->getFrv(),
            "Mar" => $TresorerieInfo?->getMar(),
            "Avr" => $TresorerieInfo?->getAvr(),
            "Mai" => $TresorerieInfo?->getMai(),
            "Juin" => $TresorerieInfo?->getJuin(),
            "Juil" => $TresorerieInfo?->getJuil(),
            "Aou" => $TresorerieInfo?->getAou(),
            "Sept" => $TresorerieInfo?->getSept(),
            "Oct" => $TresorerieInfo?->getOct(),
            "Nov" => $TresorerieInfo?->getNov(),
            "Dece" => $TresorerieInfo?->getDece(),
            "id" => $TresorerieInfo?->getId()
        ];
        return $MonthListeValue;
    }


    function checkBilanInfo($ProjetAnnees, $FinancementEtCharges, $type)
    {

        $InfoBilan = $this->doctrine->getRepository(InfoBilan::class)->findOneBy(["ProjetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => $type]);

        if (!$InfoBilan) {

            $InfoBilan = new InfoBilan();
            $InfoBilan->setFinancementEtCharges($FinancementEtCharges);
            $InfoBilan->setProjetAnnees($ProjetAnnees);
            $InfoBilan->setType($type);
            $this->entityManager->persist($InfoBilan);
            $this->entityManager->flush();
        }

        $ListeValue = [
            "valeur" => $InfoBilan?->getValeur(),
            "id" => $InfoBilan?->getId()
        ];

        return $ListeValue;
    }

    public function CalcInvestissement( $ProjetAnnees ,$nature){

        $somme = 0;

        $InvestissementNatures = $this->doctrine->getRepository(InvestissementNature::class)->findOneBy(["type"=>$nature]);
        $Investissements = $this->doctrine->getRepository(Investissement::class)->findBy(["projetAnnees"=>$ProjetAnnees,"investissementNature"=>$InvestissementNatures,]);
        
        foreach($Investissements as $Investissement){
            if($Investissement?->getInvestissementMontant()?->getMontant() != null)
            $somme += $Investissement->getInvestissementMontant()->getMontant();
        }
        return number_format($somme, 2, '.', '');

    }

    function checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, $type , $initial = false)
    {
        if($initial == false){
            $PlanFinancementInfo = $this->doctrine->getRepository(PlanFinancementInfo::class)->findOneBy(["projetAnnees" => $ProjetAnnees, "FinancementEtCharges" => $FinancementEtCharges, "type" => $type]);
        }else{
             $PlanFinancementInfo = $this->doctrine->getRepository(PlanFinancementInfo::class)->findOneBy([ "FinancementEtCharges" => $FinancementEtCharges, "type" => $type]);
        }

        if (!$PlanFinancementInfo) {

            $PlanFinancementInfo = new PlanFinancementInfo();
            $PlanFinancementInfo->setFinancementEtCharges($FinancementEtCharges);

            if($initial == false){
                $PlanFinancementInfo->setProjetAnnees($ProjetAnnees);
            }

            $PlanFinancementInfo->setType($type);
            $PlanFinancementInfo->setValue(0);
            $this->entityManager->persist($PlanFinancementInfo);
            $this->entityManager->flush();
        }

        $ListeValue = [
            "valeur" =>  number_format($PlanFinancementInfo?->getValue(), 2, '.', ''),
            "id" => $PlanFinancementInfo?->getId()
        ];

        return $ListeValue;
    }
     
    function editPlanFinancementInfo($id,$value, $FinancementEtCharges)
    {
        $PlanFinancementInfo = $this->doctrine->getRepository(PlanFinancementInfo::class)->findOneBy(["FinancementEtCharges" => $FinancementEtCharges, "id"=>$id]);
      
        $PlanFinancementInfo->setValue($value);         
        $this->entityManager->flush();
    

        $ListeValue = [
            "valeur" =>  number_format($PlanFinancementInfo?->getValue(), 2, '.', ''),
            "id" => $PlanFinancementInfo?->getId()
        ];

        return $ListeValue;
    }



    function EditBilanInfo($InfoBilan, $valeur)
    {
        $InfoBilan->setValeur($valeur);
        $this->entityManager->flush();

        $ListeValue = [
            "valeur" => number_format( $InfoBilan?->getValeur(), 2, '.', ''),
            "id" => $InfoBilan?->getId()
        ];

        return $ListeValue;
    }


    public function compteResultat($Projet){
        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);

        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "FinancementEtCharges" => $FinancementEtCharges], ["annee" => "ASC"]);
        $compteResultat = [];

        $chiifreAffaireListe = [];
        $TotalProduitsExploitationListe = [];
        $MergeBrutExploitationListe = [];
        $FraitGenerauxListe = [];
        $InpotsTaxesListe = [];
        $SalaireNetDirigeantsListe = [];
        $CotisationDocialeDirigeantsListe = [];
        $SalaireBrutCollaborateursListe = [];
        $CotisationsSocialsPatronalListe = [];
        $DotationAmortissementsListe = [];
        $TotalEhargesExloitationListe = [];
        $ResultatExloitationListe = [];
        $ResultatCourantAvantImpotListe = [];
        $resultatExerciceListe = [];

        foreach ($ProjetAnnees as $ProjetAnnee) {

            $ChiffreAffaire = $this->ChiffreAffaire($ProjetAnnee, $FinancementEtCharges)["Total"];
             
            $Encaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnee, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
            $Encaissements = $this->calcEncaisseDecaissementsDecaissementTotalForManth($Encaissements);

            $TotalProduitsExploitation = $Encaissements = $this->calcTotalArray($Encaissements);

            $FraisGenereaux = $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 8);
            $FraisGenereaux = $this->calcTotalArray($FraisGenereaux);

            $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 15);
            $AutresImpotsTaxes = $this->calcTotalArray($AutresImpotsTaxes);

            $dotation = $this->DotationAmortissements($ProjetAnnee, $FinancementEtCharges);

            $SalaireNetDirigeants = $this->vivitoolsService->calcSalaireNetDirigeants($ProjetAnnee->getSalaireEtchargeSocialDirigents());
            $TotalChargesExloitation = $this->TotalChargesExloitation($ProjetAnnee, $FinancementEtCharges);

            $SalaireBrutCollaborateur = $this->vivitoolsService->calcSalaireBrutCollaborateur($ProjetAnnee?->getSalaireEtchargeSocial());
           
            //Resultat courant avant impot

            $Tauxmposition = 0.31;


            $ResultatExloitation = $this->ResultatExloitation($ChiffreAffaire , $TotalChargesExloitation,$ProjetAnnee, $FinancementEtCharges) ; 
            $ResultatFiscal = $this->ResultatFiscal($ProjetAnnee, $FinancementEtCharges, $ResultatExloitation);
            
            $ChargesImpot  = $ResultatFiscal * $Tauxmposition;

            $ResultatCourantAvantImpot = $ResultatExloitation - $ChargesImpot;

            //resultat de l'exercice
            $ChargesTotales = $this->depenseTotal($ProjetAnnee, $FinancementEtCharges);
            $depenseTotal =  $autresDepenses  = $this->autresDepenses($ProjetAnnee, $FinancementEtCharges);
            $resultatExercice = $Encaissements - $ChargesTotales - $depenseTotal;


            
            $chiifreAffaireListe[] = number_format($ChiffreAffaire, 2, '.', '');
            $TotalProduitsExploitationListe[] = number_format($TotalProduitsExploitation, 2, '.', '');
            $MergeBrutExploitationListe[] = number_format($ChiffreAffaire - $ChargesTotales,2,'.','') ;
            $FraitGenerauxListe[] = number_format($FraisGenereaux, 2, '.', '');
            $InpotsTaxesListe[] = number_format($AutresImpotsTaxes, 2, '.', '');
            $SalaireNetDirigeantsListe[] = number_format($SalaireNetDirigeants["Salaire net des dirigeants"], 2, '.', '');
            $CotisationDocialeDirigeantsListe[] = number_format($SalaireNetDirigeants["Cotisation sociale des dirigeants"], 2, '.', '');
            
            $SalaireBrutCollaborateursListe[] = number_format($SalaireBrutCollaborateur, 2, '.', '');
            
            $CotisationsSocialsPatronalListe[] = number_format($SalaireNetDirigeants["CotisationsSocialsPatronal"], 2, '.', '');
            $DotationAmortissementsListe[] = number_format($dotation, 2, '.', '');
            $TotalEhargesExloitationListe[] = number_format($TotalChargesExloitation, 2, '.', '');
            $ResultatExloitationListe[] = number_format($ResultatExloitation, 2, '.', '');
            $ResultatCourantAvantImpotListe[] = number_format($ResultatCourantAvantImpot, 2, '.', '');
            $resultatExerciceListe[] = number_format($resultatExercice, 2, '.', '');
        }

        $compteResultat = [
            "Chiffre d'affaires" => $chiifreAffaireListe,
            "Total des produits d'exploitation" => $TotalProduitsExploitationListe,
            "Marge brut d'exploitation" => $MergeBrutExploitationListe,
            "Frais généraux" => $FraitGenerauxListe,
            "Impôts et taxes" => $InpotsTaxesListe,
            "Salaires nets des dirigeants" =>  $SalaireNetDirigeantsListe,
            "Cotisations sociales des dirigeants" => $CotisationDocialeDirigeantsListe,
            "Salaires bruts des collaborateurs" => $SalaireBrutCollaborateursListe,
            "Cotisations sociales patronales" => $CotisationsSocialsPatronalListe,
            "Dotation aux amortissements" => $DotationAmortissementsListe,
            "Total des charges d'exploitation" => $TotalEhargesExloitationListe,
            "Résultat d'exploitation" => $ResultatExloitationListe,
            "Résultat courant avant impôts" => $ResultatCourantAvantImpotListe,
            "Résultat de l'exercice" => $resultatExerciceListe
        ];
        return $compteResultat;
    }

    public function PlanFinancement($Projet){

        $BusinessPlan = $Projet->getBusinessPlan();

        $FinancementEtCharges = $this->checkFinancementEtCharges($Projet, $BusinessPlan);
        $PlanFinancement = [];
        $ProjetAnnees = $this->doctrine->getRepository(ProjetAnnees::class)->findBy(["projet" => $Projet, "FinancementEtCharges" => $FinancementEtCharges], ["annee" => "ASC"]);
    
        if(count($ProjetAnnees) == 0){
            return [];
        }

        $initialBesoin = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 0, true);

        $InvestisementIncorporels = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 1, true);
        $InvestisementCorporels = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 2, true);
        $InvestisementFinanciers = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 3, true);
        

        $RemboursementEmprunts = [];

        $besoinListe[] =[
            "id"=>$initialBesoin["id"],
            "valeur"=> number_format($initialBesoin["valeur"], 2, '.', '')
        ] ;
        $InvestisementIncorporelsListe[] =[
            "id"=>$InvestisementIncorporels["id"],
            "valeur"=> number_format($InvestisementIncorporels["valeur"], 2, '.', '')
        ] ;
        $InvestisementCorporelsListe[] =[
            "id"=>$InvestisementCorporels["id"],
            "valeur"=> number_format($InvestisementCorporels["valeur"], 2, '.', '')
        ] ;
        $InvestisementFinanciersListe[] =[
            "id"=>$InvestisementFinanciers["id"],
            "valeur"=> number_format($InvestisementFinanciers["valeur"], 2, '.', '')
        ];

        $VariationBesoinFondsRoulements[] =  $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 4, true);
        $RemboursementApportsCompteCourantAssocies[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 5, true);
       
        $Totaldesbesoins[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 6, true);
        $Ressources[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 7, true);
        $RemboursementEmprunts[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 8, true);

        $ApportCapital[] =$this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 9, true);
        $ApportCompteCourantAssocies[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 10, true);
       
        $souscriptionEmpruntsListe[]= $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 11, true);

        $capaciteAutofinancement[]=$this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 12, true);

        $TotalResources[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 13, true);
        $VariationListe[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 14, true);
        $SoldeListe[] = $this->checkPlanFinancementInfo($ProjetAnnees, $FinancementEtCharges, 15, true);

        foreach($ProjetAnnees as $ProjetAnnee){
        
           $Besoin = $this->checkPlanFinancementInfo($ProjetAnnee, $FinancementEtCharges, 0, false);
           $besoinListe[] = [
                "id"=>$Besoin["id"],
                "valeur"=>number_format($Besoin["valeur"], 2, '.', '')
           ];
           
           $InvestisementIncorporels = $this->CalcInvestissement( $ProjetAnnee ,0);
           $InvestisementCorporels =  $this->CalcInvestissement( $ProjetAnnee ,1);
           $InvestisementFinanciers =  $this->CalcInvestissement( $ProjetAnnee ,2);
           
           $InvestisementIncorporelsListe[] = number_format( $InvestisementIncorporels, 2, '.', '');
           $InvestisementCorporelsListe[] = number_format( $InvestisementCorporels, 2, '.', '') ;
           $InvestisementFinanciersListe[] = number_format( $InvestisementFinanciers, 2, '.', '');

           $VariationBesoinFondsRoulements[] = $this->calcVariationBesoinFondsRoulements($ProjetAnnee, $FinancementEtCharges);

           $RemboursementEmpruntsValue =  $this->RemboursementEmprunts($ProjetAnnee, $FinancementEtCharges);
           $RemboursementEmprunts[] =$RemboursementEmpruntsValue ;

           $RemboursementApportsCompteCourantAssocies[] =$this->calcRemboursementApportsCompteCourantAssocies($ProjetAnnee, $FinancementEtCharges);
           $InvestissementsInitiaux = $InvestisementIncorporels+$InvestisementCorporels+$InvestisementFinanciers;
           $Totaldesbesoins[] = $this->CalcTotaldesbesoins($InvestissementsInitiaux ,$RemboursementEmpruntsValue ,$ProjetAnnee, $FinancementEtCharges);
           $Ressources[] = $this->CalcRessources($ProjetAnnee, $FinancementEtCharges);
           $ApportCapital[] = $ApportCapitalValue = $this->CalcApportCapital($InvestissementsInitiaux,$ProjetAnnee, $FinancementEtCharges);
           $ApportCompteCourantAssocies[] = 0;

           $SouscriptionEmprunts  = $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 2);        
           $souscriptionEmpruntsListe[] = $this->calcTotalArray($SouscriptionEmprunts);
           $capaciteAutofinancement[]=$this->calcCapaciteAutofinancement($InvestissementsInitiaux,$ProjetAnnee, $FinancementEtCharges);

           $TotalResources[] = $this->calcTotalResources($ApportCapitalValue ,$ProjetAnnee, $FinancementEtCharges);

           $Variation = $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 18);        
           $VariationListe[] = $this->calcTotalArray($Variation); 

           $Solde= $this->checkTresorerieInfo($ProjetAnnee, $FinancementEtCharges, 18);        
           $SoldeListe[] = $this->calcTotalArray($Solde); 
        }

        $PlanFinancement = [
            "BESOIN"=>$besoinListe,
            "Investissements incorporels"=>$InvestisementIncorporelsListe,
            "Investissements corporels"=>$InvestisementCorporelsListe,
            "Investissements financiers"=>$InvestisementFinanciersListe,
            "Variation du besoin en fonds de roulement"=>$VariationBesoinFondsRoulements,
            "Remboursements d'emprunts" => $RemboursementEmprunts,
            "Remboursements d'apports en compte courant d'associés" => $RemboursementApportsCompteCourantAssocies,
            "Total des besoins"=>$Totaldesbesoins,
            "RESSOURCES"=>$Ressources,
            "Apports en capital"=>$ApportCapital,
            "Apports en compte courant d'associés"=>$ApportCompteCourantAssocies,
            "souscriptions d'emprunts"=>$souscriptionEmpruntsListe,
            "capacité d'autofinancement"=>$capaciteAutofinancement,
            "Total des ressources"=>$TotalResources,
            "Variation des trésorerie"=>$VariationListe,
            "Solde de trésorerie"=>$SoldeListe,
        ];
        return $PlanFinancement;
    }


    public function getBilan($ProjetAnnees,$FinancementEtCharges){
        $investissementListe = [];
        
        $InvestissementNatures = $this->doctrine->getRepository(InvestissementNature::class)->findAll();
        foreach ($InvestissementNatures as $InvestissementNature) {
            $investissementListe[str_replace(' ', '', $InvestissementNature->getName())] = [
                "net" =>  0,
                "brut" => 0,
                "amort" =>  0
            ];

        }
        
        $sommeNet = 0;
        $sommeBrut = 0;
        $sommeAmort = 0;
        foreach ($InvestissementNatures as $InvestissementNature) {

            $netInvest = 0;
            $dureeInvist = 0;
            $brutInvest = 0;
            $CapitalSocial = 0;
            
            foreach ($InvestissementNature->getInvestissement() as $Investissement) {
                if ($Investissement?->getInvestissementMontant() != null and $Investissement?->getProjetAnnees() == $ProjetAnnees) {
                    $netInvest += $Investissement->getInvestissementMontant()->getMontant();
                    $dureeInvist += $Investissement->getDuree();
                    $CapitalSocial += $netInvest;
                }
            }

            $brutInvest = $netInvest * 1.2;
            if (($brutInvest - $netInvest) != 0) {
                $amortInvest = ($brutInvest - $netInvest) / $dureeInvist;
            } else {
                $amortInvest = 0;
            }
            $investissementListe[str_replace(' ', '', $InvestissementNature->getName())] = [
                "net" =>  number_format($netInvest, 2, '.', ''),
                "brut" => number_format($brutInvest, 2, '.', ''),
                "amort" =>  number_format($amortInvest, 2, '.', '')
            ];

            $sommeNet += $netInvest;
            $sommeBrut += $brutInvest;
            $sommeAmort += $amortInvest;
        }
        
        $treso = $this->calcTreso($ProjetAnnees, $FinancementEtCharges);

        $ActivcirculantNet = $treso["net"] - $sommeNet;
        $ActivcirculantBrut = $treso["brut"] - $sommeBrut;
        $ActivcirculantAmort = $treso["amort"] - $sommeAmort;

        //Creance Fiscale

        $tauxTva =  $this->tauxTva($ProjetAnnees, $FinancementEtCharges);

        $TVACollectee = ($this->ChiffreAffaire($ProjetAnnees, $FinancementEtCharges)["Total"] * $tauxTva) / 100;


        $achat = $this->sumAchat($ProjetAnnees, $FinancementEtCharges);
        $tvaDeductible = ($achat * $tauxTva) / 100;

        $CreanceFiscale = $TVACollectee - $tvaDeductible;


        //Creance sociales

        $CreanceSociales  = $ActivcirculantBrut - $CreanceFiscale;

        $TotalActif = $sommeNet - $ActivcirculantNet;
        $stock = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 0);
        $client = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 1);

        $TotalActifCercul = $ActivcirculantNet + $stock["valeur"] + $client["valeur"] + $CreanceFiscale + $CreanceSociales + $treso["net"];
        $actif = [

            "ActifImmobilise" => [
                "net" => number_format($sommeNet, 2, '.', '') ,
                "brut" => number_format($sommeBrut, 2, '.', ''),
                "amort" => number_format($sommeAmort, 2, '.', ''),
            ],

            "investissementListe" => $investissementListe,

            //Toltal des investisements => Actif immobilise

            "ToltalInvestisements" => [
                "net" => number_format($sommeBrut - $sommeAmort, 2, '.', ''),
                "brut" => number_format($sommeBrut, 2, '.', ''),
                "amort" =>number_format($sommeAmort, 2, '.', ''),
            ],

            "ActivCirculant" => [
                "net" => number_format($ActivcirculantNet, 2, '.', ''),
                "brut" => number_format($ActivcirculantBrut, 2, '.', ''),
                "amort" => number_format($ActivcirculantAmort, 2, '.', ''),
            ],

            "stoks" => [
                "id" => $stock["id"],
                "value" => number_format($stock["valeur"], 2, '.', '')
            ],

            "clients" => [
                "id" => $client["id"],
                "value" => number_format($client["valeur"], 2, '.', '')
            ],

            "CreanceFiscale" => number_format($CreanceFiscale, 2, '.', '') ,

            "CreanceAociales" => number_format( $CreanceSociales, 2, '.', ''),

            "Treoseries" => [
                "net" => number_format($treso["net"], 2, '.', ''),
                "brut" => number_format($treso["brut"], 2, '.', ''),
                "amort" =>number_format($treso["amort"], 2, '.', '') ,
            ],
            "TotalActifCercul" => number_format($TotalActifCercul, 2, '.', ''),
            "TotalActif" =>number_format( $TotalActif, 2, '.', '')
        ];


        //passif
        $TotalCapiteauxPropres = 0;

        $CapiteauPropres = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 7);

        $TotalCapiteauxPropres += $CapiteauPropres["valeur"];

        $Capitale = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $TotalCapiteauxPropres += $Capitale["valeur"];

        $TotalCapiteauxPropres += $resultatExercice = $this->calcResultatExercice($ProjetAnnees, $FinancementEtCharges);

        $RéserveReportNouveau = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $TotalCapiteauxPropres += $RéserveReportNouveau["valeur"];

        $TotalDettes = 0;

        $DETTES =   $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 8);
        $TotalDettes += $DETTES["valeur"];

        $TotalDettes += $TotalEmprunt = $this->sumEmprunt($ProjetAnnees, $FinancementEtCharges);

        $TotalDettes += $c_c_associeSum = $this->c_c_associeSum($ProjetAnnees, $FinancementEtCharges);

        $fournisseurs = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 4);
        $TotalDettes += $fournisseurs["valeur"];

        $DettesFiscales = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 5);
        $TotalDettes += $DettesFiscales["valeur"];

        $DetteSociales = $this->checkBilanInfo($ProjetAnnees, $FinancementEtCharges, 6);
        $TotalDettes += $DetteSociales["valeur"];

        $passif = [
            "CapiteauPropres" => [
                "id" => $CapiteauPropres["id"],
                "valeur" => number_format( $CapiteauPropres["valeur"], 2, '.', '')
            ],

            "Capitale" => [
                "id" => $Capitale["id"],
                "valeur" => number_format( $Capitale["valeur"], 2, '.', '')
            ],

            "ReserveReportNouveau" => [
                "id" => $RéserveReportNouveau["id"],
                "valeur" => number_format(  $RéserveReportNouveau["valeur"], 2, '.', '')
            ],
            "ResultatExercice" => number_format(  $resultatExercice, 2, '.', ''),
            "TotalCapiteauxPropres" =>  number_format(  $TotalCapiteauxPropres, 2, '.', ''),

            "DETTES" => [
                "id" => $DETTES["id"],
                "valeur" => $DETTES["valeur"]
            ],

            "Emprunts" => number_format(  $TotalEmprunt, 2, '.', ''),
            "compteCaurentAssociés" => number_format($c_c_associeSum, 2, '.', ''),
            "fournisseurs" => [
                "id" => $fournisseurs["id"],
                "valeur" => number_format($fournisseurs["valeur"], 2, '.', '')
            ],

            "Dettesfiscales" => [
                "id" => $DettesFiscales["id"],
                "valeur" =>  number_format($DettesFiscales["valeur"], 2, '.', '')
            ],

            "Dettesociales" => [
                "id" => $DetteSociales["id"],
                "valeur" =>number_format($DetteSociales["valeur"], 2, '.', '') 
            ],

            "Totaldettes" =>number_format( $TotalDettes, 2, '.', '') ,
            "TOTALPASSIF" =>number_format(  ($TotalDettes + $TotalCapiteauxPropres), 2, '.', '') 
        ];
        return ['actif'=>$actif,'passif'=>$passif];
    }

    public function getTresorerie($ProjetAnnees, $FinancementEtCharges){
        $ValueListeChiffreAffaireListe = $this->ChiffreAffaire($ProjetAnnees, $FinancementEtCharges);

        $apports = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 0);
        $c_c_associe = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 1);
        $emprunts = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 2);
        $charges_sociales = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 3);
        $TVA = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 4);
        $Autre = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 5);

        //Encaissement partie

        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "encaissement", "deleted" => 0]);
        $EncaisseMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);

        $investissement = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 6);
        $Achats = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 7);
        $FraisGenereaux = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 8);
        $salaireDirigeant = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 9);
        $chargeSocialeDirigeants = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 10);
        $salaireCollaborateurs = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 11);
        $charegeSocialesCollaborateurs  = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 12);
        $TvaPayer = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 13);
        $IS = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 14);
        $AutresImpotsTaxes = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 15);
        $c_c_associeEncaissement = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 16);
        $EcheanceEmprunt = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 17);

        //Decaissement
        $EncaisseDecaissements =  $this->doctrine->getRepository(EncaisseDecaissement::class)->findBy(["projetAnnees" => $ProjetAnnees, "financementEtCharges" => $FinancementEtCharges, "type" => "decaissement", "deleted" => 0]);
        $DecaissementsMonthValueTotal = $this->calcEncaisseDecaissementsDecaissementTotalForManth($EncaisseDecaissements);


        $Variation = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 18);
        $Solde = $this->checkTresorerieInfo($ProjetAnnees, $FinancementEtCharges, 19);


        return  [
            "Chiffre d'ffaires" => $ValueListeChiffreAffaireListe,
            "Apports" => $apports,
            "C/C d'associé" => $c_c_associe,
            "Souscription d'emprunts" => $emprunts,
            "Charges sociales" => $charges_sociales,
            "TVA" => $TVA,
            "Autres" => $Autre,
            "Encaissements" => $EncaisseMonthValueTotal,
            "Investissements" => $investissement,
            "Achats" => $Achats,
            "Frais généraux " => $FraisGenereaux,
            "Salaires dirigeants " => $salaireDirigeant,
            "Charges sociales dirigeants" => $chargeSocialeDirigeants,
            "Salaires du collaborateurs" => $salaireCollaborateurs,
            "Chareges sociales collaborateurs" => $charegeSocialesCollaborateurs,
            "TVA à Payer" => $TvaPayer,
            "IS" => $IS,
            "Autres impôts et taxes" => $AutresImpotsTaxes,
            "C/C d'associé (Encaissement)" => $c_c_associeEncaissement,
            "Echéances d'emprunt" => $EcheanceEmprunt,
            "Décaissements" => $DecaissementsMonthValueTotal,
            "Variation" => $Variation,
            "Solde" => $Solde,

        ];
    }

}