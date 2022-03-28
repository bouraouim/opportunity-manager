<?php
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Userr;


class RegistrationController extends AbstractController
{
//    public function index(UserPasswordHasherInterface $passwordHasher)
//    {
//        // ... e.g. get the user data from a registration form
//        $user = new Userr();
//        $plaintextPassword = $user->getPlainPassword() ;
//
//        // hash the password (based on the security.yaml config for the $user class)
//        $hashedPassword = $passwordHasher->hashPassword(
//            $user,
//            $plaintextPassword
//        );
//        $user->setPassword($hashedPassword);
//
//        // ...
//    }
}