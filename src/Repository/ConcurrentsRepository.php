<?php

namespace App\Repository;

use App\Entity\Concurrents;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Concurrents>
 *
 * @method Concurrents|null find($id, $lockMode = null, $lockVersion = null)
 * @method Concurrents|null findOneBy(array $criteria, array $orderBy = null)
 * @method Concurrents[]    findAll()
 * @method Concurrents[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConcurrentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Concurrents::class);
    }

    public function save(Concurrents $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Concurrents $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }



    public function getConcurrentsByPositionnementConcurrentiel($positionnementConcurrentiel): array
    {
        return $this->createQueryBuilder('c')
                ->innerJoin('c.positionnementConcurrentiel', 'p')
           
            ->andWhere('p.id = :positionnementConcurrentiel')
            ->setParameter('positionnementConcurrentiel', $positionnementConcurrentiel)
            ->innerJoin('c.besoins', 'b')
            ->innerJoin('c.ConcurentName', 'cn')
            ->leftJoin('c.societe', 's')
            ->select('c.id,c.volume,s.id as societe, s.name as nameSociete ,b.id as besoinId ,cn.id as concurentNameId')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return Concurrents[] Returns an array of Concurrents objects
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

//    public function findOneBySomeField($value): ?Concurrents
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
