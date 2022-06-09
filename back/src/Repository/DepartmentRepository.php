<?php

namespace App\Repository;

use App\Entity\Department;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Customer;
use App\Entity\Presales;
use App\Entity\Productline;
use App\Entity\Opportunity;
use App\Entity\User;

/**
 * @method Department|null find($id, $lockMode = null, $lockVersion = null)
 * @method Department|null findOneBy(array $criteria, array $orderBy = null)
 * @method Department[]    findAll()
 * @method Department[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DepartmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Department::class);
    }

    /**
     * @return Boolean Returns if a specific department is used 
    */
    public function departmentIsUsed($value)
    {
        $qcust = $this->createQueryBuilder('l')
            ->select('count(distinct c.id)')
            ->from(Customer::class, 'c')
            ->leftJoin ('c.department','d')
            ->where(':val MEMBER OF c.department')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpresales = $this->createQueryBuilder('l')
            ->select('count(distinct p.id)')
            ->from(Presales::class, 'p')
            ->leftJoin ('p.department','d')
            ->where(':val MEMBER OF p.department')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qpl = $this->createQueryBuilder('l')
            ->select('count(distinct p.id)')
            ->from(Productline::class, 'p')
            ->leftJoin ('p.department','d')
            ->where(':val MEMBER OF p.department')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $quser = $this->createQueryBuilder('l')
            ->select('count(distinct u.id)')
            ->from(User::class, 'u')
            ->leftJoin ('u.department','d')
            ->where(':val MEMBER OF u.department')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.department = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qcust == 0 and $qpresales == 0 and $qpl == 0 and $quser == 0 and $qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Department[] Returns an array of Department objects
    */
    public function getActiveDepartments()
    {
        return $this->createQueryBuilder('d')
           ->where('d.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Presales[] Returns an array of Presales objects
    */
    public function getActivePresalesByDepartment($id)
    {
        return $this->createQueryBuilder('l')
        ->select('distinct p')
        ->from(Presales::class, 'p')
        ->leftJoin ('p.department','d')
        ->where(':id MEMBER OF p.department')
        ->andWhere('p.status = true')
        ->setParameter('id', $id)
        ->getQuery()
        ->getArrayResult()
        ;
    }
}