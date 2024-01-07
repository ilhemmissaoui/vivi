<?php

namespace App\Entity;

use App\Repository\InvestissementMontantRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvestissementMontantRepository::class)]
class InvestissementMontant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $montant = null;

    #[ORM\OneToOne(inversedBy: 'investissementMontant', cascade: ['persist', 'remove'])]
    private ?Investissement $Investissement = null;

    #[ORM\ManyToOne(inversedBy: 'InvestissementMontant')]
    private ?FinancementInvestissement $financementInvestissement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontant(): ?float
    {
        return $this->montant;
    }

    public function setMontant(?float $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getInvestissement(): ?Investissement
    {
        return $this->Investissement;
    }

    public function setInvestissement(?Investissement $Investissement): self
    {
        $this->Investissement = $Investissement;

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

}
