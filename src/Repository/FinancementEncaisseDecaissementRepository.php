<?php

namespace App\Repository;

use App\Entity\FinancementEncaisseDecaissement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FinancementEncaisseDecaissement>
 *
 * @method FinancementEncaisseDecaissement|null find($id, $lockMode = null, $lockVersion = null)
 * @method FinancementEncaisseDecaissement|null findOneBy(array $criteria, array $orderBy = null)
 * @method FinancementEncaisseDecaissement[]    findAll()
 * @method FinancementEncaisseDecaissement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FinancementEncaisseDecaissementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FinancementEncaisseDecaissement::class);
    }

//    /**
//     * @return FinancementEncaisseDecaissement[] Returns an array of FinancementEncaisseDecaissement objects
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

//    public function findOneBySomeField($value): ?FinancementEncaisseDecaissement
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
