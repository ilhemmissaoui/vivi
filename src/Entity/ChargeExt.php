<?php

namespace App\Entity;

use App\Repository\ChargeExtRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChargeExtRepository::class)]
class ChargeExt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'chargeExt')]
    private ?Depenses $depenses = null;

    #[ORM\ManyToOne(inversedBy: 'chargeExt')]
    private ?FinancementEtCharges $financementEtCharges = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\OneToMany(mappedBy: 'chargeExt', targetEntity: MonthChargeExt::class)]
    private Collection $MonthChargeExt;

    #[ORM\ManyToOne(inversedBy: 'ChargeExt')]
    private ?FinancementDepense $financementDepense = null;




    public function __construct()
    {
        $this->MonthChargeExt = new ArrayCollection();
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

    public function getDepenses(): ?Depenses
    {
        return $this->depenses;
    }

    public function setDepenses(?Depenses $depenses): self
    {
        $this->depenses = $depenses;

        return $this;
    }

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->financementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $financementEtCharges): self
    {
        $this->financementEtCharges = $financementEtCharges;

        return $this;
    }

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(?int $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * @return Collection<int, MonthChargeExt>
     */
    public function getMonthChargeExt(): Collection
    {
        return $this->MonthChargeExt;
    }

    public function addMonthChargeExt(MonthChargeExt $monthChargeExt): self
    {
        if (!$this->MonthChargeExt->contains($monthChargeExt)) {
            $this->MonthChargeExt->add($monthChargeExt);
            $monthChargeExt->setChargeExt($this);
        }

        return $this;
    }

    public function removeMonthChargeExt(MonthChargeExt $monthChargeExt): self
    {
        if ($this->MonthChargeExt->removeElement($monthChargeExt)) {
            // set the owning side to null (unless already changed)
            if ($monthChargeExt->getChargeExt() === $this) {
                $monthChargeExt->setChargeExt(null);
            }
        }

        return $this;
    }

    public function getFinancementDepense(): ?FinancementDepense
    {
        return $this->financementDepense;
    }

    public function setFinancementDepense(?FinancementDepense $financementDepense): static
    {
        $this->financementDepense = $financementDepense;

        return $this;
    }
}
