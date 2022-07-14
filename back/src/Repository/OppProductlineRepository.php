<?php

namespace App\Repository;

use App\Entity\OppProductline;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OppProductline|null find($id, $lockMode = null, $lockVersion = null)
 * @method OppProductline|null findOneBy(array $criteria, array $orderBy = null)
 * @method OppProductline[]    findAll()
 * @method OppProductline[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OppProductlineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OppProductline::class);
    }

    // /**
    //  * @return OppProductline[] Returns an array of OppProductline objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findPlByOpp($value)
    {
        return $this->createQueryBuilder('b')
            ->select('distinct pl')
            ->from(OppProductline::class, 'pl')
            ->where('pl.opportunity = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}
