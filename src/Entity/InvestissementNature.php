<?php

namespace App\Entity;

use App\Repository\InvestissementNatureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvestissementNatureRepository::class)]
class InvestissementNature
{
    const NatureType = [
        "0"=>'Investissement incorporels', 
        "1"=>'Investissement corporels',
        "2" =>'Investissement financiers'
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'investissementNature', targetEntity: Investissement::class)]
    private Collection $Investissement;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    public function __construct()
    {
        $this->Investissement = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Investissement>
     */
    public function getInvestissement(): Collection
    {
        return $this->Investissement;
    }

    public function addInvestissement(Investissement $investissement): static
    {
        if (!$this->Investissement->contains($investissement)) {
            $this->Investissement->add($investissement);
            $investissement->setInvestissementNature($this);
        }

        return $this;
    }

    public function removeInvestissement(Investissement $investissement): static
    {
        if ($this->Investissement->removeElement($investissement)) {
            // set the owning side to null (unless already changed)
            if ($investissement->getInvestissementNature() === $this) {
                $investissement->setInvestissementNature(null);
            }
        }

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
}
