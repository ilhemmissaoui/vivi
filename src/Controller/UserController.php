<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\SendEmail;
use App\Service\vivitoolsService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends AbstractController
{
    private $UserRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;

    public function __construct(SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/user/edit-profil', name: 'infoProfil', methods: ['GET'])]
    public function infoProfil(Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        return $this->json([
            'firstname' => $user->getFirstname(),
            'lastename' => $user->getLastname(),
            'email' => $user->getEmail(),
            'photoProfil' => $user->getPhotoProfil()
        ]);
    }


    #[Route('/api/user/edit-profil', name: 'edit-profil', methods: ['PUT'])]
    public function index(UserPasswordHasherInterface $userPasswordHasher, Request $request): Response
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());


        if ($informationuser) {
            if (isset($informationuser['firstname']) and $informationuser['firstname'] != "") {
                $user->setFirstname($informationuser['firstname']);
            }

            if (isset($informationuser['lastename']) and $informationuser['lastename'] != "") {
                $user->setLastname($informationuser['lastename']);
            }

            if (isset($informationuser['email']) and $informationuser['email'] != "") {

                if ($this->vivitoolsService->verificationEmail($informationuser['email']) == false) {
                    return new Response("email invalid ", 400);
                }

                $userExist = $this->UserRepository->findOneBy(["email" => $informationuser['email']]);

                if ($userExist and $user->getEmail() != $informationuser['email']) {
                    return new Response("Email déjà existant", 101);
                }

                $user->setEmail($informationuser['email']);
            }

            if (isset($informationuser['photoProfil']) and $informationuser['photoProfil'] != "") {
                $firstPosition = strpos($informationuser['photoProfil'], "/");
                $lastPosition = strpos($informationuser['photoProfil'], ";");
                $extension = substr($informationuser['photoProfil'], $firstPosition + 1, $lastPosition - $firstPosition - 1);

                if (!in_array($extension, ["png", "jpg", "jpeg"])) {
                    return new Response($extension . " est interdit", 403);
                }

                $user->setPhotoProfil($informationuser['photoProfil']);
            }

            if (isset($informationuser['lastpassword']) and $informationuser['lastpassword'] != "") {
                $lasstpasswordValide = true;
                if (!$userPasswordHasher->isPasswordValid($user, $informationuser['lastpassword'])) {
                    $lasstpasswordValide = false;
                    return new Response("Votre ancien mot de passe incorrect", 102);
                }

                if (isset($informationuser['newpassword']) and $informationuser['newpassword'] != "" and $lasstpasswordValide == true) {

                    if ($this->vivitoolsService->veruficationPassword($informationuser['newpassword']) == false) {
                        return new Response("password invalid ", 400);
                    }

                    $user->setPassword(
                        $userPasswordHasher->hashPassword(
                            $user,
                            $informationuser['newpassword']
                        )
                    );
                }
            }
            $this->entityManager->flush();
        }
        return new Response('', 201);
    }


    #[Route('/api/user/forgot-password/send-email', name: 'forgotpasswordEmail')]
    public function forgotpasswordEmail(Request $request): Response
    {
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if ($informationuser) {
            if (isset($informationuser['email']) and $informationuser['email'] != "") {
                $user = $this->UserRepository->findOneBy(["email" => $informationuser['email']]);

                if ($user) {
                    $tokenSecurite = $this->vivitoolsService->generatetoken();
                    
                    $user->setTokenSecurite($tokenSecurite);
                    
                    $token = $this->vivitoolsService->generatetoken();
                    $user->setToken($token);
                    
                    $this->entityManager->flush();

                    $html = $this->renderView("email/forgetPassword.html.twig", [
                        "email" => $user->getUsername(),
                        "token" => $tokenSecurite
                    ]);

                    $status = $this->sendEmail->sendEmail("Réinitialiser votre mot de passe Vivitools", $user->getEmail(), $html);
                } else {
                    return new Response("utilisateur introuvable", 400);
                }
            } else {
                return new Response("utilisateur introuvable", 400);
            }
        }else {
            return new Response("utilisateur introuvable", 400);
        }
        return new Response($status[0], $status[1]);
    }


    #[Route('/api/user/forgot-password/change', name: 'changeMotPasseWithToken', methods: ['POST'])]
    public function changeMotPasseWithToken(Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $token = $informationuser['token'];
        $user = $this->UserRepository->findOneBy(["tokenSecurite" => $token]);
        if ($user) {
            $tokenSecurite = $this->vivitoolsService->generatetoken();
            
            $user->setTokenSecurite($tokenSecurite);

            $token = $this->vivitoolsService->generatetoken();

            $user->setToken($token);


            if (isset($informationuser['newpassword']) and $informationuser['newpassword'] != "") {

                if ($this->vivitoolsService->veruficationPassword($informationuser['newpassword']) == false) {
                    return new Response("password invalid ", 400);
                }

                $user->setPassword(
                    $userPasswordHasher->hashPassword(
                        $user,
                        $informationuser['newpassword']
                    )
                );
            }
            $this->entityManager->flush();
        } else {
            return new Response("utilisateur introuvable", 400);
        }
        return new Response("ok");
    }

    #[Route('/api/all-user', name: 'GetAllUser', methods: ['GET'])]
    public function GetAllUser(Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $users = $this->UserRepository->findAllUserWitheOutUserconnect($user->getId());
        if (count($users) == 0) {
            return new Response('user not found', 400);
        }
        return $this->json($users);
    }
}
