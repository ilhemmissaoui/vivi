<?php

namespace App\Repository;

use App\Entity\Solution;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Solution>
 *
 * @method Solution|null find($id, $lockMode = null, $lockVersion = null)
 * @method Solution|null findOneBy(array $criteria, array $orderBy = null)
 * @method Solution[]    findAll()
 * @method Solution[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SolutionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Solution::class);
    }

    public function save(Solution $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Solution $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getSolutionWithProjetAnnee($idNotreSolution,$idProjetAnnees): array
    {
        return $this->createQueryBuilder('s')
           
            ->andWhere('s.deleted = 0')
            ->innerJoin('s.notreSolution', 'ns')

            ->andWhere('ns.id = :idNotreSolution')
            ->setParameter('idNotreSolution', $idNotreSolution)

            ->innerJoin('s.projetAnnees', 'pa')
            ->andWhere('pa.id = :idProjetAnnees')
            ->setParameter('idProjetAnnees', $idProjetAnnees)


            ->getQuery()
            ->getResult()
        ;
    }


    public function getSolutionWithProjetAnneePagination($idNotreSolution,$idProjetAnnees,$limit,$offset): array
    {
        return $this->createQueryBuilder('s')
           
            ->andWhere('s.deleted = 0')
            ->innerJoin('s.notreSolution', 'ns')

            ->andWhere('ns.id = :idNotreSolution')
            ->setParameter('idNotreSolution', $idNotreSolution)

            ->innerJoin('s.projetAnnees', 'pa')
            ->andWhere('pa.id = :idProjetAnnees')
            ->setParameter('idProjetAnnees', $idProjetAnnees)
        
            ->setFirstResult($offset)
            ->setMaxResults($limit)

            ->getQuery()
            ->getResult()
        ;
    }
    public function getRevenusBySolutionId($SolutionId): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.id = :SolutionId')
            ->setParameter('SolutionId', $SolutionId)
            ->andWhere('s.deleted = 0')
            ->innerJoin('s.revenus', 'r')
            ->select('r.id, r.name, r.prixVenteHT,r.VolumeVente')
            ->orderBy('r.id', 'desc')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return Solution[] Returns an array of Solution objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Solution
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
