<?php

namespace App\Repository;

use App\Entity\ChiffreAffaireActivite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ChiffreAffaire>
 *
 * @method ChiffreAffaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChiffreAffaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChiffreAffaire[]    findAll()
 * @method ChiffreAffaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChiffreAffaireActiviteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChiffreAffaireActivite::class);
    }

    public function save(ChiffreAffaireActivite $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ChiffreAffaireActivite $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findChiffreAffaireActivite($FinancementEtCharges,$FinancementChiffreAffaire): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.financementEtCharges','f')
            ->andWhere('c.deleted = 0')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)

            ->innerJoin('c.financementChiffreAffaire', 'fa')
            ->andWhere('fa.id = :FinancementChiffreAffaire')
            ->setParameter('FinancementChiffreAffaire', $FinancementChiffreAffaire)

            ->orderBy('c.id', 'ASC')
            ->select("c.id,c.name")
            ->getQuery()
            ->getResult()
        ;
    }



    public function findChiffreAffaireActiviteSumMonth($FinancementEtCharges,$FinancementChiffreAffaire): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.financementEtCharges','f')
            ->andWhere('c.deleted = 0')
            ->andWhere('f.id = :FinancementEtCharges')
            ->setParameter('FinancementEtCharges', $FinancementEtCharges)

            ->innerJoin('c.financementChiffreAffaire', 'fa')
            ->andWhere('fa.id = :FinancementChiffreAffaire')
            ->setParameter('FinancementChiffreAffaire', $FinancementChiffreAffaire)


            ->innerJoin('c.MonthListeChiffreAffaire', 'm')
            


            ->orderBy('c.id', 'ASC')
            //->groupBy('c.id')
            ->select("c.id,c.name,m.Valeur as total")
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return ChiffreAffaire[] Returns an array of ChiffreAffaire objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ChiffreAffaire
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
