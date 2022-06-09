<?php

namespace App\Repository;

use App\Entity\Currency;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Currency|null find($id, $lockMode = null, $lockVersion = null)
 * @method Currency|null findOneBy(array $criteria, array $orderBy = null)
 * @method Currency[]    findAll()
 * @method Currency[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CurrencyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Currency::class);
    }

    /**
     * @return Currency[] Returns an array of Currency objects
    */
    public function getActiveCurrencies()
    {
        return $this->createQueryBuilder('c')
           ->where('c.status = true')
           ->getQuery()
           ->getArrayResult()
        ;
    }

    /**
     * @return Currency[] Returns a Currency objects
    */
    public function getClosestCurrency($code, $date)
    {
        return $this->createQueryBuilder('c')
            ->select('distinct(cur.id) as id, cur.code, cur.appDate, cur.euroCnvrRate, cur.status')
            ->from(Currency::class, 'cur')
            ->where('cur.status = true')
            ->andWhere('cur.code = :code')
            ->andWhere('cur.appDate <= :date')
            ->setParameter('code', $code)
            ->setParameter(':date', $date)
            ->orderBy('cur.appDate', 'DESC')
            ->getQuery()
            ->getArrayResult()
        ;
    }
}