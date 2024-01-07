<?php

namespace App\Repository;

use App\Entity\CollaborateurProjet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CollaborateurProjet>
 *
 * @method CollaborateurProjet|null find($id, $lockMode = null, $lockVersion = null)
 * @method CollaborateurProjet|null findOneBy(array $criteria, array $orderBy = null)
 * @method CollaborateurProjet[]    findAll()
 * @method CollaborateurProjet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CollaborateurProjetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CollaborateurProjet::class);
    }

    public function save(CollaborateurProjet $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CollaborateurProjet $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }



   public function findOneCollaborateurProjetBySalaireEtchargeSocialArray($idCollaborateur,$SalaireEtchargeSocial)
   {
       return $this->createQueryBuilder('u')
           ->andWhere(' u.id = :id')
            ->setParameter('id',$idCollaborateur)
          ->innerJoin('u.SalaireEtchargeSocial', 'sa')

            ->andWhere(' sa.id = :SalaireEtchargeSocial')
            ->setParameter('SalaireEtchargeSocial',$SalaireEtchargeSocial)
           ->leftJoin('u.user', 'c')
           ->andWhere(' u.deleted = 0')
           ->leftJoin('u.salarie', 's')
           ->leftJoin('u.salaireEtchargeCollaborateurInfos', 'ci')
           ->innerJoin('u.projet', 'p')

           ->select('u.id as idCollaborateur,c.photoProfil, c.firstname, c.lastname, c.username,c.email ,u.firstename as SalarieFirsteName,u.lastname as SalarieLasteName,u.username as SalarieUserName,ci.id as collaborateurInfoId,ci.salaireBrut,ci.typeContrat,ci.chargeSocial ,p.id as ProjetId')
           ->orderBy('u.id', 'ASC')
           ->getQuery()
           ->getResult()
       ;
  }

  public function findOneCollaborateurProjetBySalaireEtchargeSocialObjet($idCollaborateur, $SalaireEtchargeSocial)
  {
      $q = $this->createQueryBuilder('u')
          ->andWhere('u.id = :idCollaborateur')
          ->setParameter('idCollaborateur', $idCollaborateur)
          ->innerJoin('u.SalaireEtchargeSocial', 's')
          ->andWhere('s.id = :SalaireEtchargeSocialObjet')
          ->setParameter('SalaireEtchargeSocialObjet', $SalaireEtchargeSocial)
          ->andWhere('u.deleted = 0');
          return $q->getQuery()
          ->getResult();
  }

    public function findAllCollaborateurProjet($projetId, $salarie = false, $dirigeant = null): array
    {
        $q = $this->createQueryBuilder('u')
            ->innerJoin('u.projet', 'p')
            ->andWhere(' p.id = :projetId')
            ->setParameter('projetId', $projetId)
            ->leftJoin('u.user', 'c')
            ->andWhere(' u.deleted = 0');

        if ($salarie !== null) {

            $q->andWhere(' u.IsSalarie = :salarie')
                ->setParameter('salarie', $salarie)
                ->andWhere('c.id IS NOT NULL');
        }

        if ($dirigeant !== null) {
            $q->andWhere(' u.Dirigeant = :dirigeant')
                ->setParameter('dirigeant', $dirigeant)
                ->andWhere('c.id IS NOT NULL');
        }

        return $q->select('u.id as idCollaborateur,c.photoProfil, c.firstname, c.lastname, c.username,c.email,u.pagePermission,c.tele,u.diplome,u.role,u.caracteristique,u.dateCreation,u.role,u.Dirigeant,u.IsSalarie,u.firstename as SalarieFirsteName,u.username as SalarieUserName,u.lastname as SalarieLasteName ,p.id as ProjetId')
        ->orderBy('u.id', 'ASC')->getQuery()
        ->getResult()
    ;
 }


 public function findOneCollaborateurProjetBySalaireEtchargeSocialDirigieantObjet($idCollaborateur, $SalaireEtchargeSocialDirigeant)
 {
     $q = $this->createQueryBuilder('u')
         ->andWhere('u.id = :idCollaborateur')
         ->setParameter('idCollaborateur', $idCollaborateur)
         ->innerJoin('u.salaireEtchargeSocialDirigents', 's')
         ->andWhere('s.id = :SalaireEtchargeSocialDirigeant')
         ->setParameter('SalaireEtchargeSocialDirigeant', $SalaireEtchargeSocialDirigeant)
         ->andWhere('u.deleted = 0');
         return $q->getQuery()
         ->getResult();
 }

    public function findMembreEquipeProjet($projetId): array
    {
        $q = $this->createQueryBuilder('u')
            ->innerJoin('u.projet', 'p')
            ->andWhere('p.id = :projetId')
            ->setParameter('projetId',$projetId)
            ->andWhere('u.Equipe = 1')

            ->leftJoin('u.user', 'c')
            ->andWhere('u.deleted = 0');

        return $q->select('u.id as idCollaborateur,c.photoProfil, c.firstname, c.lastname, c.username,c.email,c.tele,u.diplome,u.role,u.caracteristique,u.dateCreation,u.Dirigeant,u.IsSalarie,u.firstename as SalarieFirsteName,u.username as SalarieUserName,u.lastname as SalarieLasteName,u.email as SalarieEmail  ,p.id as ProjetId')
        ->orderBy('u.id', 'ASC')->getQuery()
        ->getResult()
    ;
    }


   public function findOneCollaborateurProjet($idcollaborateur,$projetId,$salarie = false,$dirigeant = null): array
    {
        $q = $this->createQueryBuilder('u')
            ->innerJoin('u.projet', 'p')
            ->andWhere(' p.id = :projetId')
            ->setParameter('projetId',$projetId)
            ->leftJoin('u.user', 'c')
            ->andWhere(' u.deleted = 0')
            ->andWhere(' u.id = :idcollaborateur')
            ->setParameter('idcollaborateur',$idcollaborateur);
            
        if($salarie !== null){           
            $q->andWhere(' u.IsSalarie = :salarie')
            ->setParameter('salarie',$salarie);
        }

        if($dirigeant !== null){                  
            $q->andWhere(' u.Dirigeant = :dirigeant')
            ->setParameter('dirigeant',$dirigeant);
        }
        
        return $q ->select('u.id as idCollaborateur,c.photoProfil, c.firstname, c.lastname, c.username,c.email,c.tele,u.diplome,u.role,u.Dirigeant,u.caracteristique,u.dateCreation,u.firstename as SalarieFirsteName,u.lastname as SalarieLasteName,u.username as SalarieUserName,p.id as ProjetId')
            ->orderBy('u.id', 'ASC')
            ->getQuery()
            ->getResult();
   }

    public function findAllSalaireEtchargeSocialDirigeantInfo($SalaireEtchargeSocialDirigents)
    {
        return $this->createQueryBuilder('u')

            ->leftJoin('u.salaireEtchargeSocialDirigents', 'sa')
            ->andWhere(' sa.id = :SalaireEtchargeSocialDirigents')
            ->setParameter('SalaireEtchargeSocialDirigents', $SalaireEtchargeSocialDirigents)
            ->leftJoin('u.user', 'c')
            ->andWhere(' u.deleted = 0')

            ->leftJoin('sa.SalaireEtchargeDirigentsInfo', 'ci')
            ->leftJoin(' ci.salaireEtchargeSocialDirigents',"saInfo")
            ->setParameter('SalaireEtchargeSocialDirigents', $SalaireEtchargeSocialDirigents)

            ->leftJoin('u.projet', 'p')

            ->select('u.id as idCollaborateur,c.photoProfil, c.firstname, c.lastname, c.username,c.email ,ci.id as InfoId,ci.pourcentageParticipationCapital,ci.reparationRenumeratinAnnee,ci.beneficier ,p.id as ProjetId')
            ->orderBy('u.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function getListCollaborateurProjetNotEquipe($projetId){
        return $this->createQueryBuilder('u')
        ->innerJoin('u.projet', 'p')
        ->andWhere('p.id = :projetId')
        ->setParameter('projetId',$projetId)
        ->andWhere('u.Equipe = 0')

        ->innerJoin('u.user', 'c')
        ->andWhere('u.deleted = 0')
        ->orderBy('u.id', 'ASC')
            ->getQuery()
            ->getResult();
    }


    //    /**
    //     * @return CollaborateurProjet[] Returns an array of CollaborateurProjet objects
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

    //    public function findOneBySomeField($value): ?CollaborateurProjet
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
