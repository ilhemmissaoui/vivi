<?php

namespace App\Entity;

use App\Repository\HistoireEtEquipeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HistoireEtEquipeRepository::class)]
class HistoireEtEquipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $partenaire = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $secteur = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $tendance = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cible = null;

    #[ORM\OneToOne(mappedBy: 'histoireEtEquipe', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $presentationSociete = null;

    #[ORM\Column(nullable: true)]
    private ?int $avancement = 0;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPartenaire(): ?string
    {
        return $this->partenaire;
    }

    public function setPartenaire(?string $Partenaire): self
    {
        $this->partenaire = $Partenaire;

        return $this;
    }

    public function getSecteur(): ?string
    {
        return $this->secteur;
    }

    public function setSecteur(?string $secteur): self
    {
        $this->secteur = $secteur;

        return $this;
    }

    public function getTendance(): ?string
    {
        return $this->tendance;
    }

    public function setTendance(?string $tendance): self
    {
        $this->tendance = $tendance;

        return $this;
    }

    public function getCible(): ?string
    {
        return $this->cible;
    }

    public function setCible(?string $cible): self
    {
        $this->cible = $cible;

        return $this;
    }

   

    public function getBusinessPlan(): ?BusinessPlan
    {
        return $this->businessPlan;
    }

    public function setBusinessPlan(?BusinessPlan $businessPlan): self
    {
        // unset the owning side of the relation if necessary
        if ($businessPlan === null && $this->businessPlan !== null) {
            $this->businessPlan->setHistoireEtEquipe(null);
        }

        // set the owning side of the relation if necessary
        if ($businessPlan !== null && $businessPlan->getHistoireEtEquipe() !== $this) {
            $businessPlan->setHistoireEtEquipe($this);
        }

        $this->businessPlan = $businessPlan;

        return $this;
    }

    public function getPresentationSociete(): ?string
    {
        return $this->presentationSociete;
    }

    public function setPresentationSociete(?string $presentationSociete): self
    {
        $this->presentationSociete = $presentationSociete;

        return $this;
    }

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(?int $avancement): self
    {
        $this->avancement = $avancement;

        return $this;
    }
}
