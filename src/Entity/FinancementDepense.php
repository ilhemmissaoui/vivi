<?php

namespace App\Entity;

use App\Repository\FinancementDepenseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FinancementDepenseRepository::class)]
class FinancementDepense
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'financementDepense', targetEntity: ProjetAnnees::class)]
    private Collection $anneeProjet;

    #[ORM\OneToOne(inversedBy: 'financementDepense', cascade: ['persist', 'remove'])]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\OneToMany(mappedBy: 'financementDepense', targetEntity: ChargeExt::class)]
    private Collection $ChargeExt;

    #[ORM\Column(nullable: true)]
    private ?int $avancement = 0;

    #[ORM\OneToMany(mappedBy: 'FinancementDepense', targetEntity: MonthChargeExt::class)]
    private Collection $monthChargeExts;

    public function __construct()
    {
        $this->anneeProjet = new ArrayCollection();
        $this->ChargeExt = new ArrayCollection();
        $this->monthChargeExts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, ProjetAnnees>
     */
    public function getAnneeProjet(): Collection
    {
        return $this->anneeProjet;
    }

    public function addAnneeProjet(ProjetAnnees $anneeProjet): static
    {
        if (!$this->anneeProjet->contains($anneeProjet)) {
            $this->anneeProjet->add($anneeProjet);
            $anneeProjet->setFinancementDepense($this);
        }

        return $this;
    }

    public function removeAnneeProjet(ProjetAnnees $anneeProjet): static
    {
        if ($this->anneeProjet->removeElement($anneeProjet)) {
            // set the owning side to null (unless already changed)
            if ($anneeProjet->getFinancementDepense() === $this) {
                $anneeProjet->setFinancementDepense(null);
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
     * @return Collection<int, ChargeExt>
     */
    public function getChargeExt(): Collection
    {
        return $this->ChargeExt;
    }

    public function addChargeExt(ChargeExt $chargeExt): static
    {
        if (!$this->ChargeExt->contains($chargeExt)) {
            $this->ChargeExt->add($chargeExt);
            $chargeExt->setFinancementDepense($this);
        }

        return $this;
    }

    public function removeChargeExt(ChargeExt $chargeExt): static
    {
        if ($this->ChargeExt->removeElement($chargeExt)) {
            // set the owning side to null (unless already changed)
            if ($chargeExt->getFinancementDepense() === $this) {
                $chargeExt->setFinancementDepense(null);
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

    /**
     * @return Collection<int, MonthChargeExt>
     */
    public function getMonthChargeExts(): Collection
    {
        return $this->monthChargeExts;
    }

    public function addMonthChargeExt(MonthChargeExt $monthChargeExt): static
    {
        if (!$this->monthChargeExts->contains($monthChargeExt)) {
            $this->monthChargeExts->add($monthChargeExt);
            $monthChargeExt->setFinancementDepense($this);
        }

        return $this;
    }

    public function removeMonthChargeExt(MonthChargeExt $monthChargeExt): static
    {
        if ($this->monthChargeExts->removeElement($monthChargeExt)) {
            // set the owning side to null (unless already changed)
            if ($monthChargeExt->getFinancementDepense() === $this) {
                $monthChargeExt->setFinancementDepense(null);
            }
        }

        return $this;
    }
}
