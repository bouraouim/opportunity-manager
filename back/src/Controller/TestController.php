<?php
 
namespace App\Controller;
 
use App\Entity\Userr;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
 
class TestController
{
//    #[Route('/api/userrs', methods: ['GET', 'POST'])]
//    public function index(UserPasswordHasherInterface $passwordHasher): Response
//    {
//        $user = new Userr();
//        $plaintextPassword = $user->getpassword;
//        echo("aaaa");
//        $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
//        $user->setLogin("aaa");
//
//        return new Response($hashedPassword);
//    }
}