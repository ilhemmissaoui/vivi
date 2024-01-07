<?php

namespace App\Repository;

use App\Entity\PositionnementConcurrentiel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PositionnementConcurrentiel>
 *
 * @method PositionnementConcurrentiel|null find($id, $lockMode = null, $lockVersion = null)
 * @method PositionnementConcurrentiel|null findOneBy(array $criteria, array $orderBy = null)
 * @method PositionnementConcurrentiel[]    findAll()
 * @method PositionnementConcurrentiel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PositionnementConcurrentielRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PositionnementConcurrentiel::class);
    }

    public function save(PositionnementConcurrentiel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PositionnementConcurrentiel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PositionnementConcurrentiel[] Returns an array of PositionnementConcurrentiel objects
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

//    public function findOneBySomeField($value): ?PositionnementConcurrentiel
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
