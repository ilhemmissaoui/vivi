<?php

namespace App\Repository;

use App\Entity\AnneeInvestissement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnneeInvestissement>
 *
 * @method AnneeInvestissement|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnneeInvestissement|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnneeInvestissement[]    findAll()
 * @method AnneeInvestissement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnneeInvestissementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnneeInvestissement::class);
    }

    public function save(AnneeInvestissement $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(AnneeInvestissement $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return AnneeInvestissement[] Returns an array of AnneeInvestissement objects
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

//    public function findOneBySomeField($value): ?AnneeInvestissement
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
