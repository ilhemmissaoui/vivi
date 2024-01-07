<?php

namespace App\Repository;

use App\Entity\MarcheEtConcurrence;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MarcheEtConcurrence>
 *
 * @method MarcheEtConcurrence|null find($id, $lockMode = null, $lockVersion = null)
 * @method MarcheEtConcurrence|null findOneBy(array $criteria, array $orderBy = null)
 * @method MarcheEtConcurrence[]    findAll()
 * @method MarcheEtConcurrence[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarcheEtConcurrenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MarcheEtConcurrence::class);
    }

    public function save(MarcheEtConcurrence $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MarcheEtConcurrence $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    
    public function getSocieteByMarcheEtConcurrenceId($MarcheEtConcurrenceId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :MarcheEtConcurrenceId')
            ->setParameter('MarcheEtConcurrenceId', $MarcheEtConcurrenceId)
            ->innerJoin('c.societe', 'a')
            ->select('a.id, a.name, a.pointFort,a.pointFaible,a.pointFaible,a.directIndirect,a.taille,a.effectif,a.CA,a.logo')
            ->andWhere('a.deleted = 0')
            ->andWhere('a.marcheEtConcurrence = :MarcheEtConcurrenceId')
            ->setParameter('MarcheEtConcurrenceId', $MarcheEtConcurrenceId)
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return MarcheEtConcurrence[] Returns an array of MarcheEtConcurrence objects
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

//    public function findOneBySomeField($value): ?MarcheEtConcurrence
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
