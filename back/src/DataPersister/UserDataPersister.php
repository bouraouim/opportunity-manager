<?php
namespace App\DataPersister;
namespace Symfony\Component\PasswordHasher;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Userr;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
// use Symfony\Component\Security\Core\Encoder\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;




class UserrDataPersister implements ContextAwareDataPersisterInterface
{
    private $userPasswordEncoder;
    private $entityManager;
 
    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface  $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->entityManager = $entityManager;
    }
 
    public function supports($data,array $context = []): bool
    {
        return $data instanceof Userr;
    }
 
    /**
     * @param Userr $data
     */
    public function persist($data,array $context = [])
    {
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->userPasswordEncoder->hashPassword( $data,
                $data->getPlainPassword())
            );
        }
 
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
 
    public function remove($data,array $context = [])
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}