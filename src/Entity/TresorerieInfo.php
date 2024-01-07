<?php

namespace App\Entity;

use App\Repository\TresorerieInfoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TresorerieInfoRepository::class)]
class TresorerieInfo
{
    /**** Additional Information -+-Type-+- ***/
    // 0 => apports
    // 1 => C/C d'associe
    // 2 => Souscription d'emprunts
    // 3 => charges sociales
    // 4 => TVA
    // 6 => investissement    
    // 7 => Achats    
    // 8 => Frais genereaux    
    // 9 => salaire dirigeant    
    // 10 => charge sociale dirigeants    
    // 11 => salaire du collaborateurs    
    // 12 => charege sociales collaborateurs     
    // 13 => TVA a Payer    
    // 14 => IS    
    // 15 => Autres impots et taxes    
    // 16 => C/C d'associe (Encaissement)   
    // 17 => Echeance d'emprunt    
    // 18 => Variation    
    // 19 => Solde    
    
    
    /*******************************************/
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;
    #[ORM\Column]
    private ?float $Jan = 0;

    #[ORM\Column]
    private ?float $Frv = 0;

    #[ORM\Column]
    private ?float $Mar = 0;

    #[ORM\Column]
    private ?float $Avr = 0;

    #[ORM\Column]
    private ?float $Mai = 0;

    #[ORM\Column]
    private ?float $Juin = 0;

    #[ORM\Column]
    private ?float $Juil = 0;

    #[ORM\Column]
    private ?float $Aou = 0;

    #[ORM\Column]
    private ?float $Sept = 0;

    #[ORM\Column]
    private ?float $Oct = 0;

    #[ORM\Column]
    private ?float $Nov = 0;

    #[ORM\Column]
    private ?float $Dece = 0;

    #[ORM\ManyToOne(inversedBy: 'TresorerieInfos')]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\ManyToOne(inversedBy: 'TresorerieInfo')]
    private ?ProjetAnnees $projetAnnees = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getFinancementEtCharges(): ?FinancementEtCharges
    {
        return $this->FinancementEtCharges;
    }

    public function setFinancementEtCharges(?FinancementEtCharges $FinancementEtCharges): static
    {
        $this->FinancementEtCharges = $FinancementEtCharges;

        return $this;
    }

    public function getJan(): ?float
    {
        return $this->Jan;
    }

    public function setJan(float $Jan): static
    {
        $this->Jan = $Jan;

        return $this;
    }

    public function getFrv(): ?float
    {
        return $this->Frv;
    }

    public function setFrv(float $Frv): static
    {
        $this->Frv = $Frv;

        return $this;
    }

    public function getMar(): ?float
    {
        return $this->Mar;
    }

    public function setMar(float $Mar): static
    {
        $this->Mar = $Mar;

        return $this;
    }

    public function getAvr(): ?float
    {
        return $this->Avr;
    }

    public function setAvr(float $Avr): static
    {
        $this->Avr = $Avr;

        return $this;
    }

    public function getMai(): ?float
    {
        return $this->Mai;
    }

    public function setMai(float $Mai): static
    {
        $this->Mai = $Mai;

        return $this;
    }

    public function getJuin(): ?float
    {
        return $this->Juin;
    }

    public function setJuin(float $Juin): static
    {
        $this->Juin = $Juin;

        return $this;
    }

    public function getJuil(): ?float
    {
        return $this->Juil;
    }

    public function setJuil(float $Juil): static
    {
        $this->Juil = $Juil;

        return $this;
    }

    public function getAou(): ?float
    {
        return $this->Aou;
    }

    public function setAou(float $Aou): static
    {
        $this->Aou = $Aou;

        return $this;
    }

    public function getSept(): ?float
    {
        return $this->Sept;
    }

    public function setSept(float $Sept): static
    {
        $this->Sept = $Sept;

        return $this;
    }

    public function getOct(): ?float
    {
        return $this->Oct;
    }

    public function setOct(float $Oct): static
    {
        $this->Oct = $Oct;

        return $this;
    }

    public function getNov(): ?float
    {
        return $this->Nov;
    }

    public function setNov(float $Nov): static
    {
        $this->Nov = $Nov;

        return $this;
    }

    public function getDece(): ?float
    {
        return $this->Dece;
    }

    public function setDece(float $Dece): static
    {
        $this->Dece = $Dece;

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
