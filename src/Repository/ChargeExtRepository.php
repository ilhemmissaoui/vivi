<?php

namespace App\Repository;

use App\Entity\ChargeExt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ChargeExt>
 *
 * @method ChargeExt|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChargeExt|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChargeExt[]    findAll()
 * @method ChargeExt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChargeExtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChargeExt::class);
    }

    public function save(ChargeExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ChargeExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getMontantsByChargeId($chargeId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :chargeId')
            ->setParameter('chargeId', $chargeId)
            ->andWhere('c.deleted = 0')
            ->innerJoin('c.MontantCExt', 'a')
            ->select('a.id, a.name, a.Jan, a.Frv, a.Mar, a.Avr, a.Mai, a.Juin, a.Juil, a.Aou, a.Sept, a.Oct, a.Nov, a.Dece, a.volume')
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function getAllChargeExt($financementEtCharges,$financementDepense): array
    {
        return $this->createQueryBuilder('c')

            ->innerJoin('c.financementEtCharges', 'f')
            ->andWhere('f.id = :financementEtCharges')
            ->setParameter('financementEtCharges', $financementEtCharges)

            ->innerJoin('c.financementDepense', 'fd')
            ->andWhere('fd.id = :financementDepense')
            ->setParameter('financementDepense', $financementDepense)

            ->leftJoin('c.depenses', 'dp')

            ->andWhere('c.deleted = 0')
            ->select('c.id, CONCAT(dp.name, \' (\',c.name, \')\') AS name')            
            ->getQuery()
            ->getResult()

        ;
    }

//    /**
//     * @return ChargeExt[] Returns an array of ChargeExt objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ChargeExt
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
