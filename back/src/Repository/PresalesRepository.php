<?php

namespace App\Repository;

use App\Entity\Presales;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Opportunity;

/**
 * @method Presales|null find($id, $lockMode = null, $lockVersion = null)
 * @method Presales|null findOneBy(array $criteria, array $orderBy = null)
 * @method Presales[]    findAll()
 * @method Presales[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PresalesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Presales::class);
    }

    /**
     * @return Boolean Returns if a specific Presales Engineer is used 
     */
    public function presalesIsUsed($value)
    {
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.presalesEngineer = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qopp == 0)
            return false;
        return true;
    }

    /**
     * @return Presales[] Returns an array of Presales objects
     */
    public function getActivePresales()
    {
        return $this->createQueryBuilder('p')
           ->where('p.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }
}