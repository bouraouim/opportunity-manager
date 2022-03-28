<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserDataPersister implements DataPersisterInterface
{
    private $userPasswordEncoder;
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->entityManager = $entityManager;
    }
 
    public function supports($data,array $context = []): bool
    {
        return $data instanceof User;
    }
 
    /**
     * @param User $data
     */
    public function persist($data,array $context = [])
    {
        if ($data->getPlainPassword()) {
            // hash the password (based on the security.yaml config for the $user class)
            $hashedPassword = $this->userPasswordEncoder->hashPassword(
                $data,
                $data->getPlainPassword()
            );

            $data->setPassword($hashedPassword);
            $data->eraseCredentials();
        }
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
 
    public function remove($data,array $context = [])
    {
        //$this->entityManager->remove();
        //$this->entityManager->flush();
    }
}