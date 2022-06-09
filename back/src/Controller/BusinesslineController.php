<?php

namespace App\Controller;

use App\Entity\Businessline;
use App\Repository\BusinesslineRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\BusinessunitRepository;

#[Route('/businessline')]
class BusinesslineController extends AbstractController
{
    #[Route('/read', name: 'businessline_index', methods: ['GET'])]
    public function index(BusinesslineRepository $businesslineRepository)
    {
        return $this->json($businesslineRepository->getActiveBusinessLines());
    }

    #[Route('/isUsed', name: 'bl_isUsed', methods: ['GET'])]
    public function isUsed(BusinesslineRepository $businesslineRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($businesslineRepository->businessLineIsUsed($value));
    }

    #[Route('/deptByBl', name: 'getDeptByBl', methods: ['GET'])]
    public function getdeptByBl(BusinesslineRepository $businesslineRepository, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($businesslineRepository->getDepartmentsByBusinessLine($id));
    }

    #[Route('/blHavingDept', name: 'blHavingDept', methods: ['GET'])]
    public function getBuHavingBlAndArea(BusinesslineRepository $businesslineRepository) : Response
    {
        return $this->json($businesslineRepository->getActiveBusinessLinesHavingDepartments());
    }

    #[Route('/plByBl', name: 'getplByBl', methods: ['GET'])]
    public function getPlByBl(BusinesslineRepository $businesslineRepository, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($businesslineRepository->getActiveProductLineByBusinessLine($id));
    }
}