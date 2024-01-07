<?php

namespace App\Entity;

use App\Repository\PlanFinancementInfoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlanFinancementInfoRepository::class)]
class PlanFinancementInfo
{
    /**** Additional Information -+-Type-+- ***/
    // 0 => BESOIN
    // 1 => Investisement incorporels
    // 2 => Investisement corporels
    // 3 => Investisement financiers
    // 4 => Variation du besoin en fonds de roulements
    // 5 => Remboursement d'apports en cempte courant d'associés
    // 6 => Total des besoins
    // 7 => Ressources
    //8 => Remboursement d'emprunts
    //9 => Apport en capital
    //10 =>Apport en cempte courant d'associés

    //11=>souscription Emprunts
    //12=>capacité d'autofinancement

    //13=>Total des resources
    //14 => Variation
    //15=>sold
    
    /********************************** */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    private ?float $value = null;

    #[ORM\ManyToOne(inversedBy: 'planFinancementInfos')]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\ManyToOne(inversedBy: 'planFinancementInfos')]
    private ?ProjetAnnees $projetAnnees = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(?float $value): static
    {
        $this->value = $value;

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
