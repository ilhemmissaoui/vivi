<?php

namespace App\Controller\Admin;

use App\Entity\Partenaires;
use App\Entity\Projet;
use App\Entity\User;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RequestStack;
use Doctrine\Persistence\ManagerRegistry;

class statAdminController extends Controller
{
	 private $requestStack;
	 private $doctrine;

    public function __construct(RequestStack $requestStack,ManagerRegistry $doctrine)
    {
        $this->requestStack = $requestStack;
        $this->doctrine = $doctrine;
    }
	 public function listAction(Request $request): Response
    {
        $users = $this->doctrine->getRepository(User::class)->findBy(["deleted"=> 0]);
        $Projets = $this->doctrine->getRepository(Projet::class)->findBy(["deleted"=> 0]);
        $Partenaires = $this->doctrine->getRepository(Partenaires::class)->findBy(["deleted"=> 0]);  

        return $this->render('admin/status.html.twig', [
            
            "numberOfclient"=>count ($users),
            "numberOfProjets"=>count ($Projets),
            "numberOfPartenaires"=>count ($Partenaires),
          
        ]);
    }

}