<?php

namespace App\Entity;

use App\Repository\MontantCExtRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MontantCExtRepository::class)]
class MontantCExt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'montantCExt', targetEntity: MonthChargeExt::class)]
    private Collection $MonthChargeExt;

    #[ORM\ManyToOne(inversedBy: 'montantCExts')]
    private ?FinancementEtCharges $FinancementEtCharges = null;
    #[ORM\Column]
    private ?int $deleted = 0;
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
            $monthChargeExt->setMontantCExt($this);
        }

        return $this;
    }

    public function removeMonthChargeExt(MonthChargeExt $monthChargeExt): self
    {
        if ($this->MonthChargeExt->removeElement($monthChargeExt)) {
            // set the owning side to null (unless already changed)
            if ($monthChargeExt->getMontantCExt() === $this) {
                $monthChargeExt->setMontantCExt(null);
            }
        }

        return $this;
    }

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->FinancementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $FinancementEtCharges): self
    {
        $this->FinancementEtCharges = $FinancementEtCharges;

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

}
