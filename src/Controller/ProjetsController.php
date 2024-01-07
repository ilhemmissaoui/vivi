<?php

namespace App\Controller;

use App\Admin\projetAdmin;
use App\Entity\BusinesModel;
use App\Entity\BusinessPlan;
use App\Entity\CollaborateurInstance;
use App\Entity\CollaborateurProjet;
use App\Entity\CollaborateurUser;
use App\Entity\Projet;
use App\Entity\User;
use App\Repository\CollaborateurProjetRepository;
use App\Repository\ProjetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Service\SendEmail;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class ProjetsController extends AbstractController
{
    private $UserRepository;
    private $ProjetRepository;
    private $CollaborateurProjetRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine, CollaborateurProjetRepository $CollaborateurProjetRepository, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {

        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->CollaborateurProjetRepository = $CollaborateurProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
    }

    #[Route('/api/projet/{idProjet}', name: 'getProjet', methods: ['GET'])]
    public function getProjet(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }
        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance()]);

        if (!$projet) {
            $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet]);
            $collaborateurProjet = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["user" => $user, "projet" => $projet]);
            if (!$collaborateurProjet) {
                return $this->json([]);
            }
        }

        if (!$projet) {
            return $this->json([]);
        }

        $listeOfcollaborateur =  $this->CollaborateurProjetRepository->findAllCollaborateurProjet($projet->getId());

        $listUserForCollaborateur = $this->getUserNotInListeCollaboorateurProjet($projet->getId(), $user, 1);
        $projet = [
            "id" => $projet->getId(),
            "name" => $projet->getName(),
            "DateCreation" => $projet->getDateCreation(),
            "couleurPrincipal" => $projet->getCouleurPrincipal(),
            "couleurSecondaire" => $projet->getCouleurSecondaire(),
            "slogan" => $projet->getSlogan(),
            "adressSiegeSocial" => $projet->getAdressSiegeSocial(),
            "siret" => $projet->getSiret(),
            "codePostal" => $projet->getCodePostal(),
            "businesModelAvancement" => $this->vivitoolsService->calcAvancement($projet?->getBusinesModel()?->getAvancement(), 9),
            "businessPlanAvancement" => $this->vivitoolsService->calcAvancementBusinessPlan($projet->getBusinessPlan()),
            "businesModellaseUpdate" => $projet->getBusinesModel()->getLaseUpdate(),
            "businesslaseUpdate" => $projet->getBusinessPlan()->getLasteUpdate(),
            "listeOfcollaborateur" => $listeOfcollaborateur,
            "listUserForCollaborateur" => $listUserForCollaborateur,
            "logo" => $projet->getLogo()
        ];

        if (isset($collaborateurProjet)) {
            $projet["permissionListe"] = $collaborateurProjet->getPagePermission();
        }
        return $this->json($projet);
    }

    #[Route('/api/projet-all/', name: 'getAllUserProjet', methods: ['GET'])]
    public function getAllUserProjet(Request $request)
    {

        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $projetListe = [];
        $projets = $this->ProjetRepository->findBy(["deleted" => 0, "instance" => $user->getInstance()], ["id" => 'DESC']);

        foreach ($projets as $projet) {

            $listUserForCollaborateur = $this->getUserNotInListeCollaboorateurProjet($projet->getId(), $user, 1);

            $listeOfcollaborateur =  $this->CollaborateurProjetRepository->findAllCollaborateurProjet($projet->getId());

            $projetListe[] = [
                "id" => $projet->getId(),
                "name" => $projet->getName(),
                "dateCreation" => $projet->getDateCreation(),
                "couleurPrincipal" => $projet->getCouleurPrincipal(),
                "couleurSecondaire" => $projet->getCouleurSecondaire(),
                "slogan" => $projet->getSlogan(),
                "adressSiegeSocial" => $projet->getAdressSiegeSocial(),
                "siret" => $projet->getSiret(),
                "codePostal" => $projet->getCodePostal(),
                "businesModelAvancement" => $this->vivitoolsService->calcAvancement($projet?->getBusinesModel()?->getAvancement(), 9),
                "businessPlanAvancement" => $this->vivitoolsService->calcAvancementBusinessPlan($projet?->getBusinessPlan()),
                "businesModellaseUpdate" => $projet->getBusinesModel()?->getLaseUpdate(),
                "businesslaseUpdate" => $projet->getBusinessPlan()?->getLasteUpdate(),
                "listeOfcollaborateur" => $listeOfcollaborateur,
                "listUserForCollaborateur" => $listUserForCollaborateur,
                "logo" => $projet->getLogo()

            ];
        }

        $listeProjetCollaborateurs = $user->getCollaborateurProjet();
        foreach ($listeProjetCollaborateurs as $listeProjetCollaborateur) {
            $projetForCollaborateur = $listeProjetCollaborateur->getProjet();
            $projetListe[] = [
                "id" => $projetForCollaborateur->getId(),
                "name" => $projetForCollaborateur->getName(),
                "dateCreation" => $projetForCollaborateur->getDateCreation(),
                "couleurPrincipal" => $projetForCollaborateur->getCouleurPrincipal(),
                "couleurSecondaire" => $projetForCollaborateur->getCouleurSecondaire(),
                "slogan" => $projetForCollaborateur->getSlogan(),
                "adressSiegeSocial" => $projetForCollaborateur->getAdressSiegeSocial(),
                "siret" => $projetForCollaborateur->getSiret(),
                "codePostal" => $projetForCollaborateur->getCodePostal(),
                "businesModelAvancement" => $this->vivitoolsService->calcAvancement($projetForCollaborateur?->getBusinesModel()?->getAvancement(), 9),
                "businessPlanAvancement" =>  $this->vivitoolsService->calcAvancementBusinessPlan($projetForCollaborateur?->getBusinessPlan()),
                "businesModellaseUpdate" => $projetForCollaborateur->getBusinesModel()?->getLaseUpdate(),
                "businesslaseUpdate" => $projetForCollaborateur->getBusinessPlan()?->getLasteUpdate(),
                "logo" => $projetForCollaborateur->getLogo(),
                "listeOfcollaborateur" => [],
                "listUserForCollaborateur" => [],
                "permissionListe" => $listeProjetCollaborateur->getPagePermission()
            ];
        }

        if (count($projetListe) == 0) {
            return $this->json([]);
        }

        return $this->json($projetListe);
    }

    #[Route('/api/projets/add', name: 'app_projets', methods: ['POST'])]
    public function index(Request $request): Response
    {
        $apiToken = $request->headers->get('X-AUTH-USER');

        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $BusinesModel = new BusinesModel();
        $this->entityManager->persist($BusinesModel);

        $BusinessPlan = new BusinessPlan();

        $this->entityManager->persist($BusinessPlan);

        $projet = new Projet();

        $projet = $this->addEditProject($informationuser, $projet);

        if (gettype($projet) != "object") {
            return new Response($projet, 400);
        }
        $projet->setDateCreation(new DateTime());
        $projet->setBusinesModel($BusinesModel);
        $projet->setBusinessPlan($BusinessPlan);


        $this->entityManager->persist($projet);
        $user->getInstance()->addProjet($projet);

        $this->entityManager->flush();

        $listUserForCollaborateur = $this->getUserNotInListeCollaboorateurProjet($projet->getId(), $user, 1, 5);
        $listeOfcollaborateur =  $this->CollaborateurProjetRepository->findAllCollaborateurProjet($projet->getId());

        $projetObjet = [
            "id" => $projet->getId(),
            "name" => $projet->getName(),
            "dateCreation" => $projet->getDateCreation(),
            "couleurPrincipal" => $projet->getCouleurPrincipal(),
            "couleurSecondaire" => $projet->getCouleurSecondaire(),
            "slogan" => $projet->getSlogan(),
            "adressSiegeSocial" => $projet->getAdressSiegeSocial(),
            "siret" => $projet->getSiret(),
            "codePostal" => $projet->getCodePostal(),
            "businesModelAvancement" => $this->vivitoolsService->calcAvancement($projet?->getBusinesModel()?->getAvancement(), 9),
            "businessPlanAvancement" => $this->vivitoolsService->calcAvancementBusinessPlan($projet?->getBusinessPlan()),
            "businesModellaseUpdate" => $projet->getBusinesModel()?->getLaseUpdate(),
            "businesslaseUpdate" => $projet->getBusinessPlan()?->getLasteUpdate(),
            "listeOfcollaborateur" => $listeOfcollaborateur,
            "listUserForCollaborateur" => $listUserForCollaborateur,
            "logo" => $projet->getLogo()
        ];


        return $this->json(["projet" => $projetObjet]);
    }


    #[Route('/api/edit-projets/{idProjet}', name: 'editprojets', methods: ['PUT'])]
    public function editprojets(Request $request, $idProjet): Response
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (isset($informationuser["logo"])) {
            $projet->setLogo($informationuser["logo"]);
        }

        $this->entityManager->flush();

        return $this->json([
            "idProjet" => $projet->getId(),
            "businesModelAvancement" => $this->vivitoolsService->calcAvancement($projet?->getBusinesModel()?->getAvancement(), 9),
            "businessPlanAvancement" => $this->vivitoolsService->calcAvancementBusinessPlan($projet?->getBusinessPlan())
        ]);
    }


    #[Route('/api/projets/{idProjet}', name: 'deletes_projets', methods: ['DELETE'])]
    public function DeletedProjet(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet]);

        if ($projet) {
            $projet->setDeleted(1);
            $this->entityManager->flush();
            return new Response(200);
        } else {
            return new Response("not exist", 400);
        }
    }


    #[Route('/api/projet/{idProjet}/all-collaborateur/', name: 'GetAllcollaborateur', methods: ['GET'])]
    public function GetAllcollaborateur(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $Projet = $this->doctrine->getRepository(Projet::class)->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        $checkCollaborateurInProject = $this->vivitoolsService->checkCollaborateurInProject($user, $Projet, $idProjet, null, false);
        if (gettype($checkCollaborateurInProject) == "object") {
            return $checkCollaborateurInProject;
        } elseif (gettype($checkCollaborateurInProject) == "array") {
            $Projet =  $checkCollaborateurInProject[1];
        }

        if (!$Projet) {
            return new Response("Projet n'existe pas", 400);
        }
        $listeOfcollaborateur =  $this->CollaborateurProjetRepository->findAllCollaborateurProjet($Projet->getId());

        return $this->json($listeOfcollaborateur);
    }

    #[Route('/api/projet/{idProjet}/one-collaborateur/{idcollaborateur}', name: 'getOnecollaborateur', methods: ['GET'])]
    public function getOnecollaborateur(Request $request, $idProjet, $idcollaborateur)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);
        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $collaborateur = $this->CollaborateurProjetRepository->findOneCollaborateurProjet($idcollaborateur, $projet->getId());


        return $this->json($collaborateur);
    }


    #[Route('/api/projet/{idProjet}/collaborateur/{idcollaborateur}', name: 'deletedcollaborateur', methods: ['DELETE'])]
    public function deletedcollaborateur(Request $request, $idProjet, $idcollaborateur)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $collaborateur = $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $idcollaborateur, "projet" => $projet, "IsSalarie" => 0, "deleted" => 0]);

        if ($collaborateur) {
            $collaborateur->setDeleted(1);
            $this->entityManager->flush();
        }
        return new Response(200);
    }


    #[Route('/api/{idProjet}/collaborateur-not-inProjet/getAll', name: 'collaborateurNotInProjetGetAll', methods: ['GET'])]
    public function collaborateurGetAll(Request $request, $idProjet): Response
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);
        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }

        if (isset($informationuser["start"]) and $informationuser["start"] > 0) {
            $start = $informationuser["start"];
        } else {
            $start = 1;
        }

        $listUserForCollaborateur = $this->getUserNotInListeCollaboorateurProjet($idProjet, $user, $start, 5);
        return $this->json($listUserForCollaborateur);
    }

    public function getUserNotInListeCollaboorateurProjet($idProjet, $user, $start, $max = null)
    {
        $collaborateurExiste =  $this->ProjetRepository->getIdAllcollaborateurObjets($idProjet);

        $collaborateurExiste = array_filter(array_map(function ($item) {
            return isset($item['id']) ? $item['id'] : null;
        }, $collaborateurExiste));

        $listUserForCollaborateur = [];
        $CollaborateurUser = $this->UserRepository->findAllCollaborateurUser($user->getId(), $start);
        foreach ($CollaborateurUser as $item) {
            if (!in_array($item->getId(), $collaborateurExiste)) {
                $listUserForCollaborateur[] = [
                    "id" => $item->getId(),
                    "username" => $item->getUsername(),
                    "email" => $item->getEmail(),
                    "firstname" => $item->getFirstname(),
                    "lastname" => $item->getLastname(),
                    "photoProfil" => $item->getPhone()
                ];
            }
        }
        return $listUserForCollaborateur;
    }
    #[Route('/api/projet/collaborateur/invitaion', name: 'invitationCollaborateur', methods: ['POST'])]
    public function invitationCollaborateur(Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if (isset($informationuser['inviEmail'])) {

            $subject = "Invitation ViviTool";
            $html = $this->renderView("email/invitationUser.html.twig", [

                "user" => $informationuser['inviEmail']
            ]);

            $res = $this->sendEmail->sendEmail($subject, $informationuser['inviEmail'], $html);
            if ($res[1] == 200) {
                return new Response($res[0]);
            } else {
                return new Response($res[0], $res[1]);
            }
        } else {
            return new Response('email est oblig');
        }
    }



    #[Route('/api/projet/{idProjet}/collaborateur/invitaion', name: 'invitationCollaborateurForProjet', methods: ['POST'])]
    public function invitationCollaborateurForProjet(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }
        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if (isset($informationuser['collaborateur'])) {

            if ($this->vivitoolsService->verificationEmail($informationuser['collaborateur']) == false) {
                return new Response("email invalid ", 400);
            }
            if ($user->getEmail() == $informationuser["collaborateur"]) {
                return new Response("Vous n'avez pas ajouté vous-même", 400);
            }
            $collaborateur = $this->doctrine->getRepository(User::class)->findOneBy(["email" => $informationuser['collaborateur']]);

            $collaborateurExiste =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["email" => $informationuser['collaborateur'], "projet" => $projet, "deleted" => 0]);

            if ($collaborateur) {
                return new Response('Utilisateur existe déjà', 200);
            }

            if ($collaborateurExiste) {
                return new Response('collaborateur existe déjà', 200);
            }

            $subject = "Invitation ViviTool";
            $html = $this->renderView("email/invitationUser.html.twig", [

                "user" => $informationuser['collaborateur']
            ]);

            $res = $this->sendEmail->sendEmail($subject, $informationuser['collaborateur'], $html);

            if ($res[1] == 200) {

                $CollaborateurProjet = new CollaborateurProjet();
                $CollaborateurProjet->setProjet($projet);
                $CollaborateurProjet->setEmail($informationuser['collaborateur']);
                $CollaborateurProjet->setDateCreation(new DateTime());
                $this->entityManager->persist($CollaborateurProjet);
                $this->entityManager->flush();

                return new Response($res[0]);
            } else {
                return new Response($res[0], $res[1]);
            }
        } else {
            return new Response('email est oblig', 400);
        }
    }


    #[Route('/api/{idProjet}/add-collaborateur', name: 'addCollaborateurToProjet', methods: ['POST'])]
    public function addCollaborateurToProjet(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        if (isset($informationuser["collaborateur"])) {

            if ($this->vivitoolsService->verificationEmail($informationuser['collaborateur']) == false) {
                return new Response("email invalid ", 400);
            }

            if ($user->getEmail() == $informationuser["collaborateur"]) {
                return new Response("Vous n'avez pas ajouté vous-même", 200);
            }
            $collaborateurDejaInviter =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["email" => $informationuser["collaborateur"],"user" => null, "projet" => $projet]);
            if($collaborateurDejaInviter){
                    return new Response("Collaborateur déjà invité", 200);
            }

            $collaborateur = $this->doctrine->getRepository(User::class)->findOneBy(["email" => $informationuser["collaborateur"]]);
            if (!$collaborateur) {
                
                return new Response("inviter");

            }

            $collaborateurExiste =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["user" => $collaborateur, "projet" => $projet]);
            
            if ($collaborateurExiste) {
                return new Response('collaborateur existe déjà', 200);
            }

            if ($collaborateur and !$collaborateurExiste) {
                $CollaborateurProjet = new CollaborateurProjet();
                $CollaborateurProjet->setProjet($projet);
                $CollaborateurProjet->setUser($collaborateur);
                $CollaborateurProjet->setDateCreation(new DateTime());
                $this->entityManager->persist($CollaborateurProjet);
                $this->entityManager->flush();
            }

            
        } else {
            return new Response("email est oblig", 400);
        }

        return new Response("ok", 200);
    }



    #[Route('/api/{idProjet}/add-collaborateur-permission', name: 'addPermissionToCollaborateurToProjet', methods: ['POST'])]
    public function addPermissionToCollaborateurToProjet(Request $request, $idProjet)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new Response('No API token provided', 401);
        }

        $projet = $this->ProjetRepository->findOneBy(["id" => $idProjet, "instance" => $user->getInstance(), "deleted" => 0]);

        if (!$projet) {
            return new Response("Projet n'existe pas", 400);
        }

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        if (isset($informationuser)) {

            foreach ($informationuser as $id => $permissions) {
                $collaborateur =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["id" => $id, "projet" => $projet]);
                $permissionsListe = [];

                if ($collaborateur) {
                    foreach ($permissions as $permission) {
                        array_push($permissionsListe, $permission);
                    }
                    $collaborateur->setPagePermission($permissionsListe);
                    $this->entityManager->flush();
                }
            }
        }
        return new Response("OK!");
    }


    public function addEditProject($informationuser, $projet)
    {
        $erreur = [];


        $match = match (isset($informationuser["name"])) {
            true => $projet->setName($informationuser["name"]),
            false => $erreur[] = "nom de projet est obligatoire "
        };

        $match = match (isset($informationuser["couleurPrincipal"])) {
            true => $projet->setCouleurPrincipal($informationuser["couleurPrincipal"]),
            false => $erreur[] = "couleurPrincipal de projet est obligatoire "
        };

        $match = match (isset($informationuser["couleurSecondaire"])) {
            true => $projet->setCouleurSecondaire($informationuser["couleurSecondaire"]),
            false => $erreur[] = "couleurSecondaire de projet est obligatoire "
        };

        $match = match (isset($informationuser["couleurMenu"])) {
            true => $projet->setCouleurMenu($informationuser["couleurMenu"]),
            false => $erreur[] = "couleurMenu de projet est obligatoire "
        };

        $match = match (isset($informationuser["slogan"])) {
            true => $projet->setSlogan($informationuser["slogan"]),
            false => $erreur[] = "slogan de projet est obligatoire "
        };

        $match = match (isset($informationuser["adressSiegeSocial"])) {
            true => $projet->setAdressSiegeSocial($informationuser["adressSiegeSocial"]),
            false => $erreur[] = "adressSiegeSocial de projet est obligatoire "
        };
        if (isset($informationuser["siret"]) and $informationuser["siret"] != null and $informationuser["siret"] != '') {
            if (!preg_match('/^\d{14}$/', $informationuser["siret"])) {
                $erreur[] = "Invalid SIRET number";
            }
        }


        if (isset($informationuser["siret"])) {
            $projetExist = $this->ProjetRepository->findOneBy(["siret" => $informationuser["siret"], "deleted" => 0]);
            if ($projetExist) {
                return "siret déjà utilise";
            }
        }
        if (isset($informationuser["logo"])) {
            $projet->setLogo($informationuser["logo"]);
        }

        $match = match (isset($informationuser["codePostal"])) {
            true => $projet->setCodePostal($informationuser["codePostal"]),
            false => $erreur[] = "codePostal de projet est obligatoire "
        };

        if (isset($informationuser["collaborateur"])) {
            foreach ($informationuser["collaborateur"] as $id) {
                $collaborateur = $this->doctrine->getRepository(User::class)->find($id);

                $collaborateurExiste =  $this->doctrine->getRepository(CollaborateurProjet::class)->findOneBy(["user" => $collaborateur, "projet" => $projet]);

                if ($collaborateur and !$collaborateurExiste) {
                    $CollaborateurProjet = new CollaborateurProjet();
                    $CollaborateurProjet->setProjet($projet);
                    $CollaborateurProjet->setUser($collaborateur);
                    //$CollaborateurProjet->setPagePermission($informationuser["PagePermissin"][$id]);
                    $CollaborateurProjet->setDateCreation(new DateTime());
                    $this->entityManager->persist($CollaborateurProjet);
                }
            }
        }

        if (count($erreur) == 0) {
            return $projet;
        } else {
            return $erreur[0];
        }
    }
}
