<?php

namespace App\Controller;

use App\Entity\Number;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\NumberRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

#[Route('/user')]
class UserController extends AbstractController
{
    #[Route('/salesManagers', name: 'getSalesManagers', methods: ['GET'])]
    public function getSalesManagers(UserRepository $userRepo, Request $request): Response
    {
        $email = $request->query->get('email');
        return $this->json($userRepo->findSalesManagers($email));
    }

    #[Route('/read', name: 'user_index', methods: ['GET'])]
    public function index(UserRepository $userRepo): Response
    {
        return $this->json($userRepo->getActiveUser());
    }
    
    #[Route('/isUsed', name: 'user_isUsed', methods: ['GET'])]
    public function isUsed(UserRepository $userRepo, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($userRepo->userIsUsed($value));
    }
    public function anonymize(UserRepository $userRepo,  EntityManagerInterface $entityManager ,NumberRepository $numberRepo   )
    {
        $users = $userRepo->findAll();
        $number=$numberRepo->findOneBy(['id' =>1 ]);
        $time = (date("Y-m-d") );
        $date=date_create($time);
        foreach( $users as $user){
        $interval = date_diff($date, $user->lastconnectiondate);
        if(($interval->format('%a')>1) and ($user->getStatus()==true) and ($user->getAnonymized()==true)){
            $user->setAnonymized(true) ;
            $user->setStatus(false);
            $user->setEmail("email".strval($number->getNum()+1));
            $user->setFirstname("firstname".strval($number->getNum()+1));
            $user->setLastname("lastname".strval($number->getNum()+1));
            $number->setNum($number->getNum()+1);
            
        }
        $entityManager->flush();
        }
    }
}