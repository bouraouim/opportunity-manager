<?php

namespace App\Repository;

use App\Entity\Geography;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Geography|null find($id, $lockMode = null, $lockVersion = null)
 * @method Geography|null findOneBy(array $criteria, array $orderBy = null)
 * @method Geography[]    findAll()
 * @method Geography[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GeographyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Geography::class);
    }

    // /**
    //  * @return Geography[] Returns an array of Geography objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Geography
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
