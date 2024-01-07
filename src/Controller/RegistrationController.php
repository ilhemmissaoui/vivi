<?php

namespace App\Controller;

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

class RegistrationController extends AbstractController
{
    private $vivitoolsService;
    private $UserRepository;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine,vivitoolsService $vivitoolsService, UserRepository $UserRepository)
    {
        $this->vivitoolsService = $vivitoolsService;
        $this->UserRepository = $UserRepository;
        $this->doctrine = $doctrine;

    }
    
    #[Route('/api/registration', name: 'app_registration', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        if ($content = $request->getContent()) {
            $informationuser = json_decode($content, true);
        }else{
            return new Response("error");
        }

        
        if($this->vivitoolsService->veruficationPassword($informationuser['password']) == false){
            return new Response("password invalid ",400); 
        }
        
        if($this->vivitoolsService->verificationEmail($informationuser['email']) == false){
            return new Response("email invalid ",400); 
        }

        $userExist = $this->UserRepository->findOneBy(["email" => $informationuser['email']]);

        if($userExist){
            return new Response("Email déjà existant",400);
        }
        $date = new DateTime();

        $user = new User();
        $user->setFirstname($informationuser['firstname']);
        $user->setLastname($informationuser['lastename']);
        $user->setEmail($informationuser['email']);
        $user->setUsername($informationuser['lastename']." ".$informationuser['firstname']);

        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $informationuser['password']
            )
        );
        
        $token = $this->vivitoolsService->generatetoken();
        $user->setToken($token);
        $user->setDateCreation($date);
        $user->setRoles(['ROLE_USER']);
        
        $entityManager->persist($user);      
        
        $instance = new Instance();
        $instance->setUser($user);
        $reference = $this->vivitoolsService->generatetoken(8);
        $instance->setReference($reference);

        $instance->setDateCreation($date);
        $entityManager->persist($instance);      

        $entityManager->flush();
        
        $collaborateurExiste = $this->doctrine->getRepository(CollaborateurProjet::class)->findBy(["email" =>  $user->getEmail(), "deleted" => 0]);
        
        foreach ($collaborateurExiste as $collaborateur) {
            $collaborateur->setUser($user);
            $collaborateur->setFirstename(null);
            $collaborateur->setEmail(null);
            $collaborateur->setLastname(null);
            $collaborateur->setUsername(null);
            $entityManager->flush();
        }

        return new Response(200);
    }
}
