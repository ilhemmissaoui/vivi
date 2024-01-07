<?php

namespace App\Repository;

use App\Entity\MontantCExt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MontantCExt>
 *
 * @method MontantCExt|null find($id, $lockMode = null, $lockVersion = null)
 * @method MontantCExt|null findOneBy(array $criteria, array $orderBy = null)
 * @method MontantCExt[]    findAll()
 * @method MontantCExt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MontantCExtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MontantCExt::class);
    }

    public function save(MontantCExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MontantCExt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    

    public function getAllMontantCExt($financementEtCharges): array
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.FinancementEtCharges', 'f')
            ->andWhere('f.id = :financementEtCharges')
            ->setParameter('financementEtCharges', $financementEtCharges)
            ->andWhere('m.deleted = 0')
            ->select('m.id,m.name')            
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return MontantCExt[] Returns an array of MontantCExt objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MontantCExt
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
