<?php

namespace App\Entity;

use App\Repository\VisionStrategiesForBusinessPlanRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisionStrategiesForBusinessPlanRepository::class)]
class VisionStrategiesForBusinessPlan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    #[ORM\OneToOne(inversedBy: 'visionStrategiesForBusinessPlan', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\OneToMany(mappedBy: 'visionStrategiesForBusinessPlan', targetEntity: VisionStrategies::class)]
    private Collection $VisionStrategis;

    #[ORM\OneToMany(mappedBy: 'visionStrategiesForBusinessPlan', targetEntity: ProjetAnnees::class)]
    private Collection $ProjetAnnees;

    public function __construct()
    {
        $this->VisionStrategis = new ArrayCollection();
        $this->ProjetAnnees = new ArrayCollection();
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
        $this->businessPlan = $businessPlan;

        return $this;
    }

    /**
     * @return Collection<int, VisionStrategies>
     */
    public function getVisionStrategis(): Collection
    {
        return $this->VisionStrategis;
    }

    public function addVisionStrategi(VisionStrategies $visionStrategi): self
    {
        if (!$this->VisionStrategis->contains($visionStrategi)) {
            $this->VisionStrategis->add($visionStrategi);
            $visionStrategi->setVisionStrategiesForBusinessPlan($this);
        }

        return $this;
    }

    public function removeVisionStrategi(VisionStrategies $visionStrategi): self
    {
        if ($this->VisionStrategis->removeElement($visionStrategi)) {
            // set the owning side to null (unless already changed)
            if ($visionStrategi->getVisionStrategiesForBusinessPlan() === $this) {
                $visionStrategi->setVisionStrategiesForBusinessPlan(null);
            }
        }

        return $this;
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
            $projetAnnee->setVisionStrategiesForBusinessPlan($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->ProjetAnnees->removeElement($projetAnnee)) {
            // set the owning side to null (unless already changed)
            if ($projetAnnee->getVisionStrategiesForBusinessPlan() === $this) {
                $projetAnnee->setVisionStrategiesForBusinessPlan(null);
            }
        }

        return $this;
    }
}
