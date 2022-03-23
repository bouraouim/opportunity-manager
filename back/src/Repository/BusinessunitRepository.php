<?php

namespace App\Repository;

use App\Entity\Businessunit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Businessunit|null find($id, $lockMode = null, $lockVersion = null)
 * @method Businessunit|null findOneBy(array $criteria, array $orderBy = null)
 * @method Businessunit[]    findAll()
 * @method Businessunit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BusinessunitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Businessunit::class);
    }

    // /**
    //  * @return Businessunit[] Returns an array of Businessunit objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Businessunit
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
