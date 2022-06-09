<?php

namespace App\Controller;

use App\Entity\Businessunit;
use App\Repository\BusinessunitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/businessunit')]
class BusinessunitController extends AbstractController
{
    #[Route('/read', name: 'businessunit_index', methods: ['GET'])]
    public function index(BusinessunitRepository $businessunitRepository): Response
    {
        return $this->json($businessunitRepository->getActiveBusinessUnits());
    }

    #[Route('/isUsed', name: 'bu_isUsed', methods: ['GET'])]
    public function isUsed(BusinessunitRepository $businessunitRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($businessunitRepository->businessUnitIsUsed($value));
    }

    #[Route('/blByBu', name: 'getBlByBu', methods: ['GET'])]
    public function getBlByBu(BusinessunitRepository $businessunitRepository, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($businessunitRepository->getActiveBusinessLinesByBusinessUnit($id));
    }

    #[Route('/buHavingBl', name: 'buHavingBl', methods: ['GET'])]
    public function getBuHavingBl(BusinessunitRepository $businessunitRepository) : Response
    {
        return $this->json($businessunitRepository->getActiveBusinessUnitsHavingBusinessLines());
    }

    #[Route('/buHavingBlAndArea', name: 'buHavingBlAndArea', methods: ['GET'])]
    public function getBuHavingBlAndArea(BusinessunitRepository $businessunitRepository) : Response
    {
        return $this->json($businessunitRepository->getActiveBusinessUnitsHavingBusinessLinesAndAreas());
    }

    #[Route('/areaByBu', name: 'getAreaByBu', methods: ['GET'])]
    public function getAreaByBu(BusinessunitRepository $businessunitRepository, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($businessunitRepository->getActiveAreasByBusinessUnit($id));
    }
}