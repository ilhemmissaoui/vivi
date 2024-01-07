<?php

namespace App\Repository;

use App\Entity\MonthListeChiffreAffaire;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MonthListeChiffreAffaire>
 *
 * @method MonthListeChiffreAffaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method MonthListeChiffreAffaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method MonthListeChiffreAffaire[]    findAll()
 * @method MonthListeChiffreAffaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MonthListeChiffreAffaireRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MonthListeChiffreAffaire::class);
    }

    public function save(MonthListeChiffreAffaire $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MonthListeChiffreAffaire $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function findOneMonthListeChiffreAffaire($idMonthValue,$AnneeMontant,$ChiffreAffaireActivite): array
   {
        return $this->createQueryBuilder('m')
        ->andWhere('m.deleted = :deleted')
            ->setParameter('deleted', 0)
            ->andWhere('m.id = :idMonthValue')
            ->setParameter('idMonthValue', $idMonthValue)
            ->andWhere('m.projetAnnees = :AnneeMontant')
            ->setParameter('AnneeMontant', $AnneeMontant)
            ->andWhere('m.chiffreAffaireActivite = :ChiffreAffaireActivite')
            ->setParameter('ChiffreAffaireActivite', $ChiffreAffaireActivite)
            
            ->orderBy('m.id', 'ASC')
            ->select(
                "m.id,m.JanPrixHt,m.JanVolumeVente,m.FevPrixHt,m.FrvVolumeVente,m.MarPrixHt,m.MarVolumeVente,m.AvrPrixHt,m.AvrVolumeVente,m.MaiPrixHt,
                m.MaiVolumeVente,m.JuinPrixHt,m.JuinVolumeVente,m.JuilPrixHt,m.JuilVolumeVente,m.AouPrixHt,
                m.AouVolumeVente,m.SeptPrixHt,m.SeptVolumeVente,m.OctPrixHt,m.OctVolumeVente,m.NovPrixHt,
                m.NovVolumeVonte,m.DecPrixHt,m.DecVolumeVonte,m.Valeur"
                )
            ->getQuery()
            ->getResult()
        ;
    }

    public function findAllMonthListeChiffreAffaire($FinancementEtCharges): array
    {
         return $this->createQueryBuilder('m')
         ->andWhere('m.deleted = :deleted')
            ->setParameter('deleted', 0)
            ->innerJoin('m.chiffreAffaireActivite','ch')
            ->innerJoin('m.projetAnnees','mc')
            ->andWhere('mc.deleted = :deleted')
            ->setParameter('deleted', 0)
            ->innerJoin('ch.financementEtCharges','f')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
           
            ->andWhere('ch.deleted = :deleted')
            ->setParameter('deleted', 0)

            ->innerJoin('mc.FinancementEtCharges','fmc')
            ->andWhere('fmc.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
            
             ->select(
                 "m.id,m.JanPrixHt,m.JanVolumeVente,m.FevPrixHt,m.FrvVolumeVente,m.MarPrixHt,m.MarVolumeVente,m.AvrPrixHt,m.AvrVolumeVente,m.MaiPrixHt,
                 m.MaiVolumeVente,m.JuinPrixHt,m.JuinVolumeVente,m.JuilPrixHt,m.JuilVolumeVente,m.AouPrixHt,
                 m.AouVolumeVente,m.SeptPrixHt,m.SeptVolumeVente,m.OctPrixHt,m.OctVolumeVente,m.NovPrixHt,
                 m.NovVolumeVonte,m.DecPrixHt,m.DecVolumeVonte,m.Valeur,ch.id as chiffreAffaireActiviteId,mc.id as montantAnneeId"
                 )
             ->getQuery()
             ->getResult()
         ;
     }



     public function findAllMonthListeChiffreAffaireTresorerie($FinancementEtCharges,$idAnnee): array
     {
          return $this->createQueryBuilder('m')
          ->andWhere('m.deleted = :deleted')
            ->setParameter('deleted', 0)
             ->innerJoin('m.chiffreAffaireActivite','ch')
             ->innerJoin('m.projetAnnees','mc')

             ->andWhere('mc.id = :idAnnee')
             ->setParameter('idAnnee', $idAnnee)

             ->andWhere('mc.deleted = :deleted')
             ->setParameter('deleted', 0)



             ->innerJoin('ch.financementEtCharges','f')
             ->andWhere('f.id = :FinancementEtCharges')
             ->setParameter('FinancementEtCharges', $FinancementEtCharges)
            
             ->andWhere('ch.deleted = :deleted')
             ->setParameter('deleted', 0)
 
             ->innerJoin('mc.FinancementEtCharges','fmc')
             ->andWhere('fmc.id = :FinancementEtCharges')
             ->setParameter('FinancementEtCharges', $FinancementEtCharges)
             
              ->select(
                  "m.id,m.JanPrixHt,m.JanVolumeVente,m.FevPrixHt,m.FrvVolumeVente,m.MarPrixHt,m.MarVolumeVente,m.AvrPrixHt,m.AvrVolumeVente,m.MaiPrixHt,
                  m.MaiVolumeVente,m.JuinPrixHt,m.JuinVolumeVente,m.JuilPrixHt,m.JuilVolumeVente,m.AouPrixHt,
                  m.AouVolumeVente,m.SeptPrixHt,m.SeptVolumeVente,m.OctPrixHt,m.OctVolumeVente,m.NovPrixHt,
                  m.NovVolumeVonte,m.DecPrixHt,m.DecVolumeVonte,m.Valeur,ch.id as chiffreAffaireActiviteId,mc.id as montantAnneeId"
                  )
              ->getQuery()
              ->getResult()
          ;
      }

     public function findAllvalueChiffreAffaire($FinancementEtCharges): array
     {
          return $this->createQueryBuilder('m')
          ->andWhere('m.deleted = :deleted')
            ->setParameter('deleted', 0)
             ->innerJoin('m.chiffreAffaireActivite','ch')
             ->innerJoin('m.projetAnnees','mc')
             ->andWhere('mc.deleted = :deleted')
             ->setParameter('deleted', 0)
             ->innerJoin('ch.financementEtCharges','f')
             ->andWhere('f.id = :FinancementEtCharges')
             ->setParameter('FinancementEtCharges', $FinancementEtCharges)
             ->andWhere('ch.deleted = :deleted')
             ->setParameter('deleted', 0)
             ->innerJoin('mc.FinancementEtCharges','fmc')
             ->andWhere('fmc.id = :FinancementEtCharges')
             ->setParameter('FinancementEtCharges', $FinancementEtCharges)
             
              ->select(
                  "m.id,m.Valeur,ch.id as chiffreAffaireActiviteId,mc.id as montantAnneeId"
                  )
              ->getQuery()
              ->getResult()
          ;
      }


      public function findAllvalueIdChiffreAffaire($FinancementEtCharges): array
      {
           return $this->createQueryBuilder('m')
           ->andWhere('m.deleted = :deleted')
            ->setParameter('deleted', 0)
              ->innerJoin('m.chiffreAffaireActivite','ch')
              ->innerJoin('m.projetAnnees','mc')
              ->andWhere('mc.deleted = :deleted')
                ->setParameter('deleted', 0)
              ->innerJoin('ch.financementEtCharges','f')
              ->andWhere('f.id = :FinancementEtCharges')
              ->setParameter('FinancementEtCharges', $FinancementEtCharges)
              ->andWhere('ch.deleted = :deleted')
              ->setParameter('deleted', 0)
              ->innerJoin('mc.FinancementEtCharges','fmc')
              ->andWhere('fmc.id = :FinancementEtCharges')
              ->setParameter('FinancementEtCharges', $FinancementEtCharges)
              
               ->select(
                   "m.id"
                   )
               ->getQuery()
               ->getResult()
           ;
       }

       public function findAllMonthListeChiffreAffaireForYear($FinancementEtCharges,$idAnnee): array
       {
            return $this->createQueryBuilder('m')
            ->andWhere('m.deleted = :deleted')
              ->setParameter('deleted', 0)
               ->innerJoin('m.chiffreAffaireActivite','ch')
               ->innerJoin('m.projetAnnees','mc')
  
               ->andWhere('mc.id = :idAnnee')
               ->setParameter('idAnnee', $idAnnee)
  
               ->andWhere('mc.deleted = :deleted')
               ->setParameter('deleted', 0)

               ->innerJoin('ch.financementEtCharges','f')
               ->andWhere('f.id = :FinancementEtCharges')
               ->setParameter('FinancementEtCharges', $FinancementEtCharges)
              
               ->andWhere('ch.deleted = :deleted')
               ->setParameter('deleted', 0)
   
               ->innerJoin('mc.FinancementEtCharges','fmc')
               ->andWhere('fmc.id = :FinancementEtCharges')
               ->setParameter('FinancementEtCharges', $FinancementEtCharges)
               
                ->select(
                        "ch.id as chiffreAffaireActiviteId ,ch.name as chiffreAffaireActiviteName,
                        m.id,m.JanPrixHt,m.JanVolumeVente,m.FevPrixHt,m.FrvVolumeVente,m.MarPrixHt,m.MarVolumeVente,m.AvrPrixHt,m.AvrVolumeVente,m.MaiPrixHt,
                        m.MaiVolumeVente,m.JuinPrixHt,m.JuinVolumeVente,m.JuilPrixHt,m.JuilVolumeVente,m.AouPrixHt,
                        m.AouVolumeVente,m.SeptPrixHt,m.SeptVolumeVente,m.OctPrixHt,m.OctVolumeVente,m.NovPrixHt,
                        m.NovVolumeVonte,m.DecPrixHt,m.DecVolumeVonte,m.Valeur"
                    )
                ->getQuery()
                ->getResult()
            ;
        }

//    /**
//     * @return MonthListeChiffreAffaire[] Returns an array of MonthListeChiffreAffaire objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MonthListeChiffreAffaire
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
