<?php

namespace App\Entity;

use App\Repository\FinancementEtChargesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FinancementEtChargesRepository::class)]
class FinancementEtCharges
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $chargePersonnel = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $investissement = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $financement = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $synthesePrevesionnel = null;

    #[ORM\OneToOne(mappedBy: 'FinancementEtCharges', cascade: ['persist', 'remove'])]
    private ?BusinessPlan $businessPlan = null;

    #[ORM\OneToMany(mappedBy: 'financementEtCharges', targetEntity: ChiffreAffaireActivite::class)]
    private Collection $chifreAf;


    #[ORM\OneToMany(mappedBy: 'financementEtCharges', targetEntity: SalaireEtchargeSocial::class)]
    private Collection $salaireEtchargeSocial;

    #[ORM\OneToMany(mappedBy: 'financementEtCharges', targetEntity: SalaireEtchargeSocialDirigents::class)]
    private Collection $SalaireEtchargeSocialDirigents;

    #[ORM\Column]
    private ?int $avanecement = 0;

    #[ORM\OneToMany(mappedBy: 'financementEtCharges', targetEntity: ChargeExt::class)]
    private Collection $chargeExt;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: MontantCExt::class)]
    private Collection $montantCExts;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: MontantCF::class)]
    private Collection $montantCFs;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: ProjetAnnees::class)]
    private Collection $projetAnnees;

    #[ORM\OneToMany(mappedBy: 'financementEtCharges', targetEntity: EncaisseDecaissement::class)]
    private Collection $EncaisseDecaissement;

    #[ORM\OneToOne(mappedBy: 'FinancementEtCharges', cascade: ['persist', 'remove'])]
    private ?FinancementEncaisseDecaissement $financementEncaisseDecaissement = null;

    #[ORM\OneToOne(mappedBy: 'FinancementEtCharges', cascade: ['persist', 'remove'])]
    private ?FinancementInvestissement $financementInvestissement = null;

    #[ORM\OneToOne(mappedBy: 'FinancementEtCharges', cascade: ['persist', 'remove'])]
    private ?FinancementChiffreAffaire $financementChiffreAffaire = null;

    #[ORM\OneToOne(mappedBy: 'FinancementEtCharges', cascade: ['persist', 'remove'])]
    private ?FinancementDepense $financementDepense = null;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: TresorerieInfo::class)]
    private Collection $TresorerieInfos;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: InfoBilan::class)]
    private Collection $infoBilans;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: PlanFinancementInfo::class)]
    private Collection $planFinancementInfos;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: SalaireEtchargeCollaborateurInfo::class)]
    private Collection $salaireEtchargeCollaborateurInfos;

    #[ORM\OneToMany(mappedBy: 'FinancementEtCharges', targetEntity: SalaireEtchargeDirigentsInfo::class)]
    private Collection $salaireEtchargeDirigentsInfos;

    public function __construct()
    {
        $this->chifreAf = new ArrayCollection();
        $this->salaireEtchargeSocial = new ArrayCollection();
        $this->SalaireEtchargeSocialDirigents = new ArrayCollection();
        $this->chargeExt = new ArrayCollection();
        $this->montantCExts = new ArrayCollection();
        $this->montantCFs = new ArrayCollection();
        $this->projetAnnees = new ArrayCollection();
        $this->EncaisseDecaissement = new ArrayCollection();
        $this->EncaisseDecaissement = new ArrayCollection();
        $this->TresorerieInfos = new ArrayCollection();
        $this->infoBilans = new ArrayCollection();
        $this->planFinancementInfos = new ArrayCollection();
        $this->salaireEtchargeCollaborateurInfos = new ArrayCollection();
        $this->salaireEtchargeDirigentsInfos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChargePersonnel(): ?string
    {
        return $this->chargePersonnel;
    }

    public function setChargePersonnel(?string $chargePersonnel): self
    {
        $this->chargePersonnel = $chargePersonnel;

        return $this;
    }

    public function getInvestissement(): ?string
    {
        return $this->investissement;
    }

    public function setInvestissement(?string $investissement): self
    {
        $this->investissement = $investissement;

        return $this;
    }

    public function getFinancement(): ?string
    {
        return $this->financement;
    }

    public function setFinancement(?string $financement): self
    {
        $this->financement = $financement;

        return $this;
    }

    public function getSynthesePrevesionnel(): ?string
    {
        return $this->synthesePrevesionnel;
    }

    public function setSynthesePrevesionnel(?string $synthesePrevesionnel): self
    {
        $this->synthesePrevesionnel = $synthesePrevesionnel;

        return $this;
    }

    public function getBusinessPlan(): ?BusinessPlan
    {
        return $this->businessPlan;
    }

    public function setBusinessPlan(?BusinessPlan $businessPlan): self
    {
        // unset the owning side of the relation if necessary
        if ($businessPlan === null && $this->businessPlan !== null) {
            $this->businessPlan->setFinancementEtCharges(null);
        }

        // set the owning side of the relation if necessary
        if ($businessPlan !== null && $businessPlan->getFinancementEtCharges() !== $this) {
            $businessPlan->setFinancementEtCharges($this);
        }

        $this->businessPlan = $businessPlan;

        return $this;
    }

    /**
     * @return Collection<int, ChiffreAffaireActivite>
     */
    public function getChifreAf(): Collection
    {
        return $this->chifreAf;
    }

    public function addChifreAf(ChiffreAffaireActivite $chifreAf): self
    {
        if (!$this->chifreAf->contains($chifreAf)) {
            $this->chifreAf->add($chifreAf);
            $chifreAf->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeChifreAf(ChiffreAffaireActivite $chifreAf): self
    {
        if ($this->chifreAf->removeElement($chifreAf)) {
            // set the owning side to null (unless already changed)
            if ($chifreAf->getFinancementEtCharges() === $this) {
                $chifreAf->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeSocial>
     */
    public function getSalaireEtchargeSocial(): Collection
    {
        return $this->salaireEtchargeSocial;
    }

    public function addSalaireEtchargeSocial(SalaireEtchargeSocial $salaireEtchargeSocial): self
    {
        if (!$this->salaireEtchargeSocial->contains($salaireEtchargeSocial)) {
            $this->salaireEtchargeSocial->add($salaireEtchargeSocial);
            $salaireEtchargeSocial->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeSocial(SalaireEtchargeSocial $salaireEtchargeSocial): self
    {
        if ($this->salaireEtchargeSocial->removeElement($salaireEtchargeSocial)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeSocial->getFinancementEtCharges() === $this) {
                $salaireEtchargeSocial->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeSocialDirigents>
     */
    public function getSalaireEtchargeSocialDirigents(): Collection
    {
        return $this->SalaireEtchargeSocialDirigents;
    }

    public function addSalaireEtchargeSocialDirigent(SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigent): self
    {
        if (!$this->SalaireEtchargeSocialDirigents->contains($salaireEtchargeSocialDirigent)) {
            $this->SalaireEtchargeSocialDirigents->add($salaireEtchargeSocialDirigent);
            $salaireEtchargeSocialDirigent->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeSocialDirigent(SalaireEtchargeSocialDirigents $salaireEtchargeSocialDirigent): self
    {
        if ($this->SalaireEtchargeSocialDirigents->removeElement($salaireEtchargeSocialDirigent)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeSocialDirigent->getFinancementEtCharges() === $this) {
                $salaireEtchargeSocialDirigent->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    public function getAvanecement(): ?int
    {
        return $this->avanecement;
    }

    public function setAvanecement(int $avanecement): self
    {
        $this->avanecement = $avanecement;

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
            $chargeExt->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeChargeExt(ChargeExt $chargeExt): self
    {
        if ($this->chargeExt->removeElement($chargeExt)) {
            // set the owning side to null (unless already changed)
            if ($chargeExt->getFinancementEtCharges() === $this) {
                $chargeExt->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, MontantCExt>
     */
    public function getMontantCExts(): Collection
    {
        return $this->montantCExts;
    }

    public function addMontantCExt(MontantCExt $montantCExt): self
    {
        if (!$this->montantCExts->contains($montantCExt)) {
            $this->montantCExts->add($montantCExt);
            $montantCExt->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeMontantCExt(MontantCExt $montantCExt): self
    {
        if ($this->montantCExts->removeElement($montantCExt)) {
            // set the owning side to null (unless already changed)
            if ($montantCExt->getFinancementEtCharges() === $this) {
                $montantCExt->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, MontantCF>
     */
    public function getMontantCFs(): Collection
    {
        return $this->montantCFs;
    }

    public function addMontantCF(MontantCF $montantCF): self
    {
        if (!$this->montantCFs->contains($montantCF)) {
            $this->montantCFs->add($montantCF);
            $montantCF->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeMontantCF(MontantCF $montantCF): self
    {
        if ($this->montantCFs->removeElement($montantCF)) {
            // set the owning side to null (unless already changed)
            if ($montantCF->getFinancementEtCharges() === $this) {
                $montantCF->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProjetAnnees>
     */
    public function getProjetAnnees(): Collection
    {
        return $this->projetAnnees;
    }

    public function addProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if (!$this->projetAnnees->contains($projetAnnee)) {
            $this->projetAnnees->add($projetAnnee);
            $projetAnnee->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeProjetAnnee(ProjetAnnees $projetAnnee): static
    {
        if ($this->projetAnnees->removeElement($projetAnnee)) {
            // set the owning side to null (unless already changed)
            if ($projetAnnee->getFinancementEtCharges() === $this) {
                $projetAnnee->setFinancementEtCharges(null);
            }
        }

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
            $encaisseDecaissement->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeEncaisseDecaissement(EncaisseDecaissement $encaisseDecaissement): static
    {
        if ($this->EncaisseDecaissement->removeElement($encaisseDecaissement)) {
            // set the owning side to null (unless already changed)
            if ($encaisseDecaissement->getFinancementEtCharges() === $this) {
                $encaisseDecaissement->setFinancementEtCharges(null);
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
        // unset the owning side of the relation if necessary
        if ($financementEncaisseDecaissement === null && $this->financementEncaisseDecaissement !== null) {
            $this->financementEncaisseDecaissement->setFinancementEtCharges(null);
        }

        // set the owning side of the relation if necessary
        if ($financementEncaisseDecaissement !== null && $financementEncaisseDecaissement->getFinancementEtCharges() !== $this) {
            $financementEncaisseDecaissement->setFinancementEtCharges($this);
        }

        $this->financementEncaisseDecaissement = $financementEncaisseDecaissement;

        return $this;
    }

    public function getFinancementInvestissement(): ?FinancementInvestissement
    {
        return $this->financementInvestissement;
    }

    public function setFinancementInvestissement(?FinancementInvestissement $financementInvestissement): static
    {
        // unset the owning side of the relation if necessary
        if ($financementInvestissement === null && $this->financementInvestissement !== null) {
            $this->financementInvestissement->setFinancementEtCharges(null);
        }

        // set the owning side of the relation if necessary
        if ($financementInvestissement !== null && $financementInvestissement->getFinancementEtCharges() !== $this) {
            $financementInvestissement->setFinancementEtCharges($this);
        }

        $this->financementInvestissement = $financementInvestissement;

        return $this;
    }

    public function getFinancementChiffreAffaire(): ?FinancementChiffreAffaire
    {
        return $this->financementChiffreAffaire;
    }

    public function setFinancementChiffreAffaire(?FinancementChiffreAffaire $financementChiffreAffaire): static
    {
        // unset the owning side of the relation if necessary
        if ($financementChiffreAffaire === null && $this->financementChiffreAffaire !== null) {
            $this->financementChiffreAffaire->setFinancementEtCharges(null);
        }

        // set the owning side of the relation if necessary
        if ($financementChiffreAffaire !== null && $financementChiffreAffaire->getFinancementEtCharges() !== $this) {
            $financementChiffreAffaire->setFinancementEtCharges($this);
        }

        $this->financementChiffreAffaire = $financementChiffreAffaire;

        return $this;
    }

    public function getFinancementDepense(): ?FinancementDepense
    {
        return $this->financementDepense;
    }

    public function setFinancementDepense(?FinancementDepense $financementDepense): static
    {
        // unset the owning side of the relation if necessary
        if ($financementDepense === null && $this->financementDepense !== null) {
            $this->financementDepense->setFinancementEtCharges(null);
        }

        // set the owning side of the relation if necessary
        if ($financementDepense !== null && $financementDepense->getFinancementEtCharges() !== $this) {
            $financementDepense->setFinancementEtCharges($this);
        }

        $this->financementDepense = $financementDepense;

        return $this;
    }

    /**
     * @return Collection<int, TresorerieInfo>
     */
    public function getTresorerieInfos(): Collection
    {
        return $this->TresorerieInfos;
    }

    public function addTresorerieInfo(TresorerieInfo $TresorerieInfo): static
    {
        if (!$this->TresorerieInfos->contains($TresorerieInfo)) {
            $this->TresorerieInfos->add($TresorerieInfo);
            $TresorerieInfo->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeTresorerieInfo(TresorerieInfo $TresorerieInfo): static
    {
        if ($this->TresorerieInfos->removeElement($TresorerieInfo)) {
            // set the owning side to null (unless already changed)
            if ($TresorerieInfo->getFinancementEtCharges() === $this) {
                $TresorerieInfo->setFinancementEtCharges(null);
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
            $infoBilan->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeInfoBilan(InfoBilan $infoBilan): static
    {
        if ($this->infoBilans->removeElement($infoBilan)) {
            // set the owning side to null (unless already changed)
            if ($infoBilan->getFinancementEtCharges() === $this) {
                $infoBilan->setFinancementEtCharges(null);
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
            $planFinancementInfo->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removePlanFinancementInfo(PlanFinancementInfo $planFinancementInfo): static
    {
        if ($this->planFinancementInfos->removeElement($planFinancementInfo)) {
            // set the owning side to null (unless already changed)
            if ($planFinancementInfo->getFinancementEtCharges() === $this) {
                $planFinancementInfo->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeCollaborateurInfo>
     */
    public function getSalaireEtchargeCollaborateurInfos(): Collection
    {
        return $this->salaireEtchargeCollaborateurInfos;
    }

    public function addSalaireEtchargeCollaborateurInfo(SalaireEtchargeCollaborateurInfo $salaireEtchargeCollaborateurInfo): static
    {
        if (!$this->salaireEtchargeCollaborateurInfos->contains($salaireEtchargeCollaborateurInfo)) {
            $this->salaireEtchargeCollaborateurInfos->add($salaireEtchargeCollaborateurInfo);
            $salaireEtchargeCollaborateurInfo->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeCollaborateurInfo(SalaireEtchargeCollaborateurInfo $salaireEtchargeCollaborateurInfo): static
    {
        if ($this->salaireEtchargeCollaborateurInfos->removeElement($salaireEtchargeCollaborateurInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeCollaborateurInfo->getFinancementEtCharges() === $this) {
                $salaireEtchargeCollaborateurInfo->setFinancementEtCharges(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SalaireEtchargeDirigentsInfo>
     */
    public function getSalaireEtchargeDirigentsInfos(): Collection
    {
        return $this->salaireEtchargeDirigentsInfos;
    }

    public function addSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): static
    {
        if (!$this->salaireEtchargeDirigentsInfos->contains($salaireEtchargeDirigentsInfo)) {
            $this->salaireEtchargeDirigentsInfos->add($salaireEtchargeDirigentsInfo);
            $salaireEtchargeDirigentsInfo->setFinancementEtCharges($this);
        }

        return $this;
    }

    public function removeSalaireEtchargeDirigentsInfo(SalaireEtchargeDirigentsInfo $salaireEtchargeDirigentsInfo): static
    {
        if ($this->salaireEtchargeDirigentsInfos->removeElement($salaireEtchargeDirigentsInfo)) {
            // set the owning side to null (unless already changed)
            if ($salaireEtchargeDirigentsInfo->getFinancementEtCharges() === $this) {
                $salaireEtchargeDirigentsInfo->setFinancementEtCharges(null);
            }
        }

        return $this;
    }
}
