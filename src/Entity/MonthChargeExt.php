<?php

namespace App\Entity;

use App\Repository\MonthChargeExtRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MonthChargeExtRepository::class)]
class MonthChargeExt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?float $Jan = null;

    #[ORM\Column]
    private ?float $Frv = null;

    #[ORM\Column]
    private ?float $Mar = null;

    #[ORM\Column]
    private ?float $Avr = null;

    #[ORM\Column]
    private ?float $Mai = null;

    #[ORM\Column]
    private ?float $Juin = null;

    #[ORM\Column]
    private ?float $Juil = null;

    #[ORM\Column]
    private ?float $Aou = null;

    #[ORM\Column]
    private ?float $Sept = null;

    #[ORM\Column]
    private ?float $Oct = null;

    #[ORM\Column]
    private ?float $Nov = null;

    #[ORM\Column]
    private ?float $Dece = null;

    #[ORM\Column]
    private ?float $volume = null;

    #[ORM\ManyToOne(inversedBy: 'MonthChargeExt')]
    private ?ChargeExt $chargeExt = null;

    #[ORM\ManyToOne(inversedBy: 'MonthChargeExt')]
    private ?MontantCExt $montantCExt = null;

    #[ORM\ManyToOne(inversedBy: 'MonthChargeExt')]
    private ?ProjetAnnees $projetAnnees = null;

    #[ORM\Column]
    private ?bool $deleted = false;

    #[ORM\ManyToOne(inversedBy: 'monthChargeExts')]
    private ?FinancementDepense $FinancementDepense = null;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJan(): ?float
    {
        return $this->Jan;
    }

    public function setJan(float $Jan): self
    {
        $this->Jan = $Jan;

        return $this;
    }

    public function getFrv(): ?float
    {
        return $this->Frv;
    }

    public function setFrv(float $Frv): self
    {
        $this->Frv = $Frv;

        return $this;
    }

    public function getMar(): ?float
    {
        return $this->Mar;
    }

    public function setMar(float $Mar): self
    {
        $this->Mar = $Mar;

        return $this;
    }

    public function getAvr(): ?float
    {
        return $this->Avr;
    }

    public function setAvr(float $Avr): self
    {
        $this->Avr = $Avr;

        return $this;
    }

    public function getMai(): ?float
    {
        return $this->Mai;
    }

    public function setMai(float $Mai): self
    {
        $this->Mai = $Mai;

        return $this;
    }

    public function getJuin(): ?float
    {
        return $this->Juin;
    }

    public function setJuin(float $Juin): self
    {
        $this->Juin = $Juin;

        return $this;
    }

    public function getJuil(): ?float
    {
        return $this->Juil;
    }

    public function setJuil(float $Juil): self
    {
        $this->Juil = $Juil;

        return $this;
    }

    public function getAou(): ?float
    {
        return $this->Aou;
    }

    public function setAou(float $Aou): self
    {
        $this->Aou = $Aou;

        return $this;
    }

    public function getSept(): ?float
    {
        return $this->Sept;
    }

    public function setSept(float $Sept): self
    {
        $this->Sept = $Sept;

        return $this;
    }

    public function getOct(): ?float
    {
        return $this->Oct;
    }

    public function setOct(float $Oct): self
    {
        $this->Oct = $Oct;

        return $this;
    }

    public function getNov(): ?float
    {
        return $this->Nov;
    }

    public function setNov(float $Nov): self
    {
        $this->Nov = $Nov;

        return $this;
    }

    public function getDece(): ?float
    {
        return $this->Dece;
    }

    public function setDece(float $Dece): self
    {
        $this->Dece = $Dece;

        return $this;
    }

    public function getVolume(): ?float
    {
        return $this->volume;
    }

    public function setVolume(float $volume): self
    {
        $this->volume = $volume;

        return $this;
    }

    public function getChargeExt(): ?ChargeExt
    {
        return $this->chargeExt;
    }

    public function setChargeExt(?ChargeExt $chargeExt): self
    {
        $this->chargeExt = $chargeExt;

        return $this;
    }

    public function getMontantCExt(): ?MontantCExt
    {
        return $this->montantCExt;
    }

    public function setMontantCExt(?MontantCExt $montantCExt): self
    {
        $this->montantCExt = $montantCExt;

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

    public function getFinancementDepense(): ?FinancementDepense
    {
        return $this->FinancementDepense;
    }

    public function setFinancementDepense(?FinancementDepense $FinancementDepense): static
    {
        $this->FinancementDepense = $FinancementDepense;

        return $this;
    }
}
