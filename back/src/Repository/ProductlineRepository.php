<?php

namespace App\Repository;

use App\Entity\Productline;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Opportunity;

/**
 * @method Productline|null find($id, $lockMode = null, $lockVersion = null)
 * @method Productline|null findOneBy(array $criteria, array $orderBy = null)
 * @method Productline[]    findAll()
 * @method Productline[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductlineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Productline::class);
    }

    /**
     * @return Boolean Returns if a specific product line is used 
     */
    public function productLineIsUsed($value)
    {
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.area = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Productline[] Returns an array of Productline objects
     */
    public function getActiveProductLine()
    {
        return $this->createQueryBuilder('pl')
           ->where('pl.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }
}