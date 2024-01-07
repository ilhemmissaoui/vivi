<?php

namespace App\Repository;

use App\Entity\HistoireEtEquipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HistoireEtEquipe>
 *
 * @method HistoireEtEquipe|null find($id, $lockMode = null, $lockVersion = null)
 * @method HistoireEtEquipe|null findOneBy(array $criteria, array $orderBy = null)
 * @method HistoireEtEquipe[]    findAll()
 * @method HistoireEtEquipe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HistoireEtEquipeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HistoireEtEquipe::class);
    }

    public function save(HistoireEtEquipe $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(HistoireEtEquipe $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    public function getOneEquipes($IdhistoireEtEquipe,$membreEquipeId): array
    {
        return $this->createQueryBuilder("h")
            ->andWhere('h.id = :IdhistoireEtEquipe')
            ->setParameter('IdhistoireEtEquipe', $IdhistoireEtEquipe)
            ->leftJoin('h.equipe', 'e')
            ->select('e.id, e.name, e.diplome,e.caracteristique,e.role,e.dateCreation,e.photo')
            ->andWhere('e.id = :membreEquipeId')
            ->setParameter('membreEquipeId', $membreEquipeId)
            ->getQuery()
            ->getResult()
        ;
   }
    public function getAllEquipes($IdhistoireEtEquipe): array
    {
        return $this->createQueryBuilder("h")
            ->andWhere('h.id = :IdhistoireEtEquipe')
            ->setParameter('IdhistoireEtEquipe', $IdhistoireEtEquipe)
            ->leftJoin('h.equipe', 'e')
            ->select('e.id, e.name, e.diplome,e.caracteristique,e.role,e.dateCreation,e.photo')
            ->getQuery()
            ->getResult()
        ;
   }
   public function getAllDirigents($IdhistoireEtEquipe): array
    {
        return $this->createQueryBuilder("h")
            ->andWhere('h.id = :IdhistoireEtEquipe')
            ->setParameter('IdhistoireEtEquipe', $IdhistoireEtEquipe)
            ->leftJoin('h.equipe', 'e')
            ->andWhere('e.Dirigeant = :roleDirigent')
            ->setParameter('roleDirigent', '1')
            ->select('e.id, e.name, e.diplome,e.caracteristique,e.role,e.dateCreation,e.photo')
            ->getQuery()
            ->getResult()
        ;
   }

//    /**
//     * @return HistoireEtEquipe[] Returns an array of HistoireEtEquipe objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?HistoireEtEquipe
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
