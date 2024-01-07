<?php

namespace App\Admin;

use App\Entity\BusinesModel;
use App\Entity\BusinessPlan;
use App\Entity\HistoireEtEquipe;
use App\Entity\User;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollectionInterface;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateType;

use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;

final class projetAdmin extends AbstractAdmin
{
    private $doctrine;
    private $entityManager;
    private $UserRepository;

    public function __construct(
        string $code,
        string $class,
        string $baseControllerName,
        ManagerRegistry $doctrine,
        UserRepository $UserRepository
    ) {
        parent::__construct($code, $class, $baseControllerName);
        $this->doctrine = $doctrine;
        $this->entityManager = $doctrine->getManager();  
        $this->UserRepository = $UserRepository;

    }
    
    protected function configureFormFields(FormMapper $form): void
    {

       
        $editProjet = $this->getSubject();
        $userCreateProject = null;
        if($editProjet->getId()){
            $userCreateProject = $this->getSubject()->getInstance()->getUser();
        }

        $form
            ->add('name', TextType::class,[
                'label' => 'Nom',
            ])
            ->add('chef', EntityType::class, [
                'label' => 'chef du projet',
                'class' => User::class,
                'choice_label' => 'email',
                'data' => $userCreateProject,
                'required' => true,
                'mapped' => false,
                'multiple' => false,
            ])    

            ->add('User', EntityType::class, [
                'label' => 'Collaborateur',
                'class' => User::class,
                'choice_label' => 'email',
                'required' => false,
                'mapped' => true,
                'multiple' => true,
            ])                       
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $Projet = $this->getSubject();

        $show->add('name',NULL,[
            'label' => 'Nom',
        ]);
        
        $show->add('instance',NULL,[
            "label"=>"créé par ",
        ]);

        $show->add('dateCreation',NULL,[
            "label"=>"date de création",
            'format' => 'Y-m-d',
        ]);        
        $show->add("businesModel","html",[
            "template"=>"admin/projetAdmin/businesModel/showbusinesModel.html.twig",
            'safe' => true,
            'label' => 'Business model',
        ]);
        $show->add('collaborateurProjets',"html",[
            "template"=>"admin/projetAdmin/userListe/showListeUser.html.twig",
            'safe' => true,
            'label' => 'Collaborateurs'
        ]);
      
      
        $show->end();
    }

    

    protected function configureListFields(ListMapper $list): void
    {
        $list->addIdentifier('id');

        $list->addIdentifier('name', null, [
            'label' => "Nom",
        ]);

        $list->addIdentifier('dateCreation',null,[
            "label"=>"Date de création",
            'format' => 'Y-m-d',
        ]);

        $list->addIdentifier('instance',null,[
            "label"=>"Créée par",             
        ]);

        $list->addIdentifier(ListMapper::NAME_ACTIONS, null, [
            "label"=>"PDF",
            'actions' => [
                'pdf' => ['template' => 'admin/projetAdmin/businesModel/showbusinesModel.html.twig'],                 
            ]
        ]);

        
    }


    public function preUpdate(object $projet): void
    {
        $chefProjet = $this->getForm()->get('chef')->getData();
        $chefProjet->getInstance()->addProjet($projet);
    }

    public function prePersist(object $projet): void
    {
        
        $chefProjet = $this->getForm()->get('chef')->getData();
        
        $BusinesModel = new BusinesModel();        
        $this->entityManager->persist($BusinesModel);              
                                
        $BusinessPlan = new BusinessPlan(); 
        $histoireEtEquipe = new HistoireEtEquipe();

        $BusinessPlan->setHistoireEtEquipe($histoireEtEquipe);
        $this->entityManager->persist($BusinessPlan);  

        $projet->setDateCreation(new DateTime());
        $projet->setBusinesModel($BusinesModel);
        $projet->setBusinessPlan($BusinessPlan);        

        $chefProjet->getInstance()->addProjet($projet);

        $this->entityManager->persist($projet);      
        $this->entityManager->flush();

    }

    protected function configureRoutes(RouteCollectionInterface $collection): void
    {
        $collection->remove('delete');
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('show');
       // $collection->add('edit',  $this->getRouterIdParameter().'/show');
    }
}