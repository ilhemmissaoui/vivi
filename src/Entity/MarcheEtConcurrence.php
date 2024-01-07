<?php

namespace App\Entity;

use App\Repository\MarcheEtConcurrenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MarcheEtConcurrenceRepository::class)]
class MarcheEtConcurrence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $problem = null;

    #[ORM\OneToMany(mappedBy: 'marcheEtConcurrence', targetEntity: Societe::class)]
    private Collection $societe;

    #[ORM\OneToOne(mappedBy: 'MarcheEtConcurrence', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->societe = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProblem(): ?string
    {
        return $this->problem;
    }

    public function setProblem(?string $problem): self
    {
        $this->problem = $problem;

        return $this;
    }

    /**
     * @return Collection<int, Societe>
     */
    public function getSociete(): Collection
    {
        return $this->societe;
    }

    public function addSociete(Societe $societe): self
    {
        if (!$this->societe->contains($societe)) {
            $this->societe->add($societe);
            $societe->setMarcheEtConcurrence($this);
        }

        return $this;
    }

    public function removeSociete(Societe $societe): self
    {
        if ($this->societe->removeElement($societe)) {
            // set the owning side to null (unless already changed)
            if ($societe->getMarcheEtConcurrence() === $this) {
                $societe->setMarcheEtConcurrence(null);
            }
        }

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
            $this->businessPlan->setMarcheEtConcurrence(null);
        }

        // set the owning side of the relation if necessary
        if ($businessPlan !== null && $businessPlan->getMarcheEtConcurrence() !== $this) {
            $businessPlan->setMarcheEtConcurrence($this);
        }

        $this->businessPlan = $businessPlan;

        return $this;
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
}
