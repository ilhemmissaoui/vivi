<?php

namespace App\Entity;

use App\Repository\NotreSolutionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotreSolutionRepository::class)]
class NotreSolution
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'notreSolution', targetEntity: Solution::class)]
    private Collection $solutions;

    #[ORM\OneToMany(mappedBy: 'notreSolution', targetEntity: ProjetAnnees::class)]
    private Collection $anneeProjet;

    #[ORM\OneToOne(inversedBy: 'notreSolution', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $BusinessPlan = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->solutions = new ArrayCollection();
        $this->anneeProjet = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Solution>
     */
    public function getSolutions(): Collection
    {
        return $this->solutions;
    }

    public function addSolution(Solution $solution): static
    {
        if (!$this->solutions->contains($solution)) {
            $this->solutions->add($solution);
            $solution->setNotreSolution($this);
        }

        return $this;
    }

    public function removeSolution(Solution $solution): static
    {
        if ($this->solutions->removeElement($solution)) {
            // set the owning side to null (unless already changed)
            if ($solution->getNotreSolution() === $this) {
                $solution->setNotreSolution(null);
            }
        }

        return $this;
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
            $anneeProjet->setNotreSolution($this);
        }

        return $this;
    }

    public function removeAnneeProjet(ProjetAnnees $anneeProjet): static
    {
        if ($this->anneeProjet->removeElement($anneeProjet)) {
            // set the owning side to null (unless already changed)
            if ($anneeProjet->getNotreSolution() === $this) {
                $anneeProjet->setNotreSolution(null);
            }
        }

        return $this;
    }

    public function getBusinessPlan(): ?BusinessPlan
    {
        return $this->BusinessPlan;
    }

    public function setBusinessPlan(?BusinessPlan $BusinessPlan): static
    {
        $this->BusinessPlan = $BusinessPlan;

        return $this;
    }

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(int $avancement): static
    {
        $this->avancement = $avancement;

        return $this;
    }
}
