<?php

namespace App\Repository;

use App\Entity\PopupPubFront;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PopupPubFront>
 *
 * @method PopupPubFront|null find($id, $lockMode = null, $lockVersion = null)
 * @method PopupPubFront|null findOneBy(array $criteria, array $orderBy = null)
 * @method PopupPubFront[]    findAll()
 * @method PopupPubFront[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PopupPubFrontRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PopupPubFront::class);
    }

    public function save(PopupPubFront $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PopupPubFront $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PopupPubFront[] Returns an array of PopupPubFront objects
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

//    public function findOneBySomeField($value): ?PopupPubFront
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
