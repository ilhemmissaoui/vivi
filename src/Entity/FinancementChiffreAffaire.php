<?php

namespace App\Entity;

use App\Repository\FinancementChiffreAffaireRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FinancementChiffreAffaireRepository::class)]
class FinancementChiffreAffaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'financementChiffreAffaire', targetEntity: ChiffreAffaireActivite::class)]
    private Collection $ChiffreAffaireActivite;

    #[ORM\OneToMany(mappedBy: 'financementChiffreAffaire', targetEntity: ProjetAnnees::class)]
    private Collection $ProjetAnnees;

    #[ORM\OneToOne(inversedBy: 'financementChiffreAffaire', cascade: ['persist', 'remove'])]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\Column(nullable: true)]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->ChiffreAffaireActivite = new ArrayCollection();
        $this->ProjetAnnees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, ChiffreAffaireActivite>
     */
    public function getChiffreAffaireActivite(): Collection
    {
        return $this->ChiffreAffaireActivite;
    }

    public function addChiffreAffaireActivite(ChiffreAffaireActivite $chiffreAffaireActivite): static
    {
        if (!$this->ChiffreAffaireActivite->contains($chiffreAffaireActivite)) {
            $this->ChiffreAffaireActivite->add($chiffreAffaireActivite);
            $chiffreAffaireActivite->setFinancementChiffreAffaire($this);
        }

        return $this;
    }

    public function removeChiffreAffaireActivite(ChiffreAffaireActivite $chiffreAffaireActivite): static
    {
        if ($this->ChiffreAffaireActivite->removeElement($chiffreAffaireActivite)) {
            // set the owning side to null (unless already changed)
            if ($chiffreAffaireActivite->getFinancementChiffreAffaire() === $this) {
                $chiffreAffaireActivite->setFinancementChiffreAffaire(null);
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
            $projetAnnee->setFinancementChiffreAffaire($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->ProjetAnnees->removeElement($projetAnnee)) {
            // set the owning side to null (unless already changed)
            if ($projetAnnee->getFinancementChiffreAffaire() === $this) {
                $projetAnnee->setFinancementChiffreAffaire(null);
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

    public function getAvancement(): ?int
    {
        return $this->avancement;
    }

    public function setAvancement(?int $avancement): static
    {
        $this->avancement = $avancement;

        return $this;
    }
}
