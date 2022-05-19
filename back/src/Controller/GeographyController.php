<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\GeographyRepository;
use App\Entity\Geography;
use Symfony\Component\HttpFoundation\Request;

#[Route('/geography')]
class GeographyController extends AbstractController
{
    #[Route('/read', name: 'geography_index', methods: ['GET'])]
    public function index(GeographyRepository $geographyRepo): Response
    {
        return $this->json($geographyRepo->getActiveGeographies());
    }
    
    #[Route('/isUsed', name: 'geography_isUsed', methods: ['GET'])]
    public function isUsed(GeographyRepository $geographyRepo, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($geographyRepo->geographyIsUsed($value));
    }

    #[Route('/custByCount', name: 'getCustByCount', methods: ['GET'])]
    public function CustByCount(GeographyRepository $geographyRepo, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($geographyRepo->findCustomersByCountry($id));
    }
}