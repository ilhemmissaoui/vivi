<?php

namespace App\Controller;

use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/api/login', name: 'app_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        //$user = new Client;
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
       
        return $this->json([
            'username' => $lastUsername,
            'error' => $error,
        ]);
    }

    #[Route(path: '/api/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route('/admin/login', name: 'admin_login')]
    public function loginAdmin(AuthenticationUtils $authenticationUtils): Response
    {   
        if ($this->getUser()) {
            return $this->redirectToRoute('sonata_admin_dashboard');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
       
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('admin/security/loginAdmin.html.twig', ['last_username' => $lastUsername, 'error' => $error]);

    }

    #[Route('/admin/logout', name: 'admin_logout')]
    public function logoutAdmin(): void
    {     
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
