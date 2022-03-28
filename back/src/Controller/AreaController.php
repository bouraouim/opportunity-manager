<?php

namespace App\Controller;

use App\Entity\Area;
use App\Form\AreaType;
use App\Repository\AreaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/area')]
class AreaController extends AbstractController
{
//    #[Route('/read', name: 'area_index', methods: ['GET'])]
//    public function index(AreaRepository $areaRepository): Response
//    {
//        $areas=$areaRepository->findAll();
//        foreach ($areas as $area) {
//            $arrayofareas[]=$area->toArray();
//        }
//        return $this->json($arrayofareas);
//    }
//
//    #[Route('/new', name: 'area_new', methods: ['GET', 'POST'])]
//    public function new(Request $request, EntityManagerInterface $entityManager): Response
//    {
//        $area = new Area();
//        $form = $this->createForm(AreaType::class, $area);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->persist($area);
//            $entityManager->flush();
//
//            return $this->redirectToRoute('area_index', [], Response::HTTP_SEE_OTHER);
//        }
//
//        return $this->renderForm('area/new.html.twig', [
//            'area' => $area,
//            'form' => $form,
//        ]);
//    }
//
//    #[Route('/{id}', name: 'area_show', methods: ['GET'])]
//    public function show(Area $area): Response
//    {
//        return $this->render('area/show.html.twig', [
//            'area' => $area,
//        ]);
//    }
//
//    #[Route('/{id}/edit', name: 'area_edit', methods: ['GET', 'POST'])]
//    public function edit(Request $request, Area $area, EntityManagerInterface $entityManager): Response
//    {
//        $form = $this->createForm(AreaType::class, $area);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->flush();
//
//            return $this->redirectToRoute('area_index', [], Response::HTTP_SEE_OTHER);
//        }
//
//        return $this->renderForm('area/edit.html.twig', [
//            'area' => $area,
//            'form' => $form,
//        ]);
//    }
//
//    #[Route('/{id}', name: 'area_delete', methods: ['POST'])]
//    public function delete(Request $request, Area $area, EntityManagerInterface $entityManager): Response
//    {
//        if ($this->isCsrfTokenValid('delete'.$area->getId(), $request->request->get('_token'))) {
//            $entityManager->remove($area);
//            $entityManager->flush();
//        }
//
//        return $this->redirectToRoute('area_index', [], Response::HTTP_SEE_OTHER);
//    }
}
