<?php

namespace App\Controller;

use App\Service\vivitoolsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class AidesController extends AbstractController
{
    private $vivitoolsService;
    public function __construct(vivitoolsService $vivitoolsService){
        $this->vivitoolsService = $vivitoolsService;

    }
    #[Route('/api/vivitool/aides/{limit}/{offset}', name: 'vivi_aides')]
    public function vivi_aides($offset,$limit,Request $request): Response
    {

        $informationuser = $this->vivitoolsService->jsonToarray($request->getContent());
        

        $url = 'https://api.aides-entreprises.fr/v1.1/aides?limit='.$limit.'&offset='.$offset;
        
        if(isset($informationuser["effectif"])){
            $effectif = $informationuser["effectif"];
            $url .="&effectif=".$effectif;
        }
        
        $client = HttpClient::create();
        $response = $client->request('GET', $url, [
            'headers' => [
                'X-Aidesentreprises-Id' => 'WmKXy1PA',
                'X-Aidesentreprises-Key' => 'gdjMGO3w',
            ]
        ]);

        $statusCode = $response->getStatusCode();

        if ($statusCode === Response::HTTP_OK) {
            $content = $response->getContent();

            $data = json_decode($content)->data;
         
            $ressource = [];


            foreach ($data as $item) {

                $ressource[] = [
                    "id_aid"=>$item->id_aid,
                    "aid_nom"=>$item->aid_nom,
                    "aid_objet"=>strip_tags($item->aid_objet),
                    "aid_operations_el"=>strip_tags( $item->aid_operations_el),
                    "aid_conditions"=>strip_tags( $item->aid_conditions),
                    "aid_montant"=>strip_tags( $item->aid_montant),
                    "aid_benef"=>strip_tags( $item->aid_benef),
                    "aid_validation"=>$item->aid_validation,
                    "couverture_geo"=>$item->couverture_geo,
                    "horodatage"=>$item->horodatage,
                    "id_domaine"=>$item->id_domaine,
                    "handicapes"=>$item->handicapes,
                    "femmes"=>$item->femmes,
                    "seniors"=>$item->seniors,
                    "jeunes"=>$item->jeunes,
                    "date_fin"=>$item->date_fin,
                    "status"=>$item->status,
                    "maj"=>$item->maj,
                    "nb_org"=>$item->nb_org,
                    "complements"=>$item->complements,
                    "effectif"=>$item->effectif,
                    "duree_projet"=>$item->duree_projet,
                    "age_entreprise"=>$item->age_entreprise
                ];
            }
            return $this->json($ressource);
        } else {
            return new Response('Échec de la récupération du flux RSS. Code de statut : ' . $statusCode);
        }
    }
}
