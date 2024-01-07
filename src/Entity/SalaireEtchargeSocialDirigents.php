<?php

namespace App\Entity;

use App\Repository\SalaireEtchargeSocialDirigentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SalaireEtchargeSocialDirigentsRepository::class)]
class SalaireEtchargeSocialDirigents
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'SalaireEtchargeSocialDirigents')]
    private ?FinancementEtCharges $financementEtCharges = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\OneToMany(mappedBy: 'salaireEtchargeSocialDirigents', targetEntity: SalaireEtchargeDirigentsInfo::class)]
    private Collection $SalaireEtchargeDirigentsInfo;

    #[ORM\ManyToMany(targetEntity: CollaborateurProjet::class, inversedBy: 'salaireEtchargeSocialDirigents')]
    private Collection $CollaborateurProjet;

    #[ORM\OneToOne(mappedBy: 'SalaireEtchargeSocialDirigents', cascade: ['persist', 'remove'])]
    private ?ProjetAnnees $projetAnnees = null;

    public function __construct()
    {
        $this->SalaireEtchargeDirigentsInfo = new ArrayCollection();
        $this->CollaborateurProjet = new ArrayCollection();
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

    public function setDeleted(int $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }


    /**
     * @return Collection<int, SalaireEtchargeDirigentsInfo>
     */
    public function getSalaireEtchargeDirigentsInfo(): Collection
    {
        return $this->SalaireEtchargeDirigentsInfo;
    }

    public function addSalaireEtchargeDirigent(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigent): self
    {
        if (!$this->SalaireEtchargeDirigentsInfo->contains($salaireEtchargeDirigent)) {
            $this->SalaireEtchargeDirigentsInfo->add($salaireEtchargeDirigent);
            $salaireEtchargeDirigent->setSalaireEtchargeSocialDirigents($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeDirigent(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigent): self
    {
        if ($this->SalaireEtchargeDirigentsInfo->removeElement($salaireEtchargeDirigent)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeDirigent->getSalaireEtchargeSocialDirigents() === $this) {
                $salaireEtchargeDirigent->setSalaireEtchargeSocialDirigents(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CollaborateurProjet>
     */
    public function getCollaborateurProjet(): Collection
    {
        return $this->CollaborateurProjet;
    }

    public function addCollaborateurProjet(CollaborateurProjet $collaborateurProjet): self
    {
        if (!$this->CollaborateurProjet->contains($collaborateurProjet)) {
            $this->CollaborateurProjet->add($collaborateurProjet);
        }

        return $this;
    }

    public function removeCollaborateurProjet(CollaborateurProjet $collaborateurProjet): self
    {
        $this->CollaborateurProjet->removeElement($collaborateurProjet);

        return $this;
    }

    public function addSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): static
    {
        if (!$this->SalaireEtchargeDirigentsInfo->contains($salaireEtchargeDirigentsInfo)) {
            $this->SalaireEtchargeDirigentsInfo->add($salaireEtchargeDirigentsInfo);
            $salaireEtchargeDirigentsInfo->setSalaireEtchargeSocialDirigents($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): static
    {
        if ($this->SalaireEtchargeDirigentsInfo->removeElement($salaireEtchargeDirigentsInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeDirigentsInfo->getSalaireEtchargeSocialDirigents() === $this) {
                $salaireEtchargeDirigentsInfo->setSalaireEtchargeSocialDirigents(null);
            }
        }

        return $this;
    }

    public function getProjetAnnees(): ?ProjetAnnees
    {
        return $this->projetAnnees;
    }

    public function setProjetAnnees(?ProjetAnnees $projetAnnees): static
    {
        // unset the owning side of the relation if necessary
        if ($projetAnnees === null && $this->projetAnnees !== null) {
            $this->projetAnnees->setSalaireEtchargeSocialDirigents(null);
        }

        // set the owning side of the relation if necessary
        if ($projetAnnees !== null && $projetAnnees->getSalaireEtchargeSocialDirigents() !== $this) {
            $projetAnnees->setSalaireEtchargeSocialDirigents($this);
        }

        $this->projetAnnees = $projetAnnees;

        return $this;
    }

}
