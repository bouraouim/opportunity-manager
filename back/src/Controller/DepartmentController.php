<?php

namespace App\Controller;

use App\Entity\Department;
use App\Form\DepartmentType;
use App\Repository\DepartmentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/department')]
class DepartmentController extends AbstractController
{
    #[Route('/read', name: 'department_index', methods: ['GET'])]
    public function index(DepartmentRepository $departmentRepository): Response
    {
        return $this->json($departmentRepository->getActiveDepartments());
    }

    #[Route('/isUsed', name: 'department_isUsed', methods: ['GET'])]
    public function isUsed(DepartmentRepository $departmentRepository, Request $request) : Response
    {
        $value = $request->query->get('value');
        return $this->json($departmentRepository->departmentIsUsed($value));
    }
}