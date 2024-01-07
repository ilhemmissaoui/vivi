<?php

namespace App\Repository;

use App\Entity\InfoBilan;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InfoBilan>
 *
 * @method InfoBilan|null find($id, $lockMode = null, $lockVersion = null)
 * @method InfoBilan|null findOneBy(array $criteria, array $orderBy = null)
 * @method InfoBilan[]    findAll()
 * @method InfoBilan[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InfoBilanRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InfoBilan::class);
    }

//    /**
//     * @return InfoBilan[] Returns an array of InfoBilan objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?InfoBilan
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
