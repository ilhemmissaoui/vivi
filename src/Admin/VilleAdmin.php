<?php

namespace App\Admin;

use App\Entity\Ville;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class VilleAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $form): void
    {

        $form
            ->add('name', TextType::class)
            ->add('file',FileType::class,[
                'required' => false,
                'label'=>'Image (1920 × 553)'
            ])
            /*->add('fileP',FileType::class,[
                'required' => false,
                'label'=>'publicity'
            ])
            */
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagrid): void
    {
        $datagrid->add('name')


        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list->addIdentifier('name',null,['route' => array('name' => 'edit')])
        ;
        $list->add('photo', null, array('template' => 'ville/photo.html.twig'));
        //$list->add('publicity', null, array('template' => 'ville/publicity.html.twig'));



    }

    /**
     * @param Ville $ville
     */
    public function prePersist($ville): void
    {

        $this->manageFileUpload($ville);
    }

    /**
     * @param Ville $ville
     */
    public function preUpdate($ville): void
    {

        $this->manageFileUpload($ville);
    }

    private function manageFileUpload(Ville $image): void
    {

        if ($image->getFile()) {
            $image->upload();
        }

        /*if ($image->getFileP()) {
            $image->uploadP();
        }*/
    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::PAGE] = 1;
        $sortValues[DatagridInterface::SORT_ORDER] = 'DESC';
        $sortValues[DatagridInterface::SORT_BY] = 'id';
    }

}