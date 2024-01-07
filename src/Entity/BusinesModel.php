<?php

namespace App\Entity;

use App\Repository\BusinesModelRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BusinesModelRepository::class)]
class BusinesModel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $segmentClient = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $propositionValeur = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $canauxDistribution = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $fluxRevenus = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $resourceCles = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $activiteCles = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $partnaireStratedique = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $structureCouts = null;

    #[ORM\OneToOne(inversedBy: 'businesModel', cascade: ['persist', 'remove'])]
    private ?Projet $projet = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $relationClient = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $laseUpdate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSegmentClient(): ?string
    {
        return $this->segmentClient;
    }

    public function setSegmentClient(?string $segmentClient): self
    {
        $this->segmentClient = $segmentClient;

        return $this;
    }

    public function getPropositionValeur(): ?string
    {
        return $this->propositionValeur;
    }

    public function setPropositionValeur(?string $propositionValeur): self
    {
        $this->propositionValeur = $propositionValeur;

        return $this;
    }

    public function getCanauxDistribution(): ?string
    {
        return $this->canauxDistribution;
    }

    public function setCanauxDistribution(?string $canauxDistribution): self
    {
        $this->canauxDistribution = $canauxDistribution;

        return $this;
    }

    public function getFluxRevenus(): ?string
    {
        return $this->fluxRevenus;
    }

    public function setFluxRevenus(?string $fluxRevenus): self
    {
        $this->fluxRevenus = $fluxRevenus;

        return $this;
    }

    public function getResourceCles(): ?string
    {
        return $this->resourceCles;
    }

    public function setResourceCles(?string $resourceCles): self
    {
        $this->resourceCles = $resourceCles;

        return $this;
    }

    public function getActiviteCles(): ?string
    {
        return $this->activiteCles;
    }

    public function setActiviteCles(?string $activiteCles): self
    {
        $this->activiteCles = $activiteCles;

        return $this;
    }

    public function getPartnaireStratedique(): ?string
    {
        return $this->partnaireStratedique;
    }

    public function setPartnaireStratedique(?string $partnaireStratedique): self
    {
        $this->partnaireStratedique = $partnaireStratedique;

        return $this;
    }

    public function getStructureCouts(): ?string
    {
        return $this->structureCouts;
    }

    public function setStructureCouts(?string $structureCouts): self
    {
        $this->structureCouts = $structureCouts;

        return $this;
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

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(int $avancement): self
    {
        $this->avancement = $avancement;

        return $this;
    }

    public function getRelationClient(): ?string
    {
        return $this->relationClient;
    }

    public function setRelationClient(?string $relationClient): self
    {
        $this->relationClient = $relationClient;
        return $this;
    }

    public function getLaseUpdate(): ?\DateTimeInterface
    {
        return $this->laseUpdate;
    }

    public function setLasteUpdate(\DateTimeInterface $laseUpdate): self
    {
        $this->laseUpdate = $laseUpdate;

        return $this;
    }

    public function setLaseUpdate(?\DateTimeInterface $laseUpdate): self
    {
        $this->laseUpdate = $laseUpdate;

        return $this;
    }
    
}