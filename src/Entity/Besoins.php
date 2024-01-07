<?php

namespace App\Entity;

use App\Repository\BesoinsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BesoinsRepository::class)]
class Besoins
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $position = null;

    #[ORM\OneToMany(mappedBy: 'besoins', targetEntity: Concurrents::class)]
    private Collection $concurrents;

    #[ORM\ManyToOne(inversedBy: 'Besoin')]
    private ?PositionnementConcurrentiel $positionnementConcurrentiel = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    public function __construct()
    {
        $this->concurrents = new ArrayCollection();
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

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

        return $this;
    }
    
    /**
     * @return Collection<int, Concurrents>
     */
    public function getConcurrents(): Collection
    {
        return $this->concurrents;
    }

    public function addConcurrent(Concurrents $concurrent): self
    {
        if (!$this->concurrents->contains($concurrent)) {
            $this->concurrents->add($concurrent);
            $concurrent->setBesoins($this);
        }

        return $this;
    }

    public function removeConcurrent(Concurrents $concurrent): self
    {
        if ($this->concurrents->removeElement($concurrent)) {
            // set the owning side to null (unless already changed)
            if ($concurrent->getBesoins() === $this) {
                $concurrent->setBesoins(null);
            }
        }

        return $this;
    }

    public function getPositionnementConcurrentiel(): ?PositionnementConcurrentiel
    {
        return $this->positionnementConcurrentiel;
    }

    public function setPositionnementConcurrentiel(?PositionnementConcurrentiel $positionnementConcurrentiel): self
    {
        $this->positionnementConcurrentiel = $positionnementConcurrentiel;

        return $this;
    }

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(int $deleted): self
    {
        $this->deleted = $deleted;

        return $this;
    }
}
