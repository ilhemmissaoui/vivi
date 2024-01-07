<?php

namespace App\Repository;

use App\Entity\EncaisseDecaissement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EncaisseDecaissement>
 *
 * @method EncaisseDecaissement|null find($id, $lockMode = null, $lockVersion = null)
 * @method EncaisseDecaissement|null findOneBy(array $criteria, array $orderBy = null)
 * @method EncaisseDecaissement[]    findAll()
 * @method EncaisseDecaissement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EncaisseDecaissementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EncaisseDecaissement::class);
    }

//    /**
//     * @return EncaisseDecaissement[] Returns an array of EncaisseDecaissement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EncaisseDecaissement
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
