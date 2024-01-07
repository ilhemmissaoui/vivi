<?php

namespace App\Repository;

use App\Entity\FinancementChiffreAffaire;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FinancementChiffreAffaire>
 *
 * @method FinancementChiffreAffaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method FinancementChiffreAffaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method FinancementChiffreAffaire[]    findAll()
 * @method FinancementChiffreAffaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FinancementChiffreAffaireRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FinancementChiffreAffaire::class);
    }

//    /**
//     * @return FinancementChiffreAffaire[] Returns an array of FinancementChiffreAffaire objects
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

//    public function findOneBySomeField($value): ?FinancementChiffreAffaire
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
