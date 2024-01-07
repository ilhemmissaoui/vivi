<?php

namespace App\Entity;

use App\Repository\ProjetAnneesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjetAnneesRepository::class)]
class ProjetAnnees
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $annee = null;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: MonthListeChiffreAffaire::class)]
    private Collection $MonthListeChiffreAffaire;

    #[ORM\ManyToOne(inversedBy: 'projetAnnees')]
    private ?FinancementEtCharges $FinancementEtCharges = null;

    #[ORM\Column]
    private ?int $deleted = 0;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: MonthChargeExt::class)]
    private Collection $MonthChargeExt;

    #[ORM\OneToOne(inversedBy: 'projetAnnees', cascade: ['persist', 'remove'])]
    private ?SalaireEtchargeSocial $SalaireEtchargeSocial = null;

    #[ORM\OneToOne(inversedBy: 'projetAnnees', cascade: ['persist', 'remove'])]
    private ?SalaireEtchargeSocialDirigents $SalaireEtchargeSocialDirigents = null;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: MontheListeEncaisseDecaissement::class)]
    private Collection $MontheListeEncaisseDecaissement;

    #[ORM\ManyToOne(inversedBy: 'anneeProjet')]
    private ?FinancementEncaisseDecaissement $financementEncaisseDecaissement = null;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: EncaisseDecaissement::class)]
    private Collection $EncaisseDecaissement;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: Investissement::class)]
    private Collection $Investissement;

    #[ORM\ManyToOne(inversedBy: 'ProjetAnnees')]
    private ?FinancementInvestissement $financementInvestissement = null;

    #[ORM\ManyToOne(inversedBy: 'ProjetAnnees')]
    private ?FinancementChiffreAffaire $financementChiffreAffaire = null;

    #[ORM\ManyToOne(inversedBy: 'anneeProjet')]
    private ?FinancementDepense $financementDepense = null;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: TresorerieInfo::class)]
    private Collection $TresorerieInfo;

    #[ORM\ManyToOne(inversedBy: 'projetAnnees')]
    private ?Projet $projet = null;

    #[ORM\ManyToOne(inversedBy: 'anneeProjet')]
    private ?NotreSolution $notreSolution = null;

    #[ORM\ManyToOne(inversedBy: 'ProjetAnnees')]
    private ?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan = null;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: VisionStrategies::class)]
    private Collection $VisionStrategies;

    #[ORM\OneToMany(mappedBy: 'ProjetAnnees', targetEntity: InfoBilan::class)]
    private Collection $infoBilans;

    #[ORM\OneToMany(mappedBy: 'projetAnnees', targetEntity: PlanFinancementInfo::class)]
    private Collection $planFinancementInfos;

    #[ORM\ManyToMany(targetEntity: Solution::class, inversedBy: 'projetAnnees')]
    private Collection $solutions;


    public function __construct()
    {
        $this->MonthListeChiffreAffaire = new ArrayCollection();
        $this->MonthChargeExt = new ArrayCollection();
        $this->MontheListeEncaisseDecaissement = new ArrayCollection();
        $this->EncaisseDecaissement = new ArrayCollection();
        $this->Investissement = new ArrayCollection();
        $this->TresorerieInfo = new ArrayCollection();
        $this->VisionStrategies = new ArrayCollection();
        $this->infoBilans = new ArrayCollection();
        $this->planFinancementInfos = new ArrayCollection();
        $this->solutions = new ArrayCollection();
 
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnnee(): ?string
    {
        return $this->annee;
    }

    public function setAnnee(string $annee): static
    {
        $this->annee = $annee;

        return $this;
    }

    /**
     * @return Collection<int, MonthListeChiffreAffaire>
     */
    public function getMonthListeChiffreAffaire(): Collection
    {
        return $this->MonthListeChiffreAffaire;
    }

    public function addMonthListeChiffreAffaire(MonthListeChiffreAffaire $monthListeChiffreAffaire): static
    {
        if (!$this->MonthListeChiffreAffaire->contains($monthListeChiffreAffaire)) {
            $this->MonthListeChiffreAffaire->add($monthListeChiffreAffaire);
            $monthListeChiffreAffaire->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeMonthListeChiffreAffaire(MonthListeChiffreAffaire $monthListeChiffreAffaire): static
    {
        if ($this->MonthListeChiffreAffaire->removeElement($monthListeChiffreAffaire)) {
            // set the owning side to null (unless already changed)
            if ($monthListeChiffreAffaire->getProjetAnnees() === $this) {
                $monthListeChiffreAffaire->setProjetAnnees(null);
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

    public function getDeleted(): ?int
    {
        return $this->deleted;
    }

    public function setDeleted(int $deleted): static
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * @return Collection<int, MonthChargeExt>
     */
    public function getMonthChargeExt(): Collection
    {
        return $this->MonthChargeExt;
    }

    public function addMonthChargeExt(MonthChargeExt $monthChargeExt): static
    {
        if (!$this->MonthChargeExt->contains($monthChargeExt)) {
            $this->MonthChargeExt->add($monthChargeExt);
            $monthChargeExt->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeMonthChargeExt(MonthChargeExt $monthChargeExt): static
    {
        if ($this->MonthChargeExt->removeElement($monthChargeExt)) {
            // set the owning side to null (unless already changed)
            if ($monthChargeExt->getProjetAnnees() === $this) {
                $monthChargeExt->setProjetAnnees(null);
            }
        }

        return $this;
    }

    public function getSalaireEtchargeSocial(): ?SalaireEtchargeSocial
    {
        return $this->SalaireEtchargeSocial;
    }

    public function setSalaireEtchargeSocial(?SalaireEtchargeSocial $SalaireEtchargeSocial): static
    {
        $this->SalaireEtchargeSocial = $SalaireEtchargeSocial;

        return $this;
    }

    public function getSalaireEtchargeSocialDirigents(): ?SalaireEtchargeSocialDirigents
    {
        return $this->SalaireEtchargeSocialDirigents;
    }

    public function setSalaireEtchargeSocialDirigents(?SalaireEtchargeSocialDirigents $SalaireEtchargeSocialDirigents): static
    {
        $this->SalaireEtchargeSocialDirigents = $SalaireEtchargeSocialDirigents;

        return $this;
    }

 

    /**
     * @return Collection<int, MontheListeEncaisseDecaissement>
     */
    public function getMontheListeEncaisseDecaissement(): Collection
    {
        return $this->MontheListeEncaisseDecaissement;
    }

    public function addMontheListeEncaissement(MontheListeEncaisseDecaissement $montheListeEncaissement): static
    {
        if (!$this->MontheListeEncaisseDecaissement->contains($montheListeEncaissement)) {
            $this->MontheListeEncaisseDecaissement->add($montheListeEncaissement);
            $montheListeEncaissement->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeMontheListeEncaissement(MontheListeEncaisseDecaissement $montheListeEncaissement): static
    {
        if ($this->MontheListeEncaisseDecaissement->removeElement($montheListeEncaissement)) {
            // set the owning side to null (unless already changed)
            if ($montheListeEncaissement->getProjetAnnees() === $this) {
                $montheListeEncaissement->setProjetAnnees(null);
            }
        }

        return $this;
    }

    public function addMontheListeEncaisseDecaissement(MontheListeEncaisseDecaissement $montheListeEncaisseDecaissement): static
    {
        if (!$this->MontheListeEncaisseDecaissement->contains($montheListeEncaisseDecaissement)) {
            $this->MontheListeEncaisseDecaissement->add($montheListeEncaisseDecaissement);
            $montheListeEncaisseDecaissement->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeMontheListeEncaisseDecaissement(MontheListeEncaisseDecaissement $montheListeEncaisseDecaissement): static
    {
        if ($this->MontheListeEncaisseDecaissement->removeElement($montheListeEncaisseDecaissement)) {
            // set the owning side to null (unless already changed)
            if ($montheListeEncaisseDecaissement->getProjetAnnees() === $this) {
                $montheListeEncaisseDecaissement->setProjetAnnees(null);
            }
        }

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
            $encaisseDecaissement->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeEncaisseDecaissement(EncaisseDecaissement $encaisseDecaissement): static
    {
        if ($this->EncaisseDecaissement->removeElement($encaisseDecaissement)) {
            // set the owning side to null (unless already changed)
            if ($encaisseDecaissement->getProjetAnnees() === $this) {
                $encaisseDecaissement->setProjetAnnees(null);
            }
        }

        return $this;
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
            $investissement->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeInvestissement(Investissement $investissement): static
    {
        if ($this->Investissement->removeElement($investissement)) {
            // set the owning side to null (unless already changed)
            if ($investissement->getProjetAnnees() === $this) {
                $investissement->setProjetAnnees(null);
            }
        }

        return $this;
    }

    public function getFinancementInvestissement(): ?FinancementInvestissement
    {
        return $this->financementInvestissement;
    }

    public function setFinancementInvestissement(?FinancementInvestissement $financementInvestissement): static
    {
        $this->financementInvestissement = $financementInvestissement;

        return $this;
    }

    public function getFinancementChiffreAffaire(): ?FinancementChiffreAffaire
    {
        return $this->financementChiffreAffaire;
    }

    public function setFinancementChiffreAffaire(?FinancementChiffreAffaire $financementChiffreAffaire): static
    {
        $this->financementChiffreAffaire = $financementChiffreAffaire;

        return $this;
    }

    public function getFinancementDepense(): ?FinancementDepense
    {
        return $this->financementDepense;
    }

    public function setFinancementDepense(?FinancementDepense $financementDepense): static
    {
        $this->financementDepense = $financementDepense;

        return $this;
    }

    /**
     * @return Collection<int, TresorerieInfo>
     */
    public function getTresorerieInfo(): Collection
    {
        return $this->TresorerieInfo;
    }

    public function addTresorerieInfo(TresorerieInfo $TresorerieInfo): static
    {
        if (!$this->TresorerieInfo->contains($TresorerieInfo)) {
            $this->TresorerieInfo->add($TresorerieInfo);
            $TresorerieInfo->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeTresorerieInfo(TresorerieInfo $TresorerieInfo): static
    {
        if ($this->TresorerieInfo->removeElement($TresorerieInfo)) {
            // set the owning side to null (unless already changed)
            if ($TresorerieInfo->getProjetAnnees() === $this) {
                $TresorerieInfo->setProjetAnnees(null);
            }
        }

        return $this;
    }

    public function getProjet(): ?Projet
    {
        return $this->projet;
    }

    public function setProjet(?Projet $projet): static
    {
        $this->projet = $projet;

        return $this;
    }

    public function getNotreSolution(): ?NotreSolution
    {
        return $this->notreSolution;
    }

    public function setNotreSolution(?NotreSolution $notreSolution): static
    {
        $this->notreSolution = $notreSolution;

        return $this;
    }

    public function getVisionStrategiesForBusinessPlan(): ?VisionStrategiesForBusinessPlan
    {
        return $this->visionStrategiesForBusinessPlan;
    }

    public function setVisionStrategiesForBusinessPlan(?VisionStrategiesForBusinessPlan $visionStrategiesForBusinessPlan): static
    {
        $this->visionStrategiesForBusinessPlan = $visionStrategiesForBusinessPlan;

        return $this;
    }

    /**
     * @return Collection<int, VisionStrategies>
     */
    public function getVisionStrategies(): Collection
    {
        return $this->VisionStrategies;
    }

    public function addVisionStrategy(VisionStrategies $visionStrategy): static
    {
        if (!$this->VisionStrategies->contains($visionStrategy)) {
            $this->VisionStrategies->add($visionStrategy);
            $visionStrategy->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeVisionStrategy(VisionStrategies $visionStrategy): static
    {
        if ($this->VisionStrategies->removeElement($visionStrategy)) {
            // set the owning side to null (unless already changed)
            if ($visionStrategy->getProjetAnnees() === $this) {
                $visionStrategy->setProjetAnnees(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, InfoBilan>
     */
    public function getInfoBilans(): Collection
    {
        return $this->infoBilans;
    }

    public function addInfoBilan(InfoBilan $infoBilan): static
    {
        if (!$this->infoBilans->contains($infoBilan)) {
            $this->infoBilans->add($infoBilan);
            $infoBilan->setProjetAnnees($this);
        }

        return $this;
    }

    public function removeInfoBilan(InfoBilan $infoBilan): static
    {
        if ($this->infoBilans->removeElement($infoBilan)) {
            // set the owning side to null (unless already changed)
            if ($infoBilan->getProjetAnnees() === $this) {
                $infoBilan->setProjetAnnees(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PlanFinancementInfo>
     */
    public function getPlanFinancementInfos(): Collection
    {
        return $this->planFinancementInfos;
    }

    public function addPlanFinancementInfo(PlanFinancementInfo $planFinancementInfo): static
    {
        if (!$this->planFinancementInfos->contains($planFinancementInfo)) {
            $this->planFinancementInfos->add($planFinancementInfo);
            $planFinancementInfo->setProjetAnnees($this);
        }

        return $this;
    }

    public function removePlanFinancementInfo(PlanFinancementInfo $planFinancementInfo): static
    {
        if ($this->planFinancementInfos->removeElement($planFinancementInfo)) {
            // set the owning side to null (unless already changed)
            if ($planFinancementInfo->getProjetAnnees() === $this) {
                $planFinancementInfo->setProjetAnnees(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Solution>
     */
    public function getSolutions(): Collection
    {
        return $this->solutions;
    }

    public function addSolution(Solution $solution): static
    {
        if (!$this->solutions->contains($solution)) {
            $this->solutions->add($solution);
        }

        return $this;
    }

    public function removeSolution(Solution $solution): static
    {
        $this->solutions->removeElement($solution);

        return $this;
    }
}
