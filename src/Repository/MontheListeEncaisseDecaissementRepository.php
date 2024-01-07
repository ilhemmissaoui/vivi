<?php

namespace App\Repository;

use App\Entity\MontheListeEncaisseDecaissement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MontheListeEncaisseDecaissement>
 *
 * @method MontheListeEncaisseDecaissement|null find($id, $lockMode = null, $lockVersion = null)
 * @method MontheListeEncaisseDecaissement|null findOneBy(array $criteria, array $orderBy = null)
 * @method MontheListeEncaisseDecaissement[]    findAll()
 * @method MontheListeEncaisseDecaissement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MontheListeEncaisseDecaissementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MontheListeEncaisseDecaissement::class);
    }

//    /**
//     * @return MontheListeEncaisseDecaissement[] Returns an array of MontheListeEncaisseDecaissement objects
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

//    public function findOneBySomeField($value): ?MontheListeEncaisseDecaissement
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
