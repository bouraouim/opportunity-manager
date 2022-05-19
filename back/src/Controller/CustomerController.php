<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CustomerRepository;

#[Route('/customer')]
class CustomerController extends AbstractController
{
    #[Route('/read', name: 'cust_index', methods: ['GET'])]
    public function index(CustomerRepository $customerRepository): Response
    {
        return $this->json($customerRepository->getActiveCustomers());
    }
    
    #[Route('/isUsed', name: 'cust_isUsed', methods: ['GET'])]
    public function isUsed(CustomerRepository $customerRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($customerRepository->customerIsUsed($value));
    }
}