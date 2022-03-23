<?php

namespace App\Repository;

use App\Entity\Businessline;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Businessline|null find($id, $lockMode = null, $lockVersion = null)
 * @method Businessline|null findOneBy(array $criteria, array $orderBy = null)
 * @method Businessline[]    findAll()
 * @method Businessline[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BusinesslineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Businessline::class);
    }

    // /**
    //  * @return Businessline[] Returns an array of Businessline objects
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
    public function findOneBySomeField($value): ?Businessline
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
