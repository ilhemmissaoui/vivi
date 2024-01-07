<?php

namespace App\Repository;

use App\Entity\VisionStrategies;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VisionStrategies>
 *
 * @method VisionStrategies|null find($id, $lockMode = null, $lockVersion = null)
 * @method VisionStrategies|null findOneBy(array $criteria, array $orderBy = null)
 * @method VisionStrategies[]    findAll()
 * @method VisionStrategies[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VisionStrategiesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VisionStrategies::class);
    }

    public function save(VisionStrategies $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(VisionStrategies $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getActionsByVsId($VsId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :VsId')
            ->setParameter('VsId', $VsId)
            ->andWhere('c.deleted = 0')
            ->innerJoin('c.action', 'a')
            ->select('a.id, a.debut, a.fin,a.action,a.cible')
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function getObjectifByVsId($VsId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :VsId')
            ->setParameter('VsId', $VsId)
            ->andWhere('c.deleted = 0')
            ->innerJoin('c.objectif', 'a')
            ->select('a.id, a.debut, a.fin,a.action,a.cible')
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function getCoutByVsId($VsId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :VsId')
            ->setParameter('VsId', $VsId)
            ->andWhere('c.deleted = 0')
            ->innerJoin('c.cout', 'a')
            ->select('a.id, a.debut, a.fin,a.action,a.cible')
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return VisionStrategies[] Returns an array of VisionStrategies objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('v.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?VisionStrategies
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
