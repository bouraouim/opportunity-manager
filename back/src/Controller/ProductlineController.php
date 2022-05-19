<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProductlineRepository;
use Symfony\Component\HttpFoundation\Request;

#[Route('/productline')]
class ProductlineController extends AbstractController
{
    #[Route('/read', name: 'pl_index', methods: ['GET'])]
    public function index(ProductlineRepository $productlineRepo): Response
    {
        return $this->json($productlineRepo->getActiveProductLine());
    }
    
    #[Route('/isUsed', name: 'pl_isUsed', methods: ['GET'])]
    public function isUsed(ProductlineRepository $productlineRepo, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($productlineRepo->productLineIsUsed($value));
    }
}