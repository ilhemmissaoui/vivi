<?php

namespace App\Repository;

use App\Entity\NotreSolution;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NotreSolution>
 *
 * @method NotreSolution|null find($id, $lockMode = null, $lockVersion = null)
 * @method NotreSolution|null findOneBy(array $criteria, array $orderBy = null)
 * @method NotreSolution[]    findAll()
 * @method NotreSolution[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotreSolutionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NotreSolution::class);
    }

//    /**
//     * @return NotreSolution[] Returns an array of NotreSolution objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?NotreSolution
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
