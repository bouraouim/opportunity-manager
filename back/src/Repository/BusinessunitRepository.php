<?php

namespace App\Repository;

use App\Entity\Businessunit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Businessline;
use App\Entity\Customer;
use App\Entity\Area;
use App\Entity\Department;
use App\Entity\Presales;
use App\Entity\Productline;
use App\Entity\User;
use App\Entity\Opportunity;

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

    /**
     * @return Boolean Returns if a specific business used is used 
    */
    public function businessUnitIsUsed($value)
    {
        $qbl = $this->createQueryBuilder("l")
            ->select('count(distinct bl.id)')
            ->from(Businessline::class,'bl')
            ->leftJoin ('bl.businessunit','bu')
            ->where(':val MEMBER OF bl.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qarea = $this->createQueryBuilder('l')
            ->select('count(distinct a.id)')
            ->from(Area::class, 'a')
            ->leftJoin ('a.businessunit','bu')
            ->where(':val MEMBER OF a.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qcust = $this->createQueryBuilder('l')
            ->select('count(distinct c.id)')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.businessunit','bu')
            ->where(':val MEMBER OF c.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qdept = $this->createQueryBuilder('l')
            ->select('count(distinct d.id)')
            ->from(Department::class, 'd')
            ->leftJoin ('d.businessunit','bu')
            ->where(':val MEMBER OF d.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpresales = $this->createQueryBuilder('l')
            ->select('count(distinct p.id)')
            ->from(Presales::class, 'p')
            ->leftJoin ('p.businessunit','bu')
            ->where(':val MEMBER OF p.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpl = $this->createQueryBuilder('l')
            ->select('count(distinct pl.id)')
            ->from(Productline::class, 'pl')
            ->leftJoin ('pl.businessunit','bu')
            ->where(':val MEMBER OF pl.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $quser = $this->createQueryBuilder('l')
            ->select('count(distinct u.id)')
            ->from(User::class, 'u')
            ->leftJoin ('u.businessunit','bu')
            ->where(':val MEMBER OF u.businessunit')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.businessunit = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qbl == 0 and $qarea == 0 and $qcust == 0 and $qdept == 0 and $qpresales == 0  and $qpl == 0 and $quser == 0 and $qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Businessunit[] Returns an array of Businessunit objects
    */
    public function getActiveBusinessUnits()
    {
        return $this->createQueryBuilder('bu')
           ->where('bu.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Businessline[] Returns an array of Businessline objects
    */
    public function getActiveBusinessLinesByBusinessUnit($id)
    {
        return $this->createQueryBuilder('b')
            ->select('distinct bl')
            ->from(Businessline::class, 'bl')
            ->leftJoin ('bl.businessunit','bu')
            ->where(':id MEMBER OF bl.businessunit')
            ->andWhere('bl.status = true')
            ->setParameter('id', $id)
            ->getQuery()
            ->getArrayResult()
        ;
    }

    /**
     * @return Businessunit[] Returns an array of Businessunit objects
    */
    public function getActiveBusinessUnitsHavingBusinessLines()
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT distinct(bu.id), bu.name, bu.status
            FROM businessline_businessunit bubl, businessunit bu
            WHERE bubl.businessunit_id = bu.id
            AND bu.status = true'
        ;
        return $conn->prepare($sql)->executeQuery()->fetchAllAssociative();
    }

    /**
     * @return Businessunit[] Returns an array of Businessunit objects
    */
    public function getActiveBusinessUnitsHavingBusinessLinesAndAreas()
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT distinct(bu.id), bu.name, bu.status
            FROM businessline_businessunit bubl, businessunit bu, area_businessunit abu
            WHERE bubl.businessunit_id = bu.id
            AND abu.businessunit_id = bu.id
            AND bu.status = true'
        ;
        return $conn->prepare($sql)->executeQuery()->fetchAllAssociative();
    }

    /**
     * @return Area[] Returns an array of Area objects
    */
    public function getActiveAreasByBusinessUnit($id)
    {
        return $this->createQueryBuilder('b')
            ->select('distinct a')
            ->from(Area::class, 'a')
            ->leftJoin ('a.businessunit','bu')
            ->where(':id MEMBER OF a.businessunit')
            ->andWhere('a.status = true')
            ->setParameter('id', $id)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}