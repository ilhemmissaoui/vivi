<?php

namespace App\Entity;

use App\Repository\SocieteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SocieteRepository::class)]
class Societe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $pointFort = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $pointFaible = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $directIndirect = null;

    #[ORM\Column(nullable: true)]
    private ?string $taille = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $effectif = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $CA = null;

    #[ORM\ManyToOne(inversedBy: 'societe')]
    private ?MarcheEtConcurrence $marcheEtConcurrence = null;

    #[ORM\Column(length: 255)]
    private ?string $deleted = "0";

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $logo = null;

    #[ORM\OneToMany(mappedBy: 'societe', targetEntity: Concurrents::class)]
    private Collection $Concurrents;

    #[ORM\ManyToOne(inversedBy: 'societes')]
    private ?PositionnementConcurrentiel $positionnementConcurrentiel = null;

    #[ORM\Column]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->Concurrents = new ArrayCollection();
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

    public function getPointFort(): ?string
    {
        return $this->pointFort;
    }

    public function setPointFort(?string $pointFort): self
    {
        $this->pointFort = $pointFort;

        return $this;
    }

    public function getPointFaible(): ?string
    {
        return $this->pointFaible;
    }

    public function setPointFaible(?string $pointFaible): self
    {
        $this->pointFaible = $pointFaible;

        return $this;
    }

    public function getDirectIndirect(): ?string
    {
        return $this->directIndirect;
    }

    public function setDirectIndirect(?string $directIndirect): self
    {
        $this->directIndirect = $directIndirect;

        return $this;
    }

    public function getTaille(): ?string
    {
        return $this->taille;
    }

    public function setTaille(?string $taille): self
    {
        $this->taille = $taille;

        return $this;
    }

    public function getEffectif(): ?string
    {
        return $this->effectif;
    }

    public function setEffectif(?string $effectif): self
    {
        $this->effectif = $effectif;

        return $this;
    }

    public function getCA(): ?string
    {
        return $this->CA;
    }

    public function setCA(string $CA): self
    {
        $this->CA = $CA;

        return $this;
    }

    public function getMarcheEtConcurrence(): ?MarcheEtConcurrence
    {
        return $this->marcheEtConcurrence;
    }

    public function setMarcheEtConcurrence(?MarcheEtConcurrence $marcheEtConcurrence): self
    {
        $this->marcheEtConcurrence = $marcheEtConcurrence;

        return $this;
    }
    
    public function getDeleted(): ?string
    {
        return $this->deleted;
    }

    public function setDeleted(?string $deleted): self
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
     * @return Collection<int, Concurrents>
     */
    public function getConcurrents(): Collection
    {
        return $this->Concurrents;
    }

    public function addConcurrent(Concurrents $concurrent): self
    {
        if (!$this->Concurrents->contains($concurrent)) {
            $this->Concurrents->add($concurrent);
            $concurrent->setSociete($this);
        }

        return $this;
    }

    public function removeConcurrent(Concurrents $concurrent): self
    {
        if ($this->Concurrents->removeElement($concurrent)) {
            // set the owning side to null (unless already changed)
            if ($concurrent->getSociete() === $this) {
                $concurrent->setSociete(null);
            }
        }

        return $this;
    }

    public function getPositionnementConcurrentiel(): ?PositionnementConcurrentiel
    {
        return $this->positionnementConcurrentiel;
    }

    public function setPositionnementConcurrentiel(?PositionnementConcurrentiel $positionnementConcurrentiel): static
    {
        $this->positionnementConcurrentiel = $positionnementConcurrentiel;

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
