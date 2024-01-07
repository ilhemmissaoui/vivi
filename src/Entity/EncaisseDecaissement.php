<?php

namespace App\Entity;

use App\Repository\EncaisseDecaissementRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EncaisseDecaissementRepository::class)]
class EncaisseDecaissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'EncaisseDecaissement')]
    private ?FinancementEtCharges $financementEtCharges = null;

    #[ORM\OneToOne(mappedBy: 'EncaisseDecaissement', cascade: ['persist', 'remove'])]
    private ?MontheListeEncaisseDecaissement $montheListeEncaisseDecaissement = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\ManyToOne(inversedBy: 'EncaisseDecaissement')]
    private ?FinancementEncaisseDecaissement $financementEncaisseDecaissement = null;

    #[ORM\ManyToOne(inversedBy: 'EncaisseDecaissement')]
    private ?ProjetAnnees $projetAnnees = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->financementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $financementEtCharges): static
    {
        $this->financementEtCharges = $financementEtCharges;

        return $this;
    }

    public function getMontheListeEncaisseDecaissement(): ?MontheListeEncaisseDecaissement
    {
        return $this->montheListeEncaisseDecaissement;
    }

    public function setMontheListeEncaisseDecaissement(?MontheListeEncaisseDecaissement $montheListeEncaisseDecaissement): static
    {
        // unset the owning side of the relation if necessary
        if ($montheListeEncaisseDecaissement === null && $this->montheListeEncaisseDecaissement !== null) {
            $this->montheListeEncaisseDecaissement->setEncaisseDecaissement(null);
        }

        // set the owning side of the relation if necessary
        if ($montheListeEncaisseDecaissement !== null && $montheListeEncaisseDecaissement->getEncaisseDecaissement() !== $this) {
            $montheListeEncaisseDecaissement->setEncaisseDecaissement($this);
        }

        $this->montheListeEncaisseDecaissement = $montheListeEncaisseDecaissement;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(int $deleted): static
    {
        $this->deleted = $deleted;

        return $this;
    }

    public function getFinancementEncaisseDecaissement(): ?FinancementEncaisseDecaissement
    {
        return $this->financementEncaisseDecaissement;
    }

    public function setFinancementEncaisseDecaissement(?FinancementEncaisseDecaissement $financementEncaisseDecaissement): static
    {
        $this->financementEncaisseDecaissement = $financementEncaisseDecaissement;

        return $this;
    }

    public function getProjetAnnees(): ?ProjetAnnees
    {
        return $this->projetAnnees;
    }

    public function setProjetAnnees(?ProjetAnnees $projetAnnees): static
    {
        $this->projetAnnees = $projetAnnees;

        return $this;
    }
}
