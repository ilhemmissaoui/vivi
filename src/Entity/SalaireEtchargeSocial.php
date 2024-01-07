<?php

namespace App\Entity;

use App\Repository\SalaireEtchargeSocialRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SalaireEtchargeSocialRepository::class)]
class SalaireEtchargeSocial
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'salaireEtchargeSocial')]
    private ?FinancementEtCharges $financementEtCharges = null;


    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\ManyToMany(targetEntity: CollaborateurProjet::class, mappedBy: 'SalaireEtchargeSocial')]
    private Collection $collaborateurProjets;

    #[ORM\OneToMany(mappedBy: 'SalaireEtchargeSocial', targetEntity: SalaireEtchargeCollaborateurInfo::class)]
    private Collection $salaireEtchargeCollaborateurInfos;

    #[ORM\OneToOne(mappedBy: 'SalaireEtchargeSocial', cascade: ['persist', 'remove'])]
    private ?ProjetAnnees $projetAnnees = null;

    #[ORM\ManyToOne(inversedBy: 'SalaireEtchargeSocial')]

    public function __construct()
    {
        $this->collaborateurProjets = new ArrayCollection();
        $this->salaireEtchargeCollaborateurInfos = new ArrayCollection();
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
     * @return Collection<int, CollaborateurProjet>
     */
    public function getCollaborateurProjets(): Collection
    {
        return $this->collaborateurProjets;
    }

    public function addCollaborateurProjet(CollaborateurProjet $collaborateurProjet): self
    {
        if (!$this->collaborateurProjets->contains($collaborateurProjet)) {
            $this->collaborateurProjets->add($collaborateurProjet);
            $collaborateurProjet->addSalaireEtchargeSocial($this);
        }

        return $this;
    }

    public function removeCollaborateurProjet(CollaborateurProjet $collaborateurProjet): self
    {
        if ($this->collaborateurProjets->removeElement($collaborateurProjet)) {
            $collaborateurProjet->removeSalaireEtchargeSocial($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeCollaborateurInfo>
     */
    public function getSalaireEtchargeCollaborateurInfos(): Collection
    {
        return $this->salaireEtchargeCollaborateurInfos;
    }

    public function addSalaireEtchargeCollaborateurInfo(SalaireEtchargeCollaborateurInfo $salaireEtchargeCollaborateurInfo): self
    {
        if (!$this->salaireEtchargeCollaborateurInfos->contains($salaireEtchargeCollaborateurInfo)) {
            $this->salaireEtchargeCollaborateurInfos->add($salaireEtchargeCollaborateurInfo);
            $salaireEtchargeCollaborateurInfo->setSalaireEtchargeSocial($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeCollaborateurInfo(SalaireEtchargeCollaborateurInfo $salaireEtchargeCollaborateurInfo): self
    {
        if ($this->salaireEtchargeCollaborateurInfos->removeElement($salaireEtchargeCollaborateurInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeCollaborateurInfo->getSalaireEtchargeSocial() === $this) {
                $salaireEtchargeCollaborateurInfo->setSalaireEtchargeSocial(null);
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
            $this->projetAnnees->setSalaireEtchargeSocial(null);
        }

        // set the owning side of the relation if necessary
        if ($projetAnnees !== null && $projetAnnees->getSalaireEtchargeSocial() !== $this) {
            $projetAnnees->setSalaireEtchargeSocial($this);
        }

        $this->projetAnnees = $projetAnnees;

        return $this;
    }
    
}
