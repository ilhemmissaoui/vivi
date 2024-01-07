<?php

namespace App\Entity;

use App\Repository\PositionnementConcurrentielRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PositionnementConcurrentielRepository::class)]
class PositionnementConcurrentiel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\OneToOne(mappedBy: 'PositionnementConcurrentiel', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\OneToMany(mappedBy: 'positionnementConcurrentiel', targetEntity: Besoins::class)]
    private Collection $Besoin;

    #[ORM\OneToMany(mappedBy: 'positionnementConcurrentiel', targetEntity: Societe::class)]
    private Collection $societes;

    public function __construct()
    {
        $this->Besoin = new ArrayCollection();
        $this->societes = new ArrayCollection();
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(int $avancement): self
    {
        $this->avancement = $avancement;

        return $this;
    }

    public function getBusinessPlan(): ?BusinessPlan
    {
        return $this->businessPlan;
    }

    public function setBusinessPlan(?BusinessPlan $businessPlan): self
    {
        // unset the owning side of the relation if necessary
        if ($businessPlan === null && $this->businessPlan !== null) {
            $this->businessPlan->setPositionnementConcurrentiel(null);
        }

        // set the owning side of the relation if necessary
        if ($businessPlan !== null && $businessPlan->getPositionnementConcurrentiel() !== $this) {
            $businessPlan->setPositionnementConcurrentiel($this);
        }

        $this->businessPlan = $businessPlan;

        return $this;
    }

    /**
     * @return Collection<int, Besoins>
     */
    public function getBesoin(): Collection
    {
        return $this->Besoin;
    }

    public function addBesoin(Besoins $besoin): self
    {
        if (!$this->Besoin->contains($besoin)) {
            $this->Besoin->add($besoin);
            $besoin->setPositionnementConcurrentiel($this);
        }

        return $this;
    }

    public function removeBesoin(Besoins $besoin): self
    {
        if ($this->Besoin->removeElement($besoin)) {
            // set the owning side to null (unless already changed)
            if ($besoin->getPositionnementConcurrentiel() === $this) {
                $besoin->setPositionnementConcurrentiel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Societe>
     */
    public function getSocietes(): Collection
    {
        return $this->societes;
    }

    public function addSociete(Societe $societe): static
    {
        if (!$this->societes->contains($societe)) {
            $this->societes->add($societe);
            $societe->setPositionnementConcurrentiel($this);
        }

        return $this;
    }

    public function removeSociete(Societe $societe): static
    {
        if ($this->societes->removeElement($societe)) {
            // set the owning side to null (unless already changed)
            if ($societe->getPositionnementConcurrentiel() === $this) {
                $societe->setPositionnementConcurrentiel(null);
            }
        }

        return $this;
    }

}
