<?php

namespace App\Controller\Admin;


use App\Entity\Client;
use App\Entity\CollaborateurProjet;
use App\Entity\Instance;
use App\Entity\Partenaires;
use App\Entity\User;
use App\Repository\PartenairesRepository;
use App\Repository\UserRepository;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class PartenaireAdminController extends AbstractController
{
    private $vivitoolsService;
    private $PartenairesRepository;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine, vivitoolsService $vivitoolsService, PartenairesRepository $PartenairesRepository)
    {
        $this->vivitoolsService = $vivitoolsService;
        $this->PartenairesRepository = $PartenairesRepository;
        $this->doctrine = $doctrine;
    }

    #[Route('/admin/partenaire/deleted/{id}', name: 'admin_partenaire_deleted')]
    public function deletedPartenaires(Request $request, Partenaires $Partenaires, EntityManagerInterface $entityManager): Response
    {

        if ($Partenaires) {
            $Partenaires->setDeleted(true);            
            $entityManager->flush(); 
        }

        return $this->redirect('/admin/app/partenaires/list');
    }
}
