<?php

namespace App\Controller;

use App\Entity\Area;
use App\Repository\AreaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/area')]
class AreaController extends AbstractController
{
    #[Route('/read', name: 'area_index', methods: ['GET'])]
    public function index(AreaRepository $areaRepository): Response
    {
        return $this->json($areaRepository->getActiveAreas());
    }
    
    #[Route('/isUsed', name: 'area_isUsed', methods: ['GET'])]
    public function isUsed(AreaRepository $areaRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($areaRepository->areaIsUsed($value));
    }
}