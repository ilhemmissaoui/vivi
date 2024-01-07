<?php

namespace App\Entity;

use App\Repository\MonthListeChiffreAffaireRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MonthListeChiffreAffaireRepository::class)]
class MonthListeChiffreAffaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column]
    private ?float $Valeur = 0;
    #[ORM\Column]
    private ?float $JanPrixHt = 0;

    #[ORM\Column]
    private ?float $JanVolumeVente = 0;

    #[ORM\Column]
    private ?float $FevPrixHt = 0;

    #[ORM\Column]
    private ?float $FrvVolumeVente = 0;

    #[ORM\Column]
    private ?float $MarPrixHt = 0;

    #[ORM\Column]
    private ?float $MarVolumeVente = 0;

    #[ORM\Column]
    private ?float $AvrPrixHt = 0;

    #[ORM\Column]
    private ?float $AvrVolumeVente = 0;

    #[ORM\Column]
    private ?float $MaiPrixHt = 0;

    #[ORM\Column]
    private ?float $MaiVolumeVente = 0;

    #[ORM\Column]
    private ?float $JuinPrixHt = 0;

    #[ORM\Column]
    private ?float $JuinVolumeVente = 0;

    #[ORM\Column]
    private ?float $JuilPrixHt = 0;

    #[ORM\Column]
    private ?float $JuilVolumeVente = 0;

    #[ORM\Column]
    private ?float $AouPrixHt = 0;

    #[ORM\Column]
    private ?float $AouVolumeVente = 0;

    #[ORM\Column]
    private ?float $SeptPrixHt = 0;

    #[ORM\Column]
    private ?float $SeptVolumeVente = 0;

    #[ORM\Column]
    private ?float $OctPrixHt = 0;

    #[ORM\Column]
    private ?float $OctVolumeVente = 0;

    #[ORM\Column]
    private ?float $NovPrixHt = 0;

    #[ORM\Column]
    private ?float $NovVolumeVonte = 0;

    #[ORM\Column]
    private ?float $DecPrixHt = 0;

    #[ORM\Column]
    private ?float $DecVolumeVonte = 0;


    #[ORM\ManyToOne(inversedBy: 'MonthListeChiffreAffaire')]
    private ?MontantCF $montantCF = null;

    #[ORM\ManyToOne(inversedBy: 'MonthListeChiffreAffaire')]
    private ?ChiffreAffaireActivite $chiffreAffaireActivite = null;

    #[ORM\ManyToOne(inversedBy: 'MonthListeChiffreAffaire')]
    private ?ProjetAnnees $projetAnnees = null;

    #[ORM\Column]
    private ?bool $deleted = false;

    #[ORM\ManyToOne]
    private ?FinancementChiffreAffaire $FinancementChiffreAffaire = null;

    public function getId(): ?int
    {
        return $this->id;
    }



    public function getJanPrixHt(): ?float
    {
        return $this->JanPrixHt;
    }

    public function setJanPrixHt(float $JanPrixHt): self
    {
        $this->JanPrixHt = $JanPrixHt;

        return $this;
    }

    public function getJanVolumeVente(): ?float
    {
        return $this->JanVolumeVente;
    }

    public function setJanVolumeVente(float $JanVolumeVente): self
    {
        $this->JanVolumeVente = $JanVolumeVente;

        return $this;
    }

    public function getFevPrixHt(): ?float
    {
        return $this->FevPrixHt;
    }

    public function setFevPrixHt(float $FevPrixHt): self
    {
        $this->FevPrixHt = $FevPrixHt;

        return $this;
    }

    public function getFrvVolumeVente(): ?float
    {
        return $this->FrvVolumeVente;
    }

    public function setFrvVolumeVente(float $FrvVolumeVente): self
    {
        $this->FrvVolumeVente = $FrvVolumeVente;

        return $this;
    }

    public function getMarPrixHt(): ?float
    {
        return $this->MarPrixHt;
    }

    public function setMarPrixHt(float $MarPrixHt): self
    {
        $this->MarPrixHt = $MarPrixHt;

        return $this;
    }

    public function getMarVolumeVente(): ?float
    {
        return $this->MarVolumeVente;
    }

    public function setMarVolumeVente(float $MarVolumeVente): self
    {
        $this->MarVolumeVente = $MarVolumeVente;

        return $this;
    }

    public function getAvrPrixHt(): ?float
    {
        return $this->AvrPrixHt;
    }

    public function setAvrPrixHt(float $AvrPrixHt): self
    {
        $this->AvrPrixHt = $AvrPrixHt;

        return $this;
    }

    public function getAvrVolumeVente(): ?float
    {
        return $this->AvrVolumeVente;
    }

    public function setAvrVolumeVente(float $AvrVolumeVente): self
    {
        $this->AvrVolumeVente = $AvrVolumeVente;

        return $this;
    }

    public function getMaiPrixHt(): ?float
    {
        return $this->MaiPrixHt;
    }

    public function setMaiPrixHt(float $MaiPrixHt): self
    {
        $this->MaiPrixHt = $MaiPrixHt;

        return $this;
    }

    public function getMaiVolumeVente(): ?float
    {
        return $this->MaiVolumeVente;
    }

    public function setMaiVolumeVente(float $MaiVolumeVente): self
    {
        $this->MaiVolumeVente = $MaiVolumeVente;

        return $this;
    }

    public function getJuinPrixHt(): ?float
    {
        return $this->JuinPrixHt;
    }

    public function setJuinPrixHt(float $JuinPrixHt): self
    {
        $this->JuinPrixHt = $JuinPrixHt;

        return $this;
    }

    public function getJuinVolumeVente(): ?float
    {
        return $this->JuinVolumeVente;
    }

    public function setJuinVolumeVente(float $JuinVolumeVente): self
    {
        $this->JuinVolumeVente = $JuinVolumeVente;

        return $this;
    }

    public function getJuilPrixHt(): ?float
    {
        return $this->JuilPrixHt;
    }

    public function setJuilPrixHt(float $JuilPrixHt): self
    {
        $this->JuilPrixHt = $JuilPrixHt;

        return $this;
    }

    public function getJuilVolumeVente(): ?float
    {
        return $this->JuilVolumeVente;
    }

    public function setJuilVolumeVente(float $JuilVolumeVente): self
    {
        $this->JuilVolumeVente = $JuilVolumeVente;

        return $this;
    }

    public function getAouPrixHt(): ?float
    {
        return $this->AouPrixHt;
    }

    public function setAouPrixHt(float $AouPrixHt): self
    {
        $this->AouPrixHt = $AouPrixHt;

        return $this;
    }

    public function getAouVolumeVente(): ?float
    {
        return $this->AouVolumeVente;
    }

    public function setAouVolumeVente(float $AouVolumeVente): self
    {
        $this->AouVolumeVente = $AouVolumeVente;

        return $this;
    }

    public function getSeptPrixHt(): ?float
    {
        return $this->SeptPrixHt;
    }

    public function setSeptPrixHt(float $SeptPrixHt): self
    {
        $this->SeptPrixHt = $SeptPrixHt;

        return $this;
    }

    public function getSeptVolumeVente(): ?float
    {
        return $this->SeptVolumeVente;
    }

    public function setSeptVolumeVente(float $SeptVolumeVente): self
    {
        $this->SeptVolumeVente = $SeptVolumeVente;

        return $this;
    }

    public function getOctPrixHt(): ?float
    {
        return $this->OctPrixHt;
    }

    public function setOctPrixHt(float $OctPrixHt): self
    {
        $this->OctPrixHt = $OctPrixHt;

        return $this;
    }

    public function getOctVolumeVente(): ?float
    {
        return $this->OctVolumeVente;
    }

    public function setOctVolumeVente(float $OctVolumeVente): self
    {
        $this->OctVolumeVente = $OctVolumeVente;

        return $this;
    }

    public function getNovPrixHt(): ?float
    {
        return $this->NovPrixHt;
    }

    public function setNovPrixHt(float $NovPrixHt): self
    {
        $this->NovPrixHt = $NovPrixHt;

        return $this;
    }

    public function getNovVolumeVonte(): ?float
    {
        return $this->NovVolumeVonte;
    }

    public function setNovVolumeVonte(float $NovVolumeVonte): self
    {
        $this->NovVolumeVonte = $NovVolumeVonte;

        return $this;
    }

    public function getDecPrixHt(): ?float
    {
        return $this->DecPrixHt;
    }

    public function setDecPrixHt(float $DecPrixHt): self
    {
        $this->DecPrixHt = $DecPrixHt;

        return $this;
    }

    public function getDecVolumeVonte(): ?float
    {
        return $this->DecVolumeVonte;
    }

    public function setDecVolumeVonte(float $DecVolumeVonte): self
    {
        $this->DecVolumeVonte = $DecVolumeVonte;

        return $this;
    }

    public function getMontantCF(): ?MontantCF
    {
        return $this->montantCF;
    }

    public function setMontantCF(?MontantCF $montantCF): self
    {
        $this->montantCF = $montantCF;

        return $this;
    }

    public function getValeur(): ?float
    {
        return $this->Valeur;
    }

    public function setValeur(float $Valeur): self
    {
        $this->Valeur = $Valeur;

        return $this;
    }

    public function getChiffreAffaireActivite(): ?ChiffreAffaireActivite
    {
        return $this->chiffreAffaireActivite;
    }

    public function setChiffreAffaireActivite(?ChiffreAffaireActivite $chiffreAffaireActivite): self
    {
        $this->chiffreAffaireActivite = $chiffreAffaireActivite;

        return $this;
    }

    public function getProjetAnnees(): ?ProjetAnnees
    {
        return $this->projetAnnees;
    }

    public function setProjetAnnees(?ProjetAnnees $projetAnnees): static
    {
        $this->projetAnnees = $projetAnnees;

        return $this;
    }

    public function isDeleted(): ?bool
    {
        return $this->deleted;
    }

    public function setDeleted(bool $deleted): static
    {
        $this->deleted = $deleted;

        return $this;
    }

    public function getFinancementChiffreAffaire(): ?FinancementChiffreAffaire
    {
        return $this->FinancementChiffreAffaire;
    }

    public function setFinancementChiffreAffaire(?FinancementChiffreAffaire $FinancementChiffreAffaire): static
    {
        $this->FinancementChiffreAffaire = $FinancementChiffreAffaire;

        return $this;
    }
}
