<?php

namespace App\Entity;

use App\Repository\BusinessPlanRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BusinessPlanRepository::class)]
class BusinessPlan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?Projet $projet = null;

    #[ORM\OneToOne(inversedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?HistoireEtEquipe $histoireEtEquipe = null;

    #[ORM\OneToOne(inversedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\OneToOne(inversedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?MarcheEtConcurrence $MarcheEtConcurrence = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\OneToOne(inversedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?PositionnementConcurrentiel $PositionnementConcurrentiel = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $lasteUpdate = null;

    #[ORM\OneToOne(mappedBy: 'businessPlan', cascade: ['persist', 'remove'])]
    private ?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan = null;

    #[ORM\OneToOne(mappedBy: 'BusinessPlan', cascade: ['persist', 'remove'])]
    private ?NotreSolution $notreSolution = null;

    public function __construct()
    {
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProjet(): ?Projet
    {
        return $this->projet;
    }

    public function setProjet(?Projet $projet): self
    {
        $this->projet = $projet;

        return $this;
    }

    public function getHistoireEtEquipe(): ?HistoireEtEquipe
    {
        return $this->histoireEtEquipe;
    }

    public function setHistoireEtEquipe(?HistoireEtEquipe $histoireEtEquipe): self
    {
        $this->histoireEtEquipe = $histoireEtEquipe;
        return $this;
    }

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->FinancementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $FinancementEtCharges): self
    {
        $this->FinancementEtCharges = $FinancementEtCharges;

        return $this;
    }

    public function getMarcheEtConcurrence(): ?MarcheEtConcurrence
    {
        return $this->MarcheEtConcurrence;
    }

    public function setMarcheEtConcurrence(?MarcheEtConcurrence $MarcheEtConcurrence): self
    {
        $this->MarcheEtConcurrence = $MarcheEtConcurrence;

        return $this;
    }

   
    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(int $avancement): self
    {
        $this->avancement = $avancement;
        return $this;
    }

    public function getPositionnementConcurrentiel(): ?PositionnementConcurrentiel
    {
        return $this->PositionnementConcurrentiel;
    }

    public function setPositionnementConcurrentiel(?PositionnementConcurrentiel $PositionnementConcurrentiel): self
    {
        $this->PositionnementConcurrentiel = $PositionnementConcurrentiel;
        return $this;
    }


    public function getLasteUpdate(): ?\DateTimeInterface
    {
        return $this->lasteUpdate;
    }

    public function setLasteUpdate(?\DateTimeInterface $lasteUpdate): self
    {
        $this->lasteUpdate = $lasteUpdate;

        return $this;
    }

    public function getVisionStrategiesForBusinessPlan(): ?VisionStrategiesForBusinessPlan
    {
        return $this->visionStrategiesForBusinessPlan;
    }

    public function setVisionStrategiesForBusinessPlan(?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan): self
    {
        // unset the owning side of the relation if necessary
        if ($visionStrategiesForBusinessPlan === null && $this->visionStrategiesForBusinessPlan !== null) {
            $this->visionStrategiesForBusinessPlan->setBusinessPlan(null);
        }

        // set the owning side of the relation if necessary
        if ($visionStrategiesForBusinessPlan !== null && $visionStrategiesForBusinessPlan->getBusinessPlan() !== $this) {
            $visionStrategiesForBusinessPlan->setBusinessPlan($this);
        }

        $this->visionStrategiesForBusinessPlan = $visionStrategiesForBusinessPlan;

        return $this;
    }

    public function getNotreSolution(): ?NotreSolution
    {
        return $this->notreSolution;
    }

    public function setNotreSolution(?NotreSolution $notreSolution): static
    {
        // unset the owning side of the relation if necessary
        if ($notreSolution === null && $this->notreSolution !== null) {
            $this->notreSolution->setBusinessPlan(null);
        }

        // set the owning side of the relation if necessary
        if ($notreSolution !== null && $notreSolution->getBusinessPlan() !== $this) {
            $notreSolution->setBusinessPlan($this);
        }

        $this->notreSolution = $notreSolution;

        return $this;
    }
}
