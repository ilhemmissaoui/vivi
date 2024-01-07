<?php

namespace App\Repository;

use App\Entity\MontantCF;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MontantCF>
 *
 * @method MontantCF|null find($id, $lockMode = null, $lockVersion = null)
 * @method MontantCF|null findOneBy(array $criteria, array $orderBy = null)
 * @method MontantCF[]    findAll()
 * @method MontantCF[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MontantCFRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MontantCF::class);
    }

    public function save(MontantCF $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MontantCF $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    public function findMontantCF($FinancementEtCharges): array
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.FinancementEtCharges','f')
            ->andWhere('m.deleted = 0')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
            ->select("m.id,m.name")
            ->getQuery()
            ->getResult()
        ;
    }
    

//    /**
//     * @return MontantCF[] Returns an array of MontantCF objects
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

//    public function findOneBySomeField($value): ?MontantCF
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
