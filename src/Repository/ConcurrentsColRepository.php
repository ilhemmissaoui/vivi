<?php

namespace App\Repository;

use App\Entity\ConcurrentsCol;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ConcurrentsCol>
 *
 * @method ConcurrentsCol|null find($id, $lockMode = null, $lockVersion = null)
 * @method ConcurrentsCol|null findOneBy(array $criteria, array $orderBy = null)
 * @method ConcurrentsCol[]    findAll()
 * @method ConcurrentsCol[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConcurrentsColRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ConcurrentsCol::class);
    }

    public function save(ConcurrentsCol $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    
    public function findAllConcurrentsCol($PositionnementConcurrentiel): array
    {
        return $this->createQueryBuilder('c')
            ->leftJoin('c.positionnementConcurrentiel', 'p')
            ->select('c.id,c.name')
            ->andWhere('p.id = :PositionnementConcurrentiel')
            ->setParameter('PositionnementConcurrentiel', $PositionnementConcurrentiel)
            ->getQuery()
            ->getResult()
        ;
   }

    public function remove(ConcurrentsCol $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ConcurrentsCol[] Returns an array of ConcurrentsCol objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ConcurrentsCol
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
