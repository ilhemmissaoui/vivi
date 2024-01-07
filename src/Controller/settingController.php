<?php

namespace App\Controller;

use App\Entity\CGU;
use App\Entity\FAQ;
use App\Entity\PolitiqueConfidentialite;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class settingController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {

        $this->doctrine = $doctrine;

    }
    #[Route('/api/vivitool/politique-confidentialite', name: 'PolitiqueConfidentialite', methods: ['GET'])]
    public function PolitiqueConfidentialite(): Response
    {
        $text = "";
        $setting = $this->doctrine->getRepository(PolitiqueConfidentialite::class)->findAll();
        if(count( $setting) == 0){
            return new Response('Pas de contenu',204);            
          
        }
        foreach($setting as $item){
            $faq[] =["titre"=>$item->getTitre(),"text"=>$item->getText()];
        }
        return $this->json($faq);
    }

    #[Route('/api/vivitool/cgu', name: 'cgu', methods: ['GET'])]
    public function cgu(): Response
    {
        $text = "";
        $setting = $this->doctrine->getRepository(CGU::class)->findAll();
        if(count( $setting) == 0){
            return new Response('Pas de contenu',204);            
        }
        foreach($setting as $item){
            $faq[] =["titre"=>$item->getTitre(),"text"=>$item->getText()];
        }
        return $this->json($faq);
    }

    #[Route('/api/vivitool/faq', name: 'faq', methods: ['GET'])]
    public function faq(): Response
    {
        $faq = [];
        $setting = $this->doctrine->getRepository(FAQ::class)->findAll();
        if(count( $setting) == 0){
            return new Response('Pas de contenu',204);                      
        }
        foreach($setting as $item){
            $faq[] =["titre"=>$item->getTitre(),"text"=>$item->getText()];
        }
        return $this->json($faq);
    }

}
