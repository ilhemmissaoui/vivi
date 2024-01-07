<?php

namespace App\Admin;

use App\Entity\Instance;
use App\Service\vivitoolsService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
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

final class UserAdmin extends AbstractAdmin
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
    ) {
        parent::__construct($code, $class, $baseControllerName);
        $this->Manager = $Manager;
        $this->passwordHasher = $passwordHasher;
        $this->vivitoolsService = $vivitoolsService;
    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::PAGE] = 1;
        $sortValues[DatagridInterface::SORT_ORDER] = 'DESC';
        $sortValues[DatagridInterface::SORT_BY] = 'id';
    }

    /*
    protected function configureFormFields(FormMapper $form): void
    {
 
        $editUser = $this->getSubject();
        $isCreation = $editUser->getId() === null;
        $generated=$editUser->getId()?true:false;

        $form
            ->add('email', TextType::class)            
            ->add('firstname', TextType::class,[
                "label"=>"Prenom"
            ])
            ->add('lastname', TextType::class,
                [
                    "label"=>"Nom"
                ]
            )            
        ;
        $form ->add('password', RepeatedType::class, [
            // instead of being set onto the object directly,
            // this is read and encoded in the controller
            'type' => PasswordType::class,
            'required' => $isCreation,
            'mapped' => false,
            'options' => ['attr' => ['class' => 'form-control']],
            'first_options'  => ['label' => 'Mot de passe'],
            'second_options' => ['label' => 'Entrez ce mot de passe à nouveau'],
            'constraints' => [                
                new Length([
                    'min' => 6,
                    'minMessage' => 'Your password should be at least {{ limit }} characters',
                    // max length allowed by Symfony for security reasons
                    'max' => 4096,
                ]),
            ],
        ]);
    }

*/

    protected function configureShowFields(ShowMapper $show): void
    {

        $show->add('email', NULL, [
            'label' => 'Email',
        ]);

        $show->add('firstname', NULL, [
            'label' => 'Nom',
        ]);
        $show->add('lastname', NULL, [
            'label' => 'Prénom',
        ]);


        $show->add('instance', "html", [
            "template" => "admin/user/projet/showListeProjet.html.twig",
            'safe' => true,
            'label' => "Liste des projets"
        ]);

        $show->end();
    }


    public function prePersist($user): void
    {
        $mtp = $this->passwordHasher->hashPassword(
            $user,
            $this->getForm()->get('password')->getData()
        );
        $user->setPassword(
            $mtp
        );

        $token = $this->vivitoolsService->generatetoken();
        $user->setToken($token);
        $user->setDateCreation(new DateTime());

        $this->Manager->persist($user);

        $instance = new Instance();
        $instance->setUser($user);
        $reference = $this->vivitoolsService->generatetoken(8);
        $instance->setReference($reference);
        $instance->setDateCreation(new DateTime());

        $this->Manager->persist($instance);
        $this->Manager->flush();
    }


    public function preUpdate(object $user): void
    {
        if ($this->getForm()->get('password')->getData()) {
            $mtp = $this->passwordHasher->hashPassword(
                $user,
                $this->getForm()->get('password')->getData()
            );
            $user->setPassword(
                $mtp
            );
        } else {
        }
    }


    protected function configureDatagridFilters(DatagridMapper $datagrid): void
    {
        $datagrid->add('email');
    }

    protected function configureListFields(ListMapper $list): void
    {

        $list
            ->addIdentifier('id', null, ['route' => array('name' => 'edit')])
            ->addIdentifier('email', null, ['route' => array('name' => 'edit')])
            ->addIdentifier('firstName', null, [
                'route' => array('name' => 'edit'),
                "label" => "Nom",

            ])
            ->addIdentifier('lastName', null, [
                'route' => array('name' => 'edit'),
                "label" => "Prénom",
            ]);
            $list->add(ListMapper::NAME_ACTIONS, null, [
                'actions' => [
                    'delete' => ['template' => 'admin/user/deletedUser.html.twig'],
                ],
                
            ]); 
    }


    protected function configureQuery(ProxyQueryInterface $query): ProxyQueryInterface
    {
        $query = parent::configureQuery($query);

        $rootAlias = current($query->getRootAliases());

        $query->andWhere($rootAlias . ".roles NOT LIKE :role")
            ->setParameter('role', '%ROLE_ADMIN%')
            ->andWhere($rootAlias . ".deleted = 0");


        return $query;
    }

    protected function configureRoutes(RouteCollectionInterface $collection): void
    {
       // $collection->remove('delete');
        $collection->remove('edit');
        $collection->remove('create');
        $collection->add('edit',  $this->getRouterIdParameter() . '/show');
    }
}
