<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PresalesRepository;
use Symfony\Component\HttpFoundation\Request;

#[Route('/presales')]
class PresalesController extends AbstractController
{
    #[Route('/read', name: 'presales_index', methods: ['GET'])]
    public function index(PresalesRepository $presalesRepository): Response
    {
        return $this->json($presalesRepository->getActivePresales());
    }
    
    #[Route('/isUsed', name: 'presales_isUsed', methods: ['GET'])]
    public function isUsed(PresalesRepository $presalesRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($presalesRepository->presalesIsUsed($value));
    }
}
