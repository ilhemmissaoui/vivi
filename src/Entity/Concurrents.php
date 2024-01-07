<?php

namespace App\Entity;

use App\Repository\ConcurrentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConcurrentsRepository::class)]
class Concurrents
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $volume = null;

    #[ORM\ManyToOne(inversedBy: 'concurrents')]
    private ?Besoins $besoins = null;

    #[ORM\ManyToOne(inversedBy: 'Concurrents')]
    private ?Societe $societe = null;

    #[ORM\ManyToOne(inversedBy: 'ConcurrentName')]
    private ?PositionnementConcurrentiel $positionnementConcurrentiel = null;

    public function __construct()
    {
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVolume(): ?int
    {
        return $this->volume;
    }

    public function setVolume(int $volume): self
    {
        $this->volume = $volume;

        return $this;
    }

    public function getBesoins(): ?Besoins
    {
        return $this->besoins;
    }

    public function setBesoins(?Besoins $besoins): self
    {
        $this->besoins = $besoins;

        return $this;
    }

    public function getSociete(): ?Societe
    {
        return $this->societe;
    }

    public function setSociete(?Societe $societe): self
    {
        $this->societe = $societe;

        return $this;
    }


    public function getPositionnementConcurrentiel(): ?PositionnementConcurrentiel
    {
        return $this->positionnementConcurrentiel;
    }

    public function setPositionnementConcurrentiel(?PositionnementConcurrentiel $positionnementConcurrentiel): static
    {
        $this->positionnementConcurrentiel = $positionnementConcurrentiel;

        return $this;
    }
}
