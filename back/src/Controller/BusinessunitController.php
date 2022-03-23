<?php

namespace App\Controller;

use App\Entity\Businessunit;
use App\Form\BusinessunitType;
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
        {
       
            $businessunites = $businessunitRepository->findAll();
            foreach ($businessunites as $businessunit) {
                $arrayofbusinessunites[]=$businessunit->toArray();
            }
            return $this->json($arrayofbusinessunites);
        
    }
    }

    #[Route('/new', name: 'businessunit_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $businessunit = new Businessunit();
        $form = $this->createForm(BusinessunitType::class, $businessunit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($businessunit);
            $entityManager->flush();

            return $this->redirectToRoute('businessunit_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('businessunit/new.html.twig', [
            'businessunit' => $businessunit,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'businessunit_show', methods: ['GET'])]
    public function show(Businessunit $businessunit): Response
    {
        return $this->render('businessunit/show.html.twig', [
            'businessunit' => $businessunit,
        ]);
    }

    #[Route('/{id}/edit', name: 'businessunit_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Businessunit $businessunit, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BusinessunitType::class, $businessunit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('businessunit_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('businessunit/edit.html.twig', [
            'businessunit' => $businessunit,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'businessunit_delete', methods: ['POST'])]
    public function delete(Request $request, Businessunit $businessunit, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$businessunit->getId(), $request->request->get('_token'))) {
            $entityManager->remove($businessunit);
            $entityManager->flush();
        }

        return $this->redirectToRoute('businessunit_index', [], Response::HTTP_SEE_OTHER);
    }
}
