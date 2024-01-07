<?php

namespace App\Entity;

use App\Repository\SalaireEtchargeCollaborateurInfoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SalaireEtchargeCollaborateurInfoRepository::class)]
class SalaireEtchargeCollaborateurInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $salaireBrut = null;

    #[ORM\Column(length: 255,nullable: true)]
    private ?string $typeContrat = null;

    #[ORM\Column(nullable: true)]
    private ?float $chargeSocial = 0;

    #[ORM\ManyToOne(inversedBy: 'salaireEtchargeCollaborateurInfos')]
    private ?CollaborateurProjet $CollaborateurProjet = null;

    #[ORM\ManyToOne(inversedBy: 'salaireEtchargeCollaborateurInfos')]
    private ?SalaireEtchargeSocial $SalaireEtchargeSocial = null;

    #[ORM\ManyToOne(inversedBy: 'salaireEtchargeCollaborateurInfos')]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSalaireBrut(): ?float
    {
        return $this->salaireBrut;
    }

    public function setSalaireBrut(?float $salaireBrut): self
    {
        $this->salaireBrut = $salaireBrut;

        return $this;
    }

    public function getTypeContrat(): ?string
    {
        return $this->typeContrat;
    }

    public function setTypeContrat(string $typeContrat): self
    {
        $this->typeContrat = $typeContrat;

        return $this;
    }

    public function getChargeSocial(): ?float
    {
        return $this->chargeSocial;
    }

    public function setChargeSocial(?float $chargeSocial): self
    {
        $this->chargeSocial = $chargeSocial;

        return $this;
    }

    public function getCollaborateurProjet(): ?CollaborateurProjet
    {
        return $this->CollaborateurProjet;
    }

    public function setCollaborateurProjet(?CollaborateurProjet $CollaborateurProjet): self
    {
        $this->CollaborateurProjet = $CollaborateurProjet;

        return $this;
    }

    public function getSalaireEtchargeSocial(): ?SalaireEtchargeSocial
    {
        return $this->SalaireEtchargeSocial;
    }

    public function setSalaireEtchargeSocial(?SalaireEtchargeSocial $SalaireEtchargeSocial): self
    {
        $this->SalaireEtchargeSocial = $SalaireEtchargeSocial;

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
}
