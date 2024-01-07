<?php

namespace App\Entity;

use App\Repository\SolutionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SolutionRepository::class)]
class Solution
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $innovation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $pointFort = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descTechnique = null;

    #[ORM\OneToMany(mappedBy: 'solution', targetEntity: Revenus::class)]
    private Collection $revenus;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\ManyToOne(inversedBy: 'solutions')]
    private ?NotreSolution $notreSolution = null;

    #[ORM\ManyToMany(targetEntity: ProjetAnnees::class, mappedBy: 'solutions')]
    private Collection $projetAnnees;

    public function __construct()
    {
        $this->revenus = new ArrayCollection();
        $this->projetAnnees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInnovation(): ?string
    {
        return $this->innovation;
    }

    public function setInnovation(?string $innovation): self
    {
        $this->innovation = $innovation;

        return $this;
    }

    public function getPointFort(): ?string
    {
        return $this->pointFort;
    }

    public function setPointFort(?string $pointFort): self
    {
        $this->pointFort = $pointFort;

        return $this;
    }

    public function getDescTechnique(): ?string
    {
        return $this->descTechnique;
    }

    public function setDescTechnique(?string $descTechnique): self
    {
        $this->descTechnique = $descTechnique;
        return $this;
    }

    /**
     * @return Collection<int, Revenus>
     */
    public function getRevenus(): Collection
    {
        return $this->revenus;
    }

    public function addRevenu(Revenus $revenu): self
    {
        if (!$this->revenus->contains($revenu)) {
            $this->revenus->add($revenu);
            $revenu->setSolution($this);
        }

        return $this;
    }

    public function removeRevenu(Revenus $revenu): self
    {
        if ($this->revenus->removeElement($revenu)) {
            // set the owning side to null (unless already changed)
            if ($revenu->getSolution() === $this) {
                $revenu->setSolution(null);
            }
        }

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getNotreSolution(): ?NotreSolution
    {
        return $this->notreSolution;
    }

    public function setNotreSolution(?NotreSolution $notreSolution): static
    {
        $this->notreSolution = $notreSolution;

        return $this;
    }

    /**
     * @return Collection<int, ProjetAnnees>
     */
    public function getProjetAnnees(): Collection
    {
        return $this->projetAnnees;
    }

    public function addProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if (!$this->projetAnnees->contains($projetAnnee)) {
            $this->projetAnnees->add($projetAnnee);
            $projetAnnee->addSolution($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->projetAnnees->removeElement($projetAnnee)) {
            $projetAnnee->removeSolution($this);
        }

        return $this;
    }

}
