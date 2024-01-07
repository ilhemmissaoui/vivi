<?php

namespace App\Repository;

use App\Entity\SalaireEtchargeSocialDirigents;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SalaireEtchargeSocialDirigents>
 *
 * @method SalaireEtchargeSocialDirigents|null find($id, $lockMode = null, $lockVersion = null)
 * @method SalaireEtchargeSocialDirigents|null findOneBy(array $criteria, array $orderBy = null)
 * @method SalaireEtchargeSocialDirigents[]    findAll()
 * @method SalaireEtchargeSocialDirigents[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalaireEtchargeSocialDirigentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SalaireEtchargeSocialDirigents::class);
    }

    public function save(SalaireEtchargeSocialDirigents $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SalaireEtchargeSocialDirigents $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return SalaireEtchargeSocialDirigents[] Returns an array of SalaireEtchargeSocialDirigents objects
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

//    public function findOneBySomeField($value): ?SalaireEtchargeSocialDirigents
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
