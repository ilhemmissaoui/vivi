<?php

namespace App\Entity;

use App\Repository\MontheListeEncaisseDecaissementRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MontheListeEncaisseDecaissementRepository::class)]
class MontheListeEncaisseDecaissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = 0;

    #[ORM\Column]
    private ?float $Jan = 0;

    #[ORM\Column]
    private ?float $Frv = 0;

    #[ORM\Column]
    private ?float $Mar = 0;

    #[ORM\Column]
    private ?float $Avr = 0;

    #[ORM\Column]
    private ?float $Mai = 0;

    #[ORM\Column]
    private ?float $Juin = 0;

    #[ORM\Column]
    private ?float $Juil = 0;

    #[ORM\Column]
    private ?float $Aou = 0;

    #[ORM\Column]
    private ?float $Sept = 0;

    #[ORM\Column]
    private ?float $Oct = 0;

    #[ORM\Column]
    private ?float $Nov = 0;

    #[ORM\Column]
    private ?float $Dece = 0;

    #[ORM\ManyToOne(inversedBy: 'MontheListeEncaisseDecaissement')]
    private ?ProjetAnnees $projetAnnees = null;

    #[ORM\OneToOne(inversedBy: 'montheListeEncaisseDecaissement', cascade: ['persist', 'remove'])]
    private ?EncaisseDecaissement $EncaisseDecaissement = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getJan(): ?float
    {
        return $this->Jan;
    }

    public function setJan(float $Jan): static
    {
        $this->Jan = $Jan;

        return $this;
    }
    public function getFrv(): ?float
    {
        return $this->Frv;
    }

    public function setFrv(float $Frv): static
    {
        $this->Frv = $Frv;

        return $this;
    }

    public function getMar(): ?float
    {
        return $this->Mar;
    }

    public function setMar(float $Mar): static
    {
        $this->Mar = $Mar;

        return $this;
    }

    public function getAvr(): ?float
    {
        return $this->Avr;
    }

    public function setAvr(float $Avr): static
    {
        $this->Avr = $Avr;

        return $this;
    }

    public function getMai(): ?float
    {
        return $this->Mai;
    }

    public function setMai(float $Mai): static
    {
        $this->Mai = $Mai;

        return $this;
    }

    public function getJuin(): ?float
    {
        return $this->Juin;
    }

    public function setJuin(float $Juin): static
    {
        $this->Juin = $Juin;

        return $this;
    }

    public function getJuil(): ?float
    {
        return $this->Juil;
    }

    public function setJuil(float $Juil): static
    {
        $this->Juil = $Juil;

        return $this;
    }

    public function getAou(): ?float
    {
        return $this->Aou;
    }

    public function setAou(float $Aou): static
    {
        $this->Aou = $Aou;

        return $this;
    }

    public function getSept(): ?float
    {
        return $this->Sept;
    }

    public function setSept(float $Sept): static
    {
        $this->Sept = $Sept;

        return $this;
    }

    public function getOct(): ?float
    {
        return $this->Oct;
    }

    public function setOct(float $Oct): static
    {
        $this->Oct = $Oct;

        return $this;
    }

    public function getNov(): ?float
    {
        return $this->Nov;
    }

    public function setNov(float $Nov): static
    {
        $this->Nov = $Nov;

        return $this;
    }

    public function getDece(): ?float
    {
        return $this->Dece;
    }

    public function setDece(float $Dece): static
    {
        $this->Dece = $Dece;

        return $this;
    }

    public function getEncaisseDecaissement(): ?EncaisseDecaissement
    {
        return $this->EncaisseDecaissement;
    }

    public function setEncaisseDecaissement(?EncaisseDecaissement $EncaisseDecaissement): static
    {
        $this->EncaisseDecaissement = $EncaisseDecaissement;

        return $this;
    }
}
