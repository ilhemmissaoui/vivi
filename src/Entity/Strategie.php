<?php

namespace App\Entity;

use App\Repository\StrategieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StrategieRepository::class)]
class Strategie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $debut = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $fin = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $action = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $cible = null;

    #[ORM\OneToOne(mappedBy: 'action', cascade: ['persist', 'remove'])]
    private ?VisionStrategies $visionStrategies = null;

    #[ORM\Column(nullable: true)]
    private ?float $Cout = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDebut(): ?\DateTimeInterface
    {
        return $this->debut;
    }

    public function setDebut(\DateTimeInterface $debut): self
    {
        $this->debut = $debut;

        return $this;
    }

    public function getFin(): ?\DateTimeInterface
    {
        return $this->fin;
    }

    public function setFin(\DateTimeInterface $fin): self
    {
        $this->fin = $fin;

        return $this;
    }

    public function getAction(): ?string
    {
        return $this->action;
    }

    public function setAction(string $action): self
    {
        $this->action = $action;

        return $this;
    }

    public function getCible(): ?string
    {
        return $this->cible;
    }

    public function setCible(string $cible): self
    {
        $this->cible = $cible;

        return $this;
    }

    public function getVisionStrategies(): ?VisionStrategies
    {
        return $this->visionStrategies;
    }

    public function setVisionStrategies(?VisionStrategies $visionStrategies): self
    {
        // unset the owning side of the relation if necessary
        if ($visionStrategies === null && $this->visionStrategies !== null) {
            $this->visionStrategies->setAction(null);
        }

        // set the owning side of the relation if necessary
        if ($visionStrategies !== null && $visionStrategies->getAction() !== $this) {
            $visionStrategies->setAction($this);
        }

        $this->visionStrategies = $visionStrategies;

        return $this;
    }

    public function getCout(): ?float
    {
        return $this->Cout;
    }

    public function setCout(?float $Cout): static
    {
        $this->Cout = $Cout;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
