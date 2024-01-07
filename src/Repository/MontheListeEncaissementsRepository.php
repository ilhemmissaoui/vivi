<?php

namespace App\Repository;

use App\Entity\MontheListeEncaissements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MontheListeEncaissements>
 *
 * @method MontheListeEncaissements|null find($id, $lockMode = null, $lockVersion = null)
 * @method MontheListeEncaissements|null findOneBy(array $criteria, array $orderBy = null)
 * @method MontheListeEncaissements[]    findAll()
 * @method MontheListeEncaissements[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MontheListeEncaissementsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MontheListeEncaissements::class);
    }

//    /**
//     * @return MontheListeEncaissements[] Returns an array of MontheListeEncaissements objects
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

//    public function findOneBySomeField($value): ?MontheListeEncaissements
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
