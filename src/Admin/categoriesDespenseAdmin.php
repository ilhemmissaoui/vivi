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

final class categoriesDespenseAdmin extends AbstractAdmin  
{
    public $vivitoolsService;
    public $Manager;
    

    public function __construct(
        string $code,
        string $class,
        string $baseControllerName,
        EntityManagerInterface $Manager,
        vivitoolsService $vivitoolsService
    )
    {
        parent::__construct($code, $class, $baseControllerName);
        $this->Manager = $Manager;
        $this->vivitoolsService = $vivitoolsService;

    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('name', TextType::class,[
                "label"=>"Nom de catégorie"
            ])
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {

        $show->add('name', NULL,[
            "label"=>"Nom de catégorie"
        ]);
        $show->end();
    }

protected function configureListFields(ListMapper $list): void
{

    $list->addIdentifier('name', NULL,[
        "label"=>"Nom de catégorie"
    ]);

}


}