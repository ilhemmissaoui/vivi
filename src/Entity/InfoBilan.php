<?php

namespace App\Entity;

use App\Repository\InfoBilanRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InfoBilanRepository::class)]
class InfoBilan
{
    /**** Information de bilan -+-Type-+- ***/
    
    // 0 => Stoks   
    // 1 => Clients   
    // 2 => Capitale   
    // 3 => Réserve et report a nouveau	   
    // 4 => Forniseurs   
    // 5 => Dettes fiscales	   
    // 6 => Dette sociales	
    // 7 => Capiteau Propres	
    // 8 => DETTES	   

    /*******************************************/
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'infoBilans')]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\ManyToOne(inversedBy: 'infoBilans')]
    private ?ProjetAnnees $ProjetAnnees = null;
    #[ORM\Column]
    private ?string $type = null;

    #[ORM\Column]
    private ?float $valeur = 0;

    public function getId(): ?int
    {
        return $this->id;
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
        return $this->ProjetAnnees;
    }

    public function setProjetAnnees(?ProjetAnnees $ProjetAnnees): static
    {
        $this->ProjetAnnees = $ProjetAnnees;

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

    public function getValeur(): ?float
    {
        return $this->valeur;
    }

    public function setValeur(float $valeur): static
    {
        $this->valeur = $valeur;

        return $this;
    }
}
