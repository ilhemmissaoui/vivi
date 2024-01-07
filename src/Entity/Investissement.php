<?php

namespace App\Entity;

use App\Repository\InvestissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvestissementRepository::class)]
class Investissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
  
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $nature = null;

    #[ORM\Column(length: 255)]
    private ?string $duree = null;

    #[ORM\Column(length: 255)]
    private ?string $apportEnNature = null;

    #[ORM\OneToOne(mappedBy: 'Investissement', cascade: ['persist', 'remove'])]
    private ?InvestissementMontant $investissementMontant = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\ManyToOne(inversedBy: 'Investissement')]
    private ?ProjetAnnees $projetAnnees = null;

    #[ORM\ManyToOne(inversedBy: 'Investissement')]
    private ?FinancementInvestissement $financementInvestissement = null;

    #[ORM\ManyToOne(inversedBy: 'Investissement')]
    private ?InvestissementNature $investissementNature = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getNature(): ?string
    {
        return $this->nature;
    }

    public function setNature(string $nature): self
    {
        $this->nature = $nature;

        return $this;
    }

    public function getDuree(): ?string
    {
        return $this->duree;
    }

    public function setDuree(string $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getApportEnNature(): ?string
    {
        return $this->apportEnNature;
    }

    public function setApportEnNature(string $apportEnNature): self
    {
        $this->apportEnNature = $apportEnNature;

        return $this;
    }

    public function getInvestissementMontant(): ?InvestissementMontant
    {
        return $this->investissementMontant;
    }

    public function setInvestissementMontant(?InvestissementMontant $investissementMontant): self
    {
        // unset the owning side of the relation if necessary
        if ($investissementMontant === null && $this->investissementMontant !== null) {
            $this->investissementMontant->setInvestissement(null);
        }

        // set the owning side of the relation if necessary
        if ($investissementMontant !== null && $investissementMontant->getInvestissement() !== $this) {
            $investissementMontant->setInvestissement($this);
        }

        $this->investissementMontant = $investissementMontant;

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

    public function getProjetAnnees(): ?ProjetAnnees
    {
        return $this->projetAnnees;
    }

    public function setProjetAnnees(?ProjetAnnees $projetAnnees): static
    {
        $this->projetAnnees = $projetAnnees;

        return $this;
    }

    public function getFinancementInvestissement(): ?FinancementInvestissement
    {
        return $this->financementInvestissement;
    }

    public function setFinancementInvestissement(?FinancementInvestissement $financementInvestissement): static
    {
        $this->financementInvestissement = $financementInvestissement;

        return $this;
    }

    public function getInvestissementNature(): ?InvestissementNature
    {
        return $this->investissementNature;
    }

    public function setInvestissementNature(?InvestissementNature $investissementNature): static
    {
        $this->investissementNature = $investissementNature;

        return $this;
    }
}
