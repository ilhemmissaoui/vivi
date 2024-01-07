<?php

namespace App\Controller;

use DateTime;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class RessourcesEtTutosController extends AbstractController
{
    #[Route('/api/ressources/tutos', name: 'app_ressources_et_tutos')]
    public function index(): Response
    {
        $url = 'https://www.biars-sur-cere.fr/feed/';

        $client = HttpClient::create();
        $response = $client->request('GET', $url);
    
        $statusCode = $response->getStatusCode();
   
        if ($statusCode === Response::HTTP_OK) {
            $content = $response->getContent();
            // Traitez le contenu XML du flux RSS ici
            $encoder = new XmlEncoder();
            $normalizer = new ObjectNormalizer();
            $serializer = new Serializer([$normalizer], [$encoder]);
       
            try{
                $data = $serializer->decode($content, 'xml');
            }catch(Exception $e){
                return $this->json([]);
            }

            $ressource = [];

            foreach($data["channel"]["item"] as $item){
                $date = new DateTime($item["pubDate"]);
                $ressource[] = [
                    "title" => $item["title"],
                    "link" => $item["link"],
                    "pubDate" => $date->format("d/m/Y"),
                    "category" => $item["category"],
                    "description" =>strip_tags( $item["description"]),
                    "creator" => $item["dc:creator"],
                ];
            }
            return $this->json($ressource);
        } else {
           // return new Response('Échec de la récupération du flux RSS. Code de statut : ' . $statusCode);
           return $this->json([]);

        }
    }
}
