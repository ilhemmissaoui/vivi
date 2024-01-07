<?php

namespace App\Repository;

use App\Entity\FinancementEtCharges;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FinancementEtCharges>
 *
 * @method FinancementEtCharges|null find($id, $lockMode = null, $lockVersion = null)
 * @method FinancementEtCharges|null findOneBy(array $criteria, array $orderBy = null)
 * @method FinancementEtCharges[]    findAll()
 * @method FinancementEtCharges[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FinancementEtChargesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FinancementEtCharges::class);
    }

    public function save(FinancementEtCharges $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(FinancementEtCharges $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return FinancementEtCharges[] Returns an array of FinancementEtCharges objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FinancementEtCharges
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
