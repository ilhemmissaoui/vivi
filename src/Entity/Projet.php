<?php

namespace App\Entity;

use App\Repository\ProjetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjetRepository::class)]
class Projet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateCreation = null;

    #[ORM\ManyToOne(inversedBy: 'projets')]
    private ?Instance $instance = null;

    #[ORM\OneToOne(mappedBy: 'projet', cascade: ['persist', 'remove'])]
    private ?BusinesModel $businesModel = null;

    #[ORM\OneToOne(mappedBy: 'projet', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $couleurPrincipal = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $couleurSecondaire = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $couleurMenu = null;

    #[ORM\Column(length: 255)]
    private ?string $slogan = null;

    #[ORM\Column(length: 255)]
    private ?string $adressSiegeSocial = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $siret = null;

    #[ORM\Column(length: 255)]
    private ?string $codePostal = null;


    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $logo = null;

    #[ORM\OneToMany(mappedBy: 'projet', targetEntity: CollaborateurProjet::class)]
    private Collection $CollaborateurProjet;

    #[ORM\OneToMany(mappedBy: 'projet', targetEntity: ProjetAnnees::class)]
    private Collection $projetAnnees;


    public function __construct()
    {

        $this->CollaborateurProjet = new ArrayCollection();
        $this->projetAnnees = new ArrayCollection();
        
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

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }
    public function getInstance(): ?Instance
    {
        return $this->instance;
    }

    public function setInstance(?Instance $instance): self
    {
        $this->instance = $instance;

        return $this;
    }

    public function getBusinesModel(): ?BusinesModel
    {
        return $this->businesModel;
    }

    public function setBusinesModel(?BusinesModel $businesModel): self
    {
        // unset the owning side of the relation if necessary
        if ($businesModel === null && $this->businesModel !== null) {
            $this->businesModel->setProjet(null);
        }

        // set the owning side of the relation if necessary
        if ($businesModel !== null && $businesModel->getProjet() !== $this) {
            $businesModel->setProjet($this);
        }

        $this->businesModel = $businesModel;

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
            $this->businessPlan->setProjet(null);
        }

        // set the owning side of the relation if necessary
        if ($businessPlan !== null && $businessPlan->getProjet() !== $this) {
            $businessPlan->setProjet($this);
        }

        $this->businessPlan = $businessPlan;

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

    public function __toString(): string
    {
        return (string) $this->name;
    }

    public function getCouleurPrincipal(): ?string
    {
        return $this->couleurPrincipal;
    }

    public function setCouleurPrincipal(?string $couleurPrincipal): self
    {
        $this->couleurPrincipal = $couleurPrincipal;

        return $this;
    }

    public function getCouleurSecondaire(): ?string
    {
        return $this->couleurSecondaire;
    }

    public function setCouleurSecondaire(?string $couleurSecondaire): self
    {
        $this->couleurSecondaire = $couleurSecondaire;

        return $this;
    }

    public function getCouleurMenu(): ?string
    {
        return $this->couleurMenu;
    }

    public function setCouleurMenu(?string $couleurMenu): self
    {
        $this->couleurMenu = $couleurMenu;

        return $this;
    }

    public function getSlogan(): ?string
    {
        return $this->slogan;
    }

    public function setSlogan(string $slogan): self
    {
        $this->slogan = $slogan;

        return $this;
    }

    public function getAdressSiegeSocial(): ?string
    {
        return $this->adressSiegeSocial;
    }

    public function setAdressSiegeSocial(string $adressSiegeSocial): self
    {
        $this->adressSiegeSocial = $adressSiegeSocial;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

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
            $collaborateurProjet->setProjet($this);
        }

        return $this;
    }

    public function removeCollaborateurProjet(CollaborateurProjet $collaborateurProjet): self
    {
        if ($this->CollaborateurProjet->removeElement($collaborateurProjet)) {
            // set the owning side to null (unless already changed)
            if ($collaborateurProjet->getProjet() === $this) {
                $collaborateurProjet->setProjet(null);
            }
        }

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
            $projetAnnee->setProjet($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->projetAnnees->removeElement($projetAnnee)) {
            // set the owning side to null (unless already changed)
            if ($projetAnnee->getProjet() === $this) {
                $projetAnnee->setProjet(null);
            }
        }

        return $this;
    }

}
