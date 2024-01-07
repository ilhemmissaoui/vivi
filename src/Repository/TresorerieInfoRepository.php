<?php

namespace App\Repository;

use App\Entity\TresorerieInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TresorerieInfo>
 *
 * @method TresorerieInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method TresorerieInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method TresorerieInfo[]    findAll()
 * @method TresorerieInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TresorerieInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TresorerieInfo::class);
    }

//    /**
//     * @return TresorerieInfo[] Returns an array of TresorerieInfo objects
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

//    public function findOneBySomeField($value): ?TresorerieInfo
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
