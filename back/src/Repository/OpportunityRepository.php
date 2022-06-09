<?php

namespace App\Repository;

use App\Entity\Opportunity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Opportunity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Opportunity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Opportunity[]    findAll()
 * @method Opportunity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OpportunityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Opportunity::class);
    }

    /**
     * @return Opportunity Returns an Opportunity's id objects
    */
    public function getLastId()
    {
        return $this->createQueryBuilder('o')
            ->select('max(opp.id)')
            ->from(Opportunity::class, 'opp')
            ->getQuery()
            ->getResult()
        ;
    }
}