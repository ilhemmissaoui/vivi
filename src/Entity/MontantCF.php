<?php

namespace App\Entity;

use App\Repository\MontantCFRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MontantCFRepository::class)]
class MontantCF
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'montantCF', targetEntity: MonthListeChiffreAffaire::class)]
    private Collection $MonthListeChiffreAffaire;

    #[ORM\ManyToOne(inversedBy: 'montantCFs')]
    private ?FinancementEtCharges $FinancementEtCharges = null;
    #[ORM\Column]
    private ?int $deleted = 0;
    public function __construct()
    {
        $this->MonthListeChiffreAffaire = new ArrayCollection();
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
     * @return Collection<int, MonthListeChiffreAffaire>
     */
    public function getMonthListeChiffreAffaire(): Collection
    {
        return $this->MonthListeChiffreAffaire;
    }

    public function addMonthListeChiffreAffaire(MonthListeChiffreAffaire $monthListeChiffreAffaire): self
    {
        if (!$this->MonthListeChiffreAffaire->contains($monthListeChiffreAffaire)) {
            $this->MonthListeChiffreAffaire->add($monthListeChiffreAffaire);
            $monthListeChiffreAffaire->setMontantCF($this);
        }

        return $this;
    }

    public function removeMonthListeChiffreAffaire(MonthListeChiffreAffaire $monthListeChiffreAffaire): self
    {
        if ($this->MonthListeChiffreAffaire->removeElement($monthListeChiffreAffaire)) {
            // set the owning side to null (unless already changed)
            if ($monthListeChiffreAffaire->getMontantCF() === $this) {
                $monthListeChiffreAffaire->setMontantCF(null);
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
