<?php

namespace App\Repository;

use App\Entity\InvestissementMontant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InvestissementMontant>
 *
 * @method InvestissementMontant|null find($id, $lockMode = null, $lockVersion = null)
 * @method InvestissementMontant|null findOneBy(array $criteria, array $orderBy = null)
 * @method InvestissementMontant[]    findAll()
 * @method InvestissementMontant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvestissementMontantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InvestissementMontant::class);
    }

    public function save(InvestissementMontant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(InvestissementMontant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return InvestissementMontant[] Returns an array of InvestissementMontant objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?InvestissementMontant
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
