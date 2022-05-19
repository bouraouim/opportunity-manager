<?php

namespace App\Repository;

use App\Entity\Businessline;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Customer;
use App\Entity\Department;
use App\Entity\Presales;
use App\Entity\Productline;
use App\Entity\User;
use App\Entity\Opportunity;

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

    /**
     * @return Boolean Returns if a specific business line is used 
     */
    public function businessLineIsUsed($value)
    {
        $qcust = $this->createQueryBuilder('l')
            ->select('count(distinct c.id)')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.businessline','bl')
            ->where(':val MEMBER OF c.businessline')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qdept = $this->createQueryBuilder('l')
            ->select('count(distinct d.id)')
            ->from(Department::class, 'd')
            ->leftJoin ('d.businessline','bl')
            ->where(':val MEMBER OF d.businessline')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpresales = $this->createQueryBuilder('l')
            ->select('count(distinct p.id)')
            ->from(Presales::class, 'p')
            ->leftJoin ('p.businessline','bl')
            ->where(':val MEMBER OF p.businessline')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpl = $this->createQueryBuilder('l')
            ->select('count(distinct pl.id)')
            ->from(Productline::class, 'pl')
            ->leftJoin ('pl.businessline','bl')
            ->where(':val MEMBER OF pl.businessline')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $quser = $this->createQueryBuilder('l')
            ->select('count(distinct u.id)')
            ->from(User::class, 'u')
            ->leftJoin ('u.businessline','bl')
            ->where(':val MEMBER OF u.businessline')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.businessline = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qcust == 0 and $qdept == 0 and $qpresales == 0  and $qpl == 0 and $quser == 0 and $qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Businessline[] Returns an array of Businessline objects
    */
    public function getActiveBusinessLines()
    {
        return $this->createQueryBuilder('bl')
           ->where('bl.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Department[] Returns an array of Department objects
    */
    public function getDepartmentsByBusinessLine($id)
    {
        return $this->createQueryBuilder('b')
            ->select('distinct d')
            ->from(Department::class, 'd')
            ->leftJoin ('d.businessline','bl')
            ->where(':id MEMBER OF d.businessline')
            ->setParameter('id', $id)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}