<?php

namespace App\Repository;

use App\Entity\Geography;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Customer;
use App\Entity\Opportunity;

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

    /**
     * @return Boolean Returns if a specific geographie is used 
     */
    public function geographyIsUsed($value)
    {
        $qcust = $this->createQueryBuilder('l')
            ->select('count(distinct c.id)')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.count','g')
            ->where(':val MEMBER OF c.count')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.country = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qcust == 0 and $qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Geography[] Returns an array of Geography objects
     */
    public function getActiveGeographies()
    {
        return $this->createQueryBuilder('g')
           ->where('g.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Customer[] Returns an array of Customer objects
    */
    public function findCustomersByCountry($id)
    {
        return $this->createQueryBuilder('g')
            ->select('distinct c')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.count','geo')
            ->where(':id MEMBER OF c.count')
            ->setParameter('id', $id)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}