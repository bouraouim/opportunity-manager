<?php

namespace App\ApiPlatform;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;


/**
 * @ApiFilter(SearchFilter::class, properties={
 *     'email':'partial','firstname':'partial','lastname':'partial'
 * })**/
class usercustomsearch extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        if ($property !== 'search') {
            return;
        }
        // OR %s.businessunit LIKE :search
        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.email LIKE :search OR %s.lastname LIKE :search OR %s.firstname LIKE :search ', $alias, $alias,$alias))->setParameter('search', '%'.$value.'%');

    }
    public function getDescription(string $resourceClass): array
    {
        return [
            'search' => [
                'property' => null,
                'type' => 'string',
                'required' => false,
            ]
        ];
    }

}