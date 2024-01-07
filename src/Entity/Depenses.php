<?php

namespace App\Entity;

use App\Repository\DepensesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DepensesRepository::class)]
class Depenses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'depenses', targetEntity: ChargeExt::class)]
    private Collection $chargeExt;

    public function __construct()
    {
        $this->chargeExt = new ArrayCollection();
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

    /**
     * @return Collection<int, ChargeExt>
     */
    public function getChargeExt(): Collection
    {
        return $this->chargeExt;
    }

    public function addChargeExt(ChargeExt $chargeExt): self
    {
        if (!$this->chargeExt->contains($chargeExt)) {
            $this->chargeExt->add($chargeExt);
            $chargeExt->setDepenses($this);
        }

        return $this;
    }

    public function removeChargeExt(ChargeExt $chargeExt): self
    {
        if ($this->chargeExt->removeElement($chargeExt)) {
            // set the owning side to null (unless already changed)
            if ($chargeExt->getDepenses() === $this) {
                $chargeExt->setDepenses(null);
            }
        }

        return $this;
    }
}