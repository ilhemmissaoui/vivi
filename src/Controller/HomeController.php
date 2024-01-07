<?php

namespace App\Controller;

use App\Service\SendEmail;
use App\Service\vivitoolsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    private $vivitoolsService;
    private $sendEmail;

    public function __construct(vivitoolsService $vivitoolsService, SendEmail $sendEmail){
        $this->vivitoolsService = $vivitoolsService;
        $this->sendEmail = $sendEmail;


    }

    #[Route('/{reactRouting}', name: 'index',defaults:["reactRouting"=> null],requirements:["reactRouting"=>'^(?!api|admin|_(profiler|wdt)|bundles|api-docs).*$'])]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/api/email/send-url', name: 'sendUrlMeet', methods: ['POST'])]
    public function sendUrlMeet(Request $request)
    {
        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());

        foreach($informationuser["emails"] as $email){
            $this->sendEmail->sendEmail("Invitation meet",$email,$informationuser["meetUrl"]);
        }

        return new Response("OK");
    }
}
