<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Doctrine\ORM\Query;
use App\Entity\Opportunity;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    /**
     * @return User[] Returns an array of User objects
     */
    public function findSalesManagers($email)
    {
        return $this->createQueryBuilder('user')
           ->leftJoin ('user.role','r')
           ->where('r.name LIKE :name AND user.anonymized = false')
           ->orWhere('user.email = :val')
           ->setParameter('name', '%Sales Manager%')
           ->setParameter('val', $email)
           ->getQuery()
           ->getArrayResult()
        ;
    }
    
    /**
     * @return Boolean Returns if a specific user is used 
     */
    public function userIsUsed($value)
    {
        $qopp = $this->createQueryBuilder("l")
            ->select('count(o.id)')
            ->from(Opportunity::class,'o')
            ->where('o.salesManager = :val')
            ->andWhere('l.anonymized = false')
            ->setParameter('val', $value)
            ->getQuery()
            ->getSingleScalarResult()
        ;
        if($qopp == 0)
            return false;
        return true;
    }

    /**
     * @return User[] Returns an array of User objects
     */
    public function getActiveUser()
    {
        return $this->createQueryBuilder('u')
           ->where('u.status = true AND u.anonymized = false')
           ->getQuery()
           ->getArrayResult()
        ;
    }
}