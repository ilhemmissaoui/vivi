<?php

namespace App\Repository;

use App\Entity\SalaireEtchargeCollaborateurInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SalaireEtchargeCollaborateurInfo>
 *
 * @method SalaireEtchargeCollaborateurInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method SalaireEtchargeCollaborateurInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method SalaireEtchargeCollaborateurInfo[]    findAll()
 * @method SalaireEtchargeCollaborateurInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalaireEtchargeCollaborateurInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SalaireEtchargeCollaborateurInfo::class);
    }

    public function save(SalaireEtchargeCollaborateurInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SalaireEtchargeCollaborateurInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

        public function getOneCollaborateurInfo($collaborateurId,$salaireEtchargeSocialId): array
        {
            return $this->createQueryBuilder('s')
                ->innerJoin('s.CollaborateurProjet', 'c')
                ->andWhere('c.id = :collaborateurId')
                ->setParameter('collaborateurId', $collaborateurId)

                ->innerJoin('s.SalaireEtchargeSocial', 'sc')
                ->andWhere('sc.id = :salaireEtchargeSocialId')
                ->setParameter('salaireEtchargeSocialId', $salaireEtchargeSocialId)
                ->select("s.id,s.salaireBrut,s.typeContrat,s.chargeSocial")
                ->getQuery()
                ->getResult()
            ;
        }

        public function getOneCollaborateurInfoObjet($collaborateurId,$salaireEtchargeSocialId): array
        {
            return $this->createQueryBuilder('s')
                ->innerJoin('s.CollaborateurProjet', 'c')
                ->andWhere('c.id = :collaborateurId')
                ->setParameter('collaborateurId', $collaborateurId)
                ->innerJoin('s.SalaireEtchargeSocial', 'sc')
                ->andWhere('sc.id = :salaireEtchargeSocialId')
                ->setParameter('salaireEtchargeSocialId', $salaireEtchargeSocialId)
                ->getQuery()
                ->getResult()
            ;
        }

//    /**
//     * @return SalaireEtchargeCollaborateurInfo[] Returns an array of SalaireEtchargeCollaborateurInfo objects
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

//    public function findOneBySomeField($value): ?SalaireEtchargeCollaborateurInfo
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
