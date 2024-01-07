<?php

namespace App\Repository;

use App\Entity\Projet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Projet>
 *
 * @method Projet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Projet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Projet[]    findAll()
 * @method Projet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Projet::class);
    }

    public function save(Projet $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Projet $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllProjetForUser($instanceId): array
    {
        return $this->createQueryBuilder('u')
            ->leftJoin('u.businesModel', 'bm')
            ->leftJoin('u.businessPlan', 'bp')

            ->select('u.id, u.name, u.dateCreation, u.couleurPrincipal,u.couleurSecondaire,u.slogan,u.adressSiegeSocial,u.siret,u.codePostal,u.logo,
                    bm.avancement as businesModelAvancement ,bp.avancement as businessPlanAvancement,
                    bm.laseUpdate as businesModellaseUpdate ,bp.lasteUpdate as businesslaseUpdate
                    ')
            ->andWhere('u.instance = :instanceId')
            ->setParameter('instanceId', $instanceId)
            ->orderBy('u.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
   }

    public function getAllcollaborateur($idProjet): array
    {
        return $this->createQueryBuilder("p")
            ->andWhere('p.id = :idProjet')
            ->setParameter('idProjet', $idProjet)
            ->leftJoin('p.collaborateur', 'c')
            ->select('c.id, c.username, c.email, c.firstname,c.lastname,c.logo')
            ->orderBy('p.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
   }



   public function getIdAllcollaborateurObjets($idProjet): array
    {
        return $this->createQueryBuilder("p")
            ->andWhere('p.id = :idProjet')
            ->setParameter('idProjet', $idProjet)
            ->leftJoin('p.CollaborateurProjet', 'c')
            ->leftJoin('c.user', 'u')
            ->select('u.id')
            ->getQuery()
            ->getResult()
        ;
   }

   public function getAllpartenaire($idProjet): array
    {
        return $this->createQueryBuilder("p")
            ->andWhere('p.id = :idProjet')
            ->setParameter('idProjet', $idProjet)
            ->leftJoin('p.partenaires', 'pa')
            ->select('pa.id,pa.NomSociete,pa.siteWeb,pa.telephone,pa.email,pa.adresse,pa.service,pa.description,pa.secteurActivite,pa.logo,pa.photoCouvert')
            ->andWhere('pa.deleted = 0')
            ->orderBy('p.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
   }

//    /**
//     * @return Projet[] Returns an array of Projet objects
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

//    public function findOneBySomeField($value): ?Projet
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
