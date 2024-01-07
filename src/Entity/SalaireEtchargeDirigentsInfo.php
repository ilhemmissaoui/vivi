<?php

namespace App\Entity;

use App\Repository\SalaireEtchargeDirigentsInfoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SalaireEtchargeDirigentsInfoRepository::class)]
class SalaireEtchargeDirigentsInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $pourcentageParticipationCapital = 0;

    #[ORM\Column(length: 255, nullable: true)]
    private ?float $reparationRenumeratinAnnee = 0;

    #[ORM\Column(length: 255)]
    private ?string $beneficier = null;

    #[ORM\ManyToOne(inversedBy: 'SalaireEtchargeDirigentsInfo')]
    private ?SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigents = null;

    #[ORM\ManyToOne(inversedBy: 'SalaireEtchargeDirigentsInfo')]
    private ?CollaborateurProjet $collaborateurProjet = null;

    #[ORM\ManyToOne(inversedBy: 'salaireEtchargeDirigentsInfos')]
    private ?FinancementEtCharges $FinancementEtCharges = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPourcentageParticipationCapital(): ?int
    {
        return $this->pourcentageParticipationCapital;
    }

    public function setPourcentageParticipationCapital(?int $pourcentageParticipationCapital): self
    {
        $this->pourcentageParticipationCapital = $pourcentageParticipationCapital;

        return $this;
    }

    public function getReparationRenumeratinAnnee(): ?float
    {
        return $this->reparationRenumeratinAnnee;
    }

    public function setReparationRenumeratinAnnee(?float $reparationRenumeratinAnnee): self
    {
        $this->reparationRenumeratinAnnee = $reparationRenumeratinAnnee;

        return $this;
    }

    public function getBeneficier(): ?string
    {
        return $this->beneficier;
    }

    public function setBeneficier(string $beneficier): self
    {
        $this->beneficier = $beneficier;

        return $this;
    }

    public function getSalaireEtchargeSocialDirigents(): ?SalaireEtchargeSocialDirigents
    {
        return $this->salaireEtchargeSocialDirigents;
    }

    public function setSalaireEtchargeSocialDirigents(?SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigents): self
    {
        $this->salaireEtchargeSocialDirigents = $salaireEtchargeSocialDirigents;

        return $this;
    }

    public function getCollaborateurProjet(): ?CollaborateurProjet
    {
        return $this->collaborateurProjet;
    }

    public function setCollaborateurProjet(?CollaborateurProjet $collaborateurProjet): self
    {
        $this->collaborateurProjet = $collaborateurProjet;

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
