<?php

namespace App\Repository;

use App\Entity\PlanFinancementInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PlanFinancementInfo>
 *
 * @method PlanFinancement|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlanFinancement|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlanFinancement[]    findAll()
 * @method PlanFinancement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlanFinancementInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlanFinancementInfo::class);
    }

//    /**
//     * @return PlanFinancement[] Returns an array of PlanFinancement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PlanFinancement
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
