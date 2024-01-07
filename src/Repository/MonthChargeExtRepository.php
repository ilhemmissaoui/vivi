<?php

namespace App\Repository;

use App\Entity\MonthChargeExt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MonthChargeExt>
 *
 * @method MonthChargeExt|null find($id, $lockMode = null, $lockVersion = null)
 * @method MonthChargeExt|null findOneBy(array $criteria, array $orderBy = null)
 * @method MonthChargeExt[]    findAll()
 * @method MonthChargeExt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MonthChargeExtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MonthChargeExt::class);
    }

    public function save(MonthChargeExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MonthChargeExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getMonthChargeByMontantAnneeId($idMontant): array
    {
         return $this->createQueryBuilder('m')
         ->andWhere('m.deleted = 0')

            ->innerJoin('m.chargeExt','ch')
            ->innerJoin('m.projetAnnees','mc')
            ->andWhere('ch.deleted = 0')
            ->andWhere('mc.deleted = 0')
            ->andWhere('mc.id = :idMontant')
            ->setParameter('idMontant', $idMontant)
             ->select(
                 "ch.id as chargeExtId , ch.name as chargeExtName ,m.id,m.Jan,m.Frv,m.Mar,m.Avr,m.Mai,m.Juin,m.Juil,m.Aou,m.Sept,m.Oct,m.Nov,m.Dece ,mc.id as montantAnneeId"
                 )
             ->getQuery()
             ->getResult()
         ;
     }
    public function findOneMonthChargeExtSum($ChargeExtId,$idMontant): array
    {
         return $this->createQueryBuilder('m')
         ->andWhere('m.deleted = 0')

            ->innerJoin('m.chargeExt','ch')
            ->innerJoin('m.projetAnnees','mc')
            ->andWhere('ch.deleted = 0')
            ->andWhere('mc.deleted = 0')
            ->andWhere('ch.id = :ChargeExtId')
            ->setParameter('ChargeExtId', $ChargeExtId)
            ->andWhere('mc.id = :idMontant')
            ->setParameter('idMontant', $idMontant)
             ->select(
                 "m.Jan,m.Frv,m.Mar,m.Avr,m.Mai,m.Juin,m.Juil,m.Aou,m.Sept,m.Oct,m.Nov,m.Dece,m.id"
                 )
             ->getQuery()
             ->getResult()
         ;
     }
    public function findAllMonthChargeExtSum($FinancementEtCharges): array
    {
         return $this->createQueryBuilder('m')
         ->andWhere('m.deleted = 0')

            ->innerJoin('m.chargeExt','ch')
            ->innerJoin('m.projetAnnees','mc')
            ->andWhere('ch.deleted = 0')
            ->andWhere('mc.deleted = 0')
            ->innerJoin('ch.financementEtCharges','f')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
            ->innerJoin('mc.FinancementEtCharges','fmc')
            ->andWhere('fmc.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
             ->select(
                 "m.id,m.Jan,m.Frv,m.Mar,m.Avr,m.Mai,m.Juin,m.Juil,m.Aou,m.Sept,m.Oct,m.Nov,m.Dece,m.volume,ch.id as chiffreAffaireActiviteId,mc.id as montantAnneeId"
                 )
             ->getQuery()
             ->getResult()
         ;
     }


//    /**
//     * @return MonthChargeExt[] Returns an array of MonthChargeExt objects
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

//    public function findOneBySomeField($value): ?MonthChargeExt
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
