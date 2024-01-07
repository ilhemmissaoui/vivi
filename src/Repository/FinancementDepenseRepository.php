<?php

namespace App\Repository;

use App\Entity\FinancementDepense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FinancementDepense>
 *
 * @method FinancementDepense|null find($id, $lockMode = null, $lockVersion = null)
 * @method FinancementDepense|null findOneBy(array $criteria, array $orderBy = null)
 * @method FinancementDepense[]    findAll()
 * @method FinancementDepense[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FinancementDepenseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FinancementDepense::class);
    }

//    /**
//     * @return FinancementDepense[] Returns an array of FinancementDepense objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FinancementDepense
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
