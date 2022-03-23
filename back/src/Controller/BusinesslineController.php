<?php

namespace App\Controller;

use App\Entity\Businessline;
use App\Form\BusinesslineType;
use App\Repository\BusinesslineRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/businessline')]
class BusinesslineController extends AbstractController
{
    #[Route('/read', name: 'businessline_index', methods: ['GET'])]
    public function index(BusinesslineRepository $businesslineRepository)
    {
       
            $businesslines = $businesslineRepository->findAll();
            $arrayofbusinesslines=[];
            foreach ($businesslines as $businessline) {
                $arrayofbusinesslines[]=$businessline->toArray();
            }
            return $this->json($arrayofbusinesslines);
        
    }

    #[Route('/new', name: 'businessline_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $businessline = new Businessline();
        $form = $this->createForm(BusinesslineType::class, $businessline);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($businessline);
            $entityManager->flush();

            return $this->redirectToRoute('businessline_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('businessline/new.html.twig', [
            'businessline' => $businessline,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'businessline_show', methods: ['GET'])]
    public function show(Businessline $businessline): Response
    {
        return $this->render('businessline/show.html.twig', [
            'businessline' => $businessline,
        ]);
    }

    #[Route('/{id}/edit', name: 'businessline_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Businessline $businessline, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BusinesslineType::class, $businessline);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('businessline_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('businessline/edit.html.twig', [
            'businessline' => $businessline,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'businessline_delete', methods: ['POST'])]
    public function delete(Request $request, Businessline $businessline, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$businessline->getId(), $request->request->get('_token'))) {
            $entityManager->remove($businessline);
            $entityManager->flush();
        }

        return $this->redirectToRoute('businessline_index', [], Response::HTTP_SEE_OTHER);
    }
}
