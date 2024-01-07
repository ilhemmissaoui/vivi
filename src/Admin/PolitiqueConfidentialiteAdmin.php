<?php

namespace App\Admin;

use App\Entity\PolitiqueConfidentialite;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class PolitiqueConfidentialiteAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $form): void
    {
        $form
        ->add('titre', TextType::class)

            ->add('text', CKEditorType::class,[
                'attr' => ['class' => 'ckeditor'],
            ])            
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagrid): void
    {
        $datagrid->add('titre');

        $datagrid->add('text')
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list->addIdentifier('text',null,['route' => array('text' => 'edit')])
        ;

    }

    /**
     * @param PolitiqueConfidentialite $PolitiqueConfidentialite
     */
    public function prePersist($PolitiqueConfidentialite): void
    {

        
    }

    /**
     * @param PolitiqueConfidentialite $PolitiqueConfidentialite
     */
    public function preUpdate($PolitiqueConfidentialite): void
    {

    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::PAGE] = 1;
        $sortValues[DatagridInterface::SORT_ORDER] = 'DESC';
        $sortValues[DatagridInterface::SORT_BY] = 'id';
    }

}