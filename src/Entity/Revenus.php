<?php

namespace App\Entity;

use App\Repository\RevenusRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RevenusRepository::class)]
class Revenus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'revenus')]
    private ?Solution $solution = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?float $prixVenteHT = 0;

    #[ORM\Column]
    private ?float $VolumeVente = 0;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSolution(): ?Solution
    {
        return $this->solution;
    }

    public function setSolution(?Solution $solution): self
    {
        $this->solution = $solution;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrixVenteHT(): ?float
    {
        return $this->prixVenteHT;
    }

    public function setPrixVenteHT(?float $prixVenteHT): self
    {
        $this->prixVenteHT = $prixVenteHT;

        return $this;
    }

    public function getVolumeVente(): ?float
    {
        return $this->VolumeVente;
    }

    public function setVolumeVente(float $VolumeVente): self
    {
        $this->VolumeVente = $VolumeVente;

        return $this;
    }

}
