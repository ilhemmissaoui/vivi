<?php

namespace App\Controller\Admin;


use App\Entity\Client;
use App\Entity\CollaborateurProjet;
use App\Entity\Instance;
use App\Entity\User;
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

class UserAdminController extends AbstractController
{
    private $vivitoolsService;
    private $UserRepository;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine, vivitoolsService $vivitoolsService, UserRepository $UserRepository)
    {
        $this->vivitoolsService = $vivitoolsService;
        $this->UserRepository = $UserRepository;
        $this->doctrine = $doctrine;
    }

    #[Route('/admin/user/deleted/{id}', name: 'admin_user_deleted')]
    public function deletedUser(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {

        if ($user) {
            
            $user->setEmail($user->getEmail()."_".$user->getId() . "_deletd");
            $user->setToken($this->vivitoolsService->generatetoken(26) . "_deletd");
            $user->setDeleted(true);
            $projets = $user->getInstance()->getProjets();
            $entityManager->flush();

            foreach ($projets as $proj) {
                $proj->setDeleted(1);
                $entityManager->flush();
            }

            foreach ($user->getCollaborateurProjet() as $collaborateur) {
                $collaborateur->setDeleted(1);
                $entityManager->flush();

            }
        }

        return $this->redirect('/admin/app/user/list');
    }
}
