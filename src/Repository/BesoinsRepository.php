<?php

namespace App\Repository;

use App\Entity\Besoins;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Besoins>
 *
 * @method Besoins|null find($id, $lockMode = null, $lockVersion = null)
 * @method Besoins|null findOneBy(array $criteria, array $orderBy = null)
 * @method Besoins[]    findAll()
 * @method Besoins[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BesoinsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Besoins::class);
    }

    public function save(Besoins $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Besoins $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    public function getBesoinId($PositionnementConcurrentiel): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.deleted = 0')
            ->innerJoin('b.positionnementConcurrentiel', 'p')
            ->andWhere('p.id = :PositionnementConcurrentiel')
            ->setParameter('PositionnementConcurrentiel', $PositionnementConcurrentiel)
            ->select('b.id,b.position')
            ->getQuery()
            ->getResult()
        ;
    }
    public function getConcurrentsByBesoinId($besoinId): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.id = :besoinId')
            ->setParameter('besoinId', $besoinId)
            ->andWhere('b.deleted = 0')
            ->innerJoin('b.concurrents', 'c')
            ->innerJoin('c.societe', 's')
            ->select('c.id,c.volume,s.id as societe, s.name as nameSociete')
            ->getQuery()
            ->getResult()
        ;
    }
    public function getConcurrentsByBesoinIdForProjet($besoinId): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.id = :besoinId')
            ->setParameter('besoinId', $besoinId)
            ->andWhere('b.deleted = 0')
            ->innerJoin('b.concurrents', 'c')
            ->leftJoin('c.societe', 's')
            ->andWhere('c.societe IS NULL')
            
            ->select('c.id,c.volume,s.id as societe, s.name as nameSociete')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return Besoins[] Returns an array of Besoins objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Besoins
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
