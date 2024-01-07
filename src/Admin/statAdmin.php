<?php
namespace App\Admin;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Route\RouteCollectionInterface;

final class statAdmin extends AbstractAdmin
{

    protected $baseRoutePattern = 'vivit-statistics';
    protected $baseRouteName = 'vivitStatistics';

    protected function configureRoutes(RouteCollectionInterface $collection):void
    {

        
        $collection->add('list','list');
    }
}