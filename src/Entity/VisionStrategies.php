<?php

namespace App\Entity;

use App\Repository\VisionStrategiesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisionStrategiesRepository::class)]
class VisionStrategies
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'visionStrategies', cascade: ['persist', 'remove'])]
    private ?Strategie $action = null;

    #[ORM\OneToOne(inversedBy: 'visionStrategies', cascade: ['persist', 'remove'])]
    private ?Strategie $objectif = null;

    #[ORM\OneToOne(inversedBy: 'visionStrategies', cascade: ['persist', 'remove'])]
    private ?Strategie $cout = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateVisionStrategies = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\ManyToOne(inversedBy: 'VisionStrategis')]
    private ?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan = null;

    #[ORM\ManyToOne(inversedBy: 'VisionStrategies')]
    private ?ProjetAnnees $projetAnnees = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAction(): ?Strategie
    {
        return $this->action;
    }

    public function setAction(?Strategie $action): self
    {
        $this->action = $action;

        return $this;
    }

    public function getObjectif(): ?Strategie
    {
        return $this->objectif;
    }

    public function setObjectif(?Strategie $objectif): self
    {
        $this->objectif = $objectif;

        return $this;
    }

    public function getCout(): ?Strategie
    {
        return $this->cout;
    }

    public function setCout(?Strategie $cout): self
    {
        $this->cout = $cout;

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

    public function getDateVisionStrategies(): ?\DateTimeInterface
    {
        return $this->dateVisionStrategies;
    }

    public function setDateVisionStrategies(\DateTimeInterface $dateVisionStrategies): self
    {
        $this->dateVisionStrategies = $dateVisionStrategies;

        return $this;
    }

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(int $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }

    public function getVisionStrategiesForBusinessPlan(): ?VisionStrategiesForBusinessPlan
    {
        return $this->visionStrategiesForBusinessPlan;
    }

    public function setVisionStrategiesForBusinessPlan(?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan): self
    {
        $this->visionStrategiesForBusinessPlan = $visionStrategiesForBusinessPlan;

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
}
