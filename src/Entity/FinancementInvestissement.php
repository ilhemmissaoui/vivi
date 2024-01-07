<?php

namespace App\Entity;

use App\Repository\FinancementInvestissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FinancementInvestissementRepository::class)]
class FinancementInvestissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'financementInvestissement', targetEntity: ProjetAnnees::class)]
    private Collection $ProjetAnnees;

    #[ORM\OneToMany(mappedBy: 'financementInvestissement', targetEntity: Investissement::class)]
    private Collection $Investissement;

    #[ORM\OneToOne(inversedBy: 'financementInvestissement', cascade: ['persist', 'remove'])]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\OneToMany(mappedBy: 'financementInvestissement', targetEntity: InvestissementMontant::class)]
    private Collection $InvestissementMontant;

    #[ORM\Column(nullable: true)]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->ProjetAnnees = new ArrayCollection();
        $this->Investissement = new ArrayCollection();
        $this->InvestissementMontant = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, ProjetAnnees>
     */
    public function getProjetAnnees(): Collection
    {
        return $this->ProjetAnnees;
    }

    public function addProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if (!$this->ProjetAnnees->contains($projetAnnee)) {
            $this->ProjetAnnees->add($projetAnnee);
            $projetAnnee->setFinancementInvestissement($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->ProjetAnnees->removeElement($projetAnnee)) {
            // set the owning side to null (unless already changed)
            if ($projetAnnee->getFinancementInvestissement() === $this) {
                $projetAnnee->setFinancementInvestissement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Investissement>
     */
    public function getInvestissement(): Collection
    {
        return $this->Investissement;
    }

    public function addInvestissement(Investissement $investissement): static
    {
        if (!$this->Investissement->contains($investissement)) {
            $this->Investissement->add($investissement);
            $investissement->setFinancementInvestissement($this);
        }

        return $this;
    }

    public function removeInvestissement(Investissement $investissement): static
    {
        if ($this->Investissement->removeElement($investissement)) {
            // set the owning side to null (unless already changed)
            if ($investissement->getFinancementInvestissement() === $this) {
                $investissement->setFinancementInvestissement(null);
            }
        }

        return $this;
    }

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->FinancementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $FinancementEtCharges): static
    {
        $this->FinancementEtCharges = $FinancementEtCharges;

        return $this;
    }

    /**
     * @return Collection<int, InvestissementMontant>
     */
    public function getInvestissementMontant(): Collection
    {
        return $this->InvestissementMontant;
    }

    public function addInvestissementMontant(InvestissementMontant $investissementMontant): static
    {
        if (!$this->InvestissementMontant->contains($investissementMontant)) {
            $this->InvestissementMontant->add($investissementMontant);
            $investissementMontant->setFinancementInvestissement($this);
        }

        return $this;
    }

    public function removeInvestissementMontant(InvestissementMontant $investissementMontant): static
    {
        if ($this->InvestissementMontant->removeElement($investissementMontant)) {
            // set the owning side to null (unless already changed)
            if ($investissementMontant->getFinancementInvestissement() === $this) {
                $investissementMontant->setFinancementInvestissement(null);
            }
        }

        return $this;
    }

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(?int $avancement): static
    {
        $this->avancement = $avancement;

        return $this;
    }
}
