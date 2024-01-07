<?php

namespace App\Entity;

use App\Repository\FinancementEncaisseDecaissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FinancementEncaisseDecaissementRepository::class)]
class FinancementEncaisseDecaissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'financementEncaisseDecaissement', targetEntity: ProjetAnnees::class)]
    private Collection $anneeProjet;

    #[ORM\OneToMany(mappedBy: 'financementEncaisseDecaissement', targetEntity: EncaisseDecaissement::class)]
    private Collection $EncaisseDecaissement;

    #[ORM\OneToOne(inversedBy: 'financementEncaisseDecaissement', cascade: ['persist', 'remove'])]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\Column(nullable: true)]
    private ?int $avancement = 0;

    public function __construct()
    {
        $this->anneeProjet = new ArrayCollection();
        $this->EncaisseDecaissement = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
            $anneeProjet->setFinancementEncaisseDecaissement($this);
        }

        return $this;
    }

    public function removeAnneeProjet(ProjetAnnees $anneeProjet): static
    {
        if ($this->anneeProjet->removeElement($anneeProjet)) {
            // set the owning side to null (unless already changed)
            if ($anneeProjet->getFinancementEncaisseDecaissement() === $this) {
                $anneeProjet->setFinancementEncaisseDecaissement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, EncaisseDecaissement>
     */
    public function getEncaisseDecaissement(): Collection
    {
        return $this->EncaisseDecaissement;
    }

    public function addEncaisseDecaissement(EncaisseDecaissement $encaisseDecaissement): static
    {
        if (!$this->EncaisseDecaissement->contains($encaisseDecaissement)) {
            $this->EncaisseDecaissement->add($encaisseDecaissement);
            $encaisseDecaissement->setFinancementEncaisseDecaissement($this);
        }

        return $this;
    }

    public function removeEncaisseDecaissement(EncaisseDecaissement $encaisseDecaissement): static
    {
        if ($this->EncaisseDecaissement->removeElement($encaisseDecaissement)) {
            // set the owning side to null (unless already changed)
            if ($encaisseDecaissement->getFinancementEncaisseDecaissement() === $this) {
                $encaisseDecaissement->setFinancementEncaisseDecaissement(null);
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
