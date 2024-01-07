<?php

namespace App\Entity;

use App\Repository\CollaborateurProjetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CollaborateurProjetRepository::class)]
class CollaborateurProjet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firstename = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lastname = null;

    #[ORM\Column(length: 180, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $username = null;

    #[ORM\Column]
    private array $pagePermission = [];

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $logo = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tele = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $diplome = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $role = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $caracteristique = null;

    #[ORM\ManyToMany(targetEntity: SalaireEtchargeSocial::class, inversedBy: 'collaborateurProjets')]
    private Collection $SalaireEtchargeSocial;

    #[ORM\OneToMany(mappedBy: 'CollaborateurProjet', targetEntity: SalaireEtchargeCollaborateurInfo::class)]
    private Collection $salaireEtchargeCollaborateurInfos;

    #[ORM\ManyToOne(inversedBy: 'CollaborateurProjet')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'CollaborateurProjet')]
    private ?Projet $projet = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreation = null;

    #[ORM\ManyToMany(targetEntity: SalaireEtchargeSocialDirigents::class, mappedBy: 'CollaborateurProjet')]
    private Collection $salaireEtchargeSocialDirigents;

    #[ORM\Column]
    private ?bool $Dirigeant = false;

    #[ORM\OneToMany(mappedBy: 'collaborateurProjet', targetEntity: SalaireEtchargeDirigentsInfo::class)]
    private Collection $SalaireEtchargeDirigentsInfo;

    #[ORM\Column]
    private ?bool $IsSalarie = false;

    #[ORM\Column]
    private ?bool $Equipe = false;

    public function __construct()
    {
        $this->SalaireEtchargeSocial = new ArrayCollection();
        $this->salaireEtchargeCollaborateurInfos = new ArrayCollection();
        $this->salaireEtchargeSocialDirigents = new ArrayCollection();
        $this->SalaireEtchargeDirigentsInfo = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPagePermission(): array
    {
        return $this->pagePermission;
    }

    public function setPagePermission(array $pagePermission): self
    {
        $this->pagePermission = $pagePermission;

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
     * @return Collection<int, SalaireEtchargeSocial>
     */
    public function getSalaireEtchargeSocial(): Collection
    {
        return $this->SalaireEtchargeSocial;
    }

    public function addSalaireEtchargeSocial(SalaireEtchargeSocial $salaireEtchargeSocial): self
    {
        if (!$this->SalaireEtchargeSocial->contains($salaireEtchargeSocial)) {
            $this->SalaireEtchargeSocial->add($salaireEtchargeSocial);
        }

        return $this;
    }

    public function removeSalaireEtchargeSocial(SalaireEtchargeSocial $salaireEtchargeSocial): self
    {
        $this->SalaireEtchargeSocial->removeElement($salaireEtchargeSocial);

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
            $salaireEtchargeCollaborateurInfo->setCollaborateurProjet($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeCollaborateurInfo(SalaireEtchargeCollaborateurInfo $salaireEtchargeCollaborateurInfo): self
    {
        if ($this->salaireEtchargeCollaborateurInfos->removeElement($salaireEtchargeCollaborateurInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeCollaborateurInfo->getCollaborateurProjet() === $this) {
                $salaireEtchargeCollaborateurInfo->setCollaborateurProjet(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getProjet(): ?Projet
    {
        return $this->projet;
    }

    public function setProjet(?Projet $projet): self
    {
        $this->projet = $projet;

        return $this;
    }

    public function getDateCreation()
    {
        return $this->dateCreation->format('Y-m-d');
    }

    public function setDateCreation(?\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getTele(): ?string
    {
        return $this->tele;
    }

    public function setTele(?string $tele): self
    {
        $this->tele = $tele;

        return $this;
    }

    public function getDiplome(): ?string
    {
        return $this->diplome;
    }

    public function setDiplome(?string $diplome): self
    {
        $this->diplome = $diplome;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getCaracteristique(): ?string
    {
        return $this->caracteristique;
    }

    public function setCaracteristique(?string $caracteristique): self
    {
        $this->caracteristique = $caracteristique;

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeSocialDirigents>
     */
    public function getSalaireEtchargeSocialDirigents(): Collection
    {
        return $this->salaireEtchargeSocialDirigents;
    }

    public function addSalaireEtchargeSocialDirigent(SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigent): self
    {
        if (!$this->salaireEtchargeSocialDirigents->contains($salaireEtchargeSocialDirigent)) {
            $this->salaireEtchargeSocialDirigents->add($salaireEtchargeSocialDirigent);
            $salaireEtchargeSocialDirigent->addCollaborateurProjet($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeSocialDirigent(SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigent): self
    {
        if ($this->salaireEtchargeSocialDirigents->removeElement($salaireEtchargeSocialDirigent)) {
            $salaireEtchargeSocialDirigent->removeCollaborateurProjet($this);
        }

        return $this;
    }

    public function isDirigeant(): ?bool
    {
        return $this->Dirigeant;
    }

    public function setDirigeant(?bool $Dirigeant): self
    {
        $this->Dirigeant = $Dirigeant;

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeDirigentsInfo>
     */
    public function getSalaireEtchargeDirigentsInfo(): Collection
    {
        return $this->SalaireEtchargeDirigentsInfo;
    }

    public function addSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): self
    {
        if (!$this->SalaireEtchargeDirigentsInfo->contains($salaireEtchargeDirigentsInfo)) {
            $this->SalaireEtchargeDirigentsInfo->add($salaireEtchargeDirigentsInfo);
            $salaireEtchargeDirigentsInfo->setCollaborateurProjet($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): self
    {
        if ($this->SalaireEtchargeDirigentsInfo->removeElement($salaireEtchargeDirigentsInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeDirigentsInfo->getCollaborateurProjet() === $this) {
                $salaireEtchargeDirigentsInfo->setCollaborateurProjet(null);
            }
        }

        return $this;
    }

    public function isIsSalarie(): ?bool
    {
        return $this->IsSalarie;
    }

    public function setIsSalarie(bool $IsSalarie): self
    {
        $this->IsSalarie = $IsSalarie;

        return $this;
    }

    public function isEquipe(): ?bool
    {
        return $this->Equipe;
    }

    public function setEquipe(bool $Equipe): static
    {
        $this->Equipe = $Equipe;

        return $this;
    }

    public function getFirstename(): ?string
    {
        return $this->firstename;
    }

    public function setFirstename(?string $firstename): static
    {
        $this->firstename = $firstename;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): static
    {
        $this->username = $username;

        return $this;
    }

    
}
