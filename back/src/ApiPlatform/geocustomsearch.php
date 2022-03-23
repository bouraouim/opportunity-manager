<?php

namespace App\ApiPlatform;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;


/**
 * @ApiFilter(SearchFilter::class, properties={
 *     'country':'partial','area.name':'partial','continent':'partial'
 * })**/
class geocustomsearch extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        if ($property !== 'search') {
            return;
        }
        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.name LIKE :search OR %s.businessunit LIKE :search', $alias, $alias))->setParameter('search', '%'.$value.'%');

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