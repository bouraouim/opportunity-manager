<?php

namespace App\Repository;

use App\Entity\Area;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Customer;
use App\Entity\Geography;
use App\Entity\Presales;
use App\Entity\User;

/**
 * @method Area|null find($id, $lockMode = null, $lockVersion = null)
 * @method Area|null findOneBy(array $criteria, array $orderBy = null)
 * @method Area[]    findAll()
 * @method Area[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AreaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Area::class);
    }

    /**
     * @return Boolean Returns if a specific area is used 
     */
    public function areaIsUsed($value)
    {
        $qcust = $this->createQueryBuilder('l')
            ->select('count(distinct c.id)')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.areas','a')
            ->where(':val MEMBER OF c.areas')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qgeo = $this->createQueryBuilder("l")
            ->select('count(g.id)')
            ->from(Geography::class,'g')
            ->where('g.area = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpresales = $this->createQueryBuilder('l')
            ->select('count(distinct p.id)')
            ->from(Presales::class, 'p')
            ->leftJoin ('p.areas','a')
            ->where(':val MEMBER OF p.areas')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $quser = $this->createQueryBuilder('l')
            ->select('count(distinct u.id)')
            ->from(User::class, 'u')
            ->leftJoin ('u.area','a')
            ->where(':val MEMBER OF u.areas')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qcust == 0 and $qgeo == 0 and $qpresales == 0 and $quser == 0)
            return false;
        return true;
    }

    /**
     * @return Area[] Returns an array of Area objects
    */
    public function getActiveAreas()
    {
        return $this->createQueryBuilder('a')
           ->where('a.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Area[] Returns an array of Area objects
    */
    public function getActiveAreasHavingCountries()
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT distinct(ar.id), ar.name, ar.status
        FROM geography g, area ar
        WHERE ar.id = g.area_id
        AND ar.status = true;'
        ;
        return $conn->prepare($sql)->executeQuery()->fetchAllAssociative();
    }

    /**
     * @return Geography[] Returns an array of Geography objects
    */
    public function getActiveCountriesByArea($id)
    {
        return $this->createQueryBuilder('b')
            ->select('distinct g')
            ->from(Geography::class,'g')
            ->where('g.area = :val')
            ->andWhere('g.status = true')
            ->setParameter('val', $id)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}