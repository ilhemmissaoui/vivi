<?php

namespace App\Repository;

use App\Entity\SalaireEtchargeSocial;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SalaireEtchargeSocial>
 *
 * @method SalaireEtchargeSocial|null find($id, $lockMode = null, $lockVersion = null)
 * @method SalaireEtchargeSocial|null findOneBy(array $criteria, array $orderBy = null)
 * @method SalaireEtchargeSocial[]    findAll()
 * @method SalaireEtchargeSocial[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalaireEtchargeSocialRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SalaireEtchargeSocial::class);
    }

    public function save(SalaireEtchargeSocial $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SalaireEtchargeSocial $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


//    /**
//     * @return SalaireEtchargeSocial[] Returns an array of SalaireEtchargeSocial objects
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

//    public function findOneBySomeField($value): ?SalaireEtchargeSocial
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
