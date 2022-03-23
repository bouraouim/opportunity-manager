<?php

namespace App\Repository;

use App\Entity\Userr;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Userr|null find($id, $lockMode = null, $lockVersion = null)
 * @method Userr|null findOneBy(array $criteria, array $orderBy = null)
 * @method Userr[]    findAll()
 * @method Userr[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserrRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Userr::class);
    }

    // /**
    //  * @return Userr[] Returns an array of Userr objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Userr
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
