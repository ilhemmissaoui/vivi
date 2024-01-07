<?php

namespace App\Repository;

use App\Entity\AnneeSolution;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnneeSolution>
 *
 * @method AnneeSolution|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnneeSolution|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnneeSolution[]    findAll()
 * @method AnneeSolution[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnneeSolutionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnneeSolution::class);
    }

    public function save(AnneeSolution $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(AnneeSolution $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findOneFromRepository($anneeSolutionId): array
    {
        return $this->createQueryBuilder('a')
        ->andWhere('a.id = :anneeSolutionId')
        ->andWhere('a.deleted = 0')
        ->setParameter('anneeSolutionId', $anneeSolutionId)
        ->select('a.id, a.annee')
        ->getQuery()
        ->getResult();
    }

    public function findAllFromRepository($businessPlan): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.businessPlan = :businessPlan')
            ->andWhere('a.deleted = 0')
            ->setParameter('businessPlan', $businessPlan)
            ->select('a.id, a.annee')
            ->getQuery()
            ->getResult();
            ;
    }

//    /**
//     * @return AnneeSolution[] Returns an array of AnneeSolution objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AnneeSolution
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
