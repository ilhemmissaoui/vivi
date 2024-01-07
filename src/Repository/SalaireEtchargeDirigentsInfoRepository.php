<?php

namespace App\Repository;

use App\Entity\SalaireEtchargeDirigentsInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SalaireEtchargeDirigentsInfo>
 *
 * @method SalaireEtchargeDirigentsInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method SalaireEtchargeDirigentsInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method SalaireEtchargeDirigentsInfo[]    findAll()
 * @method SalaireEtchargeDirigentsInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalaireEtchargeDirigentsInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SalaireEtchargeDirigentsInfo::class);
    }

    public function save(SalaireEtchargeDirigentsInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SalaireEtchargeDirigentsInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    
    public function findOneSalaireEtchargeSocial($SalaireEtchargeSocialDirigents,$Dirigents): array
    {
        return $this->createQueryBuilder('s')
            ->innerJoin('s.salaireEtchargeSocialDirigents', 'sc')
            ->innerJoin('s.collaborateurProjet', 'c')
            ->andWhere('sc.id = :SalaireEtchargeSocialDirigents')
            ->setParameter('SalaireEtchargeSocialDirigents', $SalaireEtchargeSocialDirigents)
            ->andWhere('c.id = :Dirigents')
            ->setParameter('Dirigents', $Dirigents)
           ->select("s.id,s.pourcentageParticipationCapital,s.reparationRenumeratinAnnee,s.beneficier")
            ->getQuery()
            ->getResult()
            ;
    }

//    /**
//     * @return SalaireEtchargeDirigentsInfo[] Returns an array of SalaireEtchargeDirigentsInfo objects
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

//    public function findOneBySomeField($value): ?SalaireEtchargeDirigentsInfo
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
