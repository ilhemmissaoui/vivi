<?php

namespace App\Repository;

use App\Entity\ProjetAnnees;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProjetAnnees>
 *
 * @method ProjetAnnees|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProjetAnnees|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProjetAnnees[]    findAll()
 * @method ProjetAnnees[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjetAnneesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProjetAnnees::class);
    }

    public function findProjetAnnees($FinancementEtCharges): array
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.FinancementEtCharges','f')
            ->andWhere('m.deleted = 0')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)
            ->orderBy('m.id', 'DESC')

            ->select("m.id,m.annee as name")
            ->getQuery()
            ->getResult()
        ;
    }

    public function findProjetAnneesChargeExt($FinancementEtCharges,$financementDepense): array
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.FinancementEtCharges','f')
            ->andWhere('m.deleted = 0')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)


            ->innerJoin('m.financementDepense', 'fd')
            ->andWhere('fd.id = :financementDepense')
            ->setParameter('financementDepense', $financementDepense)
            ->orderBy('m.id', 'DESC')


            ->select("m.id,m.annee as name")
            ->getQuery()
            ->getResult()
        ;
    }
    public function findProjetAnneesChiffreAffaire($FinancementEtCharges, $FinancementChiffreAffaire): array
    {
        return $this->createQueryBuilder('m')

            ->andWhere('m.deleted = 0')

            ->innerJoin('m.FinancementEtCharges', 'f')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)

            ->innerJoin('m.financementChiffreAffaire', 'fa')
            ->andWhere('fa.id = :FinancementChiffreAffaire')
            ->setParameter('FinancementChiffreAffaire', $FinancementChiffreAffaire)
            ->orderBy('m.id', 'DESC')
            ->select("m.id,m.annee as name")
            ->getQuery()
            ->getResult();
    }



//    /**
//     * @return ProjetAnnees[] Returns an array of ProjetAnnees objects
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

//    public function findOneBySomeField($value): ?ProjetAnnees
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
