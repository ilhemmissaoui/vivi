<?php

namespace App\Repository;

use App\Entity\InvestissementNature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InvestissementNature>
 *
 * @method InvestissementNature|null find($id, $lockMode = null, $lockVersion = null)
 * @method InvestissementNature|null findOneBy(array $criteria, array $orderBy = null)
 * @method InvestissementNature[]    findAll()
 * @method InvestissementNature[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvestissementNatureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InvestissementNature::class);
    }

//    /**
//     * @return InvestissementNature[] Returns an array of InvestissementNature objects
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

//    public function findOneBySomeField($value): ?InvestissementNature
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
