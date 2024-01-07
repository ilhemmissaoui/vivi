<?php
namespace App\Admin;

use App\Entity\Instance;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface ;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollectionInterface;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;

final class PartenaireAdmin extends AbstractAdmin  
{
    public $passwordHasher;
    public $vivitoolsService;
    public $Manager;
    

    public function __construct(
        string $code,
        string $class,
        string $baseControllerName,
        EntityManagerInterface $Manager,
        UserPasswordHasherInterface $passwordHasher,
        vivitoolsService $vivitoolsService
    )
    {
        parent::__construct($code, $class, $baseControllerName);
        $this->Manager = $Manager;
        $this->passwordHasher = $passwordHasher;
        $this->vivitoolsService = $vivitoolsService;

    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('NomSociete', TextType::class,[
                "label"=>"Nom de la société"
            ])
            ->add('siteWeb', TextType::class,[
                "label"=>"Site web"
            ])
            ->add('email', TextType::class,[
                "label"=>"Email"
            ])
            ->add('telephone', TextType::class,[
                "label"=>"Téléphone"
            ])
            ->add('adresse', TextType::class,[
                "label"=>"Adresse"
            ])
            ->add('service', TextType::class,[
                "label"=>"Service"
            ])
            ->add('description', CKEditorType::class,[
                'attr' => ['class' => 'ckeditor'],
                "label"=>"Description"
            ])
            ->add('secteurActivite', TextType::class,[
                "label"=>"Secteur d'activité"
            ])

        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {

        $show->add('NomSociete', NULL,[
            "label"=>"Nom de la société"
        ])
        ->add('siteWeb', NULL,[
            "label"=>"Site web"
        ])
        ->add('email', NULL,[
            "label"=>"Email"
        ])
        ->add('telephone', NULL,[
            "label"=>"Téléphone"
        ])
        ->add('adresse', NULL,[
            "label"=>"Adresse"
        ])
        ->add('service', NULL,[
            "label"=>"Service"
        ])
        ->add('description', NULL,[
            "label"=>"Description"
        ])
        ->add('secteurActivite', NULL,[
            "label"=>"Secteur d'activité"
        ]);

        $show->end();
    }

protected function configureListFields(ListMapper $list): void
{

    $list->addIdentifier('NomSociete', NULL,[
        "label"=>"Nom de la société"
    ])
    ->addIdentifier('siteWeb', NULL,[
        "label"=>"Site web"
    ])
    ->addIdentifier('email', NULL,[
        "label"=>"Email"
    ])
    ->addIdentifier('telephone', NULL,[
        "label"=>"Téléphone"
    ])
    ->addIdentifier('adresse', NULL,[
        "label"=>"Adresse"
    ])
    ->addIdentifier('service', NULL,[
        "label"=>"Service"
    ])
    ->addIdentifier('description', NULL,[
        "label"=>"Description"
    ])
    ->addIdentifier('secteurActivite', NULL,[
        "label"=>"Secteur d'activité"
    ]);

    $list->add(ListMapper::NAME_ACTIONS, null, [
        'actions' => [
            'delete' => ['template' => 'admin/deletedPartenaire.html.twig'],
        ],
        
    ]); 

}

protected function configureQuery(ProxyQueryInterface $query): ProxyQueryInterface
{
    $query = parent::configureQuery($query);

    $rootAlias = current($query->getRootAliases());

    $query->andWhere($rootAlias . ".deleted = 0");
    return $query;
}


}