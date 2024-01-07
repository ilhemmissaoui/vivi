<?php

namespace App\Entity;

use App\Repository\ChiffreAffaireActiviteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChiffreAffaireActiviteRepository::class)]
class ChiffreAffaireActivite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null; 

    #[ORM\ManyToOne(inversedBy: 'chifreAf')]
    private ?FinancementEtCharges $financementEtCharges = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $deleted = 0;



    #[ORM\OneToMany(mappedBy: 'chiffreAffaireActivite', targetEntity: MonthListeChiffreAffaire::class)]
    private Collection $MonthListeChiffreAffaire;

    #[ORM\ManyToOne(inversedBy: 'ChiffreAffaireActivite')]
    private ?FinancementChiffreAffaire $financementChiffreAffaire = null;

   
    public function __construct()
    {
 
        $this->MonthListeChiffreAffaire = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
            $monthListeChiffreAffaire->setChiffreAffaireActivite($this);
        }

        return $this;
    }

    public function removeMonthListeChiffreAffaire(MonthListeChiffreAffaire $monthListeChiffreAffaire): self
    {
        if ($this->MonthListeChiffreAffaire->removeElement($monthListeChiffreAffaire)) {
            // set the owning side to null (unless already changed)
            if ($monthListeChiffreAffaire->getChiffreAffaireActivite() === $this) {
                $monthListeChiffreAffaire->setChiffreAffaireActivite(null);
            }
        }

        return $this;
    }

    public function getFinancementChiffreAffaire(): ?FinancementChiffreAffaire
    {
        return $this->financementChiffreAffaire;
    }

    public function setFinancementChiffreAffaire(?FinancementChiffreAffaire $financementChiffreAffaire): static
    {
        $this->financementChiffreAffaire = $financementChiffreAffaire;

        return $this;
    }
}
