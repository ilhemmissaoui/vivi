<?php

namespace App\Controller;

use App\Entity\BusinesModel;
use App\Entity\BusinessPlan;
use App\Entity\FinancementEtCharges;
use App\Entity\HistoireEtEquipe;
use App\Entity\MarcheEtConcurrence;
use App\Entity\Partenaires;
use App\Entity\PositionnementConcurrentiel;
use App\Entity\Projet;
use App\Entity\Solution;
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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PartenaireController extends AbstractController
{

    private $UserRepository;
    private $ProjetRepository;
    private $vivitoolsService;
    private $sendEmail;
    private $entityManager;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine, ProjetRepository $ProjetRepository, SendEmail $sendEmail, EntityManagerInterface $entityManager, UserRepository $UserRepository, vivitoolsService $vivitoolsService)
    {
        $this->UserRepository = $UserRepository;
        $this->ProjetRepository = $ProjetRepository;
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;
        $this->entityManager = $entityManager;
        $this->doctrine = $doctrine;
    }


    #[Route('/api/partenaire/add', name: 'addPartenaire', methods: ['POST'])]
    public function addPartenaire(Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $partenaire = new Partenaires();

        $partenaire = $this->addEditPArtenaire($informationuser, $partenaire);

        if (gettype($partenaire) != "object") {
            return new Response($partenaire, 400);
        }

        $this->entityManager->persist($partenaire);
        $this->entityManager->flush();

        return $this->json(["idpartenaire" => $partenaire->getId()]);
    }


    #[Route('/api/edit-partenaire/{idPartenaire}', name: 'editPartenaire', methods: ['PUT'])]
    public function editPartenaire(Request $request, $idPartenaire)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }


        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        $partenaire =  $this->doctrine->getRepository(Partenaires::class)->findOneBy(["id" => $idPartenaire, "deleted" => 0]);


        if (!$partenaire) {
            return new Response("Partenaire n'existe pas", 400);
        }

        $partenaire = $this->addEditPArtenaire($informationuser, $partenaire);
        if (gettype($partenaire) != "object") {
            return new Response($partenaire, 400);
        }
        $this->entityManager->flush();
        return $this->json(["idpartenaire" => $partenaire->getId()]);
    }


    #[Route('/api/one-partenaire/{idpartenaire}', name: 'getOnepartenaire', methods: ['GET'])]
    public function getOnepartenaire(Request $request, $idpartenaire)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $partenaire =  $this->doctrine->getRepository(Partenaires::class)->findOneBy(["id" => $idpartenaire, "deleted" => 0]);

        if (!$partenaire) {
            return new Response("partenaire n'existe pas", 400);
        }

        $Onecollaborateur[] = [
            "id" => $partenaire->getId(),
            "NomSociete" => $partenaire->getNomSociete(),
            "siteWeb" => $partenaire->getSiteWeb(),
            "telephone" => $partenaire->getTelephone(),
            "email" => $partenaire->getEmail(),
            "adresse" => $partenaire->getAdresse(),
            "service" => $partenaire->getService(),
            "description" => $partenaire->getDescription(),
            "secteurActivite" => $partenaire->getSecteurActivite(),
            "logo" => $partenaire->getLogo(),
            "photoCouvert" => $partenaire->getPhotoCouvert()
        ];

        return $this->json($Onecollaborateur);
    }

    #[Route('/api/all-partenaire/', name: 'GetAllpartenaire', methods: ['GET'])]
    public function GetAllpartenaire(Request $request)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $listeOfGetAllpartenaire = $this->doctrine->getRepository(Partenaires::class)->findBy(["deleted" => 0]);
        if (count($listeOfGetAllpartenaire) == 0) {
            return new Response("Partenaires n'existe pas", 204);
        }
        $listeOfpartenaire = [];
        foreach ($listeOfGetAllpartenaire as $partenaire) {
            $listeOfpartenaire[] = [
                "id" => $partenaire->getId(),
                "NomSociete" => $partenaire->getNomSociete(),
                "siteWeb" => $partenaire->getSiteWeb(),
                "telephone" => $partenaire->getTelephone(),
                "email" => $partenaire->getEmail(),
                "adresse" => $partenaire->getAdresse(),
                "service" => $partenaire->getService(),
                "description" => $partenaire->getDescription(),
                "secteurActivite" => $partenaire->getSecteurActivite(),
                "logo" => $partenaire->getLogo(),
                "photoCouvert" => $partenaire->getPhotoCouvert()
            ];
        }
        return $this->json($listeOfpartenaire);
    }


    #[Route('/api/deleted-partenaire/{idpartenaire}', name: 'deletedpartenaire', methods: ['DELETE'])]
    public function deletedpartenaire(Request $request, $idpartenaire)
    {
        $apiToken = $request->headers->get('X-AUTH-USER');
        $user = $this->UserRepository->findOneBy(["token" => $apiToken]);

        if (null == $apiToken or !$user or !in_array("ROLE_USER", $user->getRoles())) {
            return new Response('No API token provided', 401);
        }

        $partenaire =  $this->doctrine->getRepository(Partenaires::class)->findOneBy(["id" => $idpartenaire, "deleted" => 0]);

        if (!$partenaire) {
            return new Response("partenaire n'existe pas", 400);
        }
        $partenaire->setDeleted(1);
        $this->entityManager->flush();

        return new Response(200);
    }

    public function addEditPArtenaire($informationuser, $partenaire)
    {
        if (isset($informationuser["NomSociete"])) {
            $partenaire->setNomSociete($informationuser["NomSociete"]);
        } else {
            return "NomSociete est oblig";
        }
        if (isset($informationuser["siteWeb"])) {
            $partenaire->setSiteWeb($informationuser["siteWeb"]);
        }
        if (isset($informationuser["telephone"]) and $informationuser["telephone"] !="" and $informationuser["telephone"] != null) {
            if (is_numeric($informationuser["telephone"]) == 1) {
                $partenaire->setTelephone($informationuser["telephone"]);
            } else {
                return "telephone doit être numérique";
            }
        }

        if (isset($informationuser["email"]) and $informationuser["email"] !="" and $informationuser["email"] != null) {

            if ($this->vivitoolsService->verificationEmail($informationuser['email']) == false) {
                return "email invalid";
            }

            $partenaire->setEmail($informationuser["email"]);
        }

        if (isset($informationuser["adresse"])) {
            $partenaire->setAdresse($informationuser["adresse"]);
        }

        if (isset($informationuser["service"])) {
            $partenaire->setService($informationuser["service"]);
        }
        if (isset($informationuser["description"])) {
            $partenaire->setDescription($informationuser["description"]);
        }else {
            return "description est oblig";
        }
        if (isset($informationuser["secteurActivite"])) {
            $partenaire->setSecteurActivite($informationuser["secteurActivite"]);
        } else {
            return "secteur d'activite est oblig";
        }
        if (isset($informationuser["logo"])) {
            $partenaire->setLogo($informationuser["logo"]);
        }
        if (isset($informationuser["photoCouvert"])) {
            $partenaire->setPhotoCouvert($informationuser["photoCouvert"]);
        }

        return $partenaire;
    }
}
