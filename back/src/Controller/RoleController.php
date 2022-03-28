<?php

namespace App\Controller;

use App\Entity\Role;
use App\Form\RoleType;
use App\Repository\RoleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

//#[Route('/role')]
class RoleController extends AbstractController
{
//    #[Route('/read', name: 'role_index', methods: ['GET'])]
//    public function index(RoleRepository $roleRepository): Response
//    {
//        $roles = $roleRepository->findAll();
//        foreach ($roles as $role) {
//            $arrayofroles[]=$role->toArray();
//        }
//        return $this->json($arrayofroles);
//    }
//
//    #[Route('/new', name: 'role_new', methods: ['GET', 'POST'])]
//    public function new(Request $request, EntityManagerInterface $entityManager): Response
//    {
//        $role = new Role();
//        $form = $this->createForm(RoleType::class, $role);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->persist($role);
//            $entityManager->flush();
//
//            return $this->redirectToRoute('role_index', [], Response::HTTP_SEE_OTHER);
//        }
//
//        return $this->renderForm('role/new.html.twig', [
//            'role' => $role,
//            'form' => $form,
//        ]);
//    }
//
//    #[Route('/{id}', name: 'role_show', methods: ['GET'])]
//    public function show(Role $role): Response
//    {
//        return $this->render('role/show.html.twig', [
//            'role' => $role,
//        ]);
//    }
//
//    #[Route('/{id}/edit', name: 'role_edit', methods: ['GET', 'POST'])]
//    public function edit(Request $request, Role $role, EntityManagerInterface $entityManager): Response
//    {
//        $form = $this->createForm(RoleType::class, $role);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->flush();
//
//            return $this->redirectToRoute('role_index', [], Response::HTTP_SEE_OTHER);
//        }
//
//        return $this->renderForm('role/edit.html.twig', [
//            'role' => $role,
//            'form' => $form,
//        ]);
//    }
//
//    #[Route('/{id}', name: 'role_delete', methods: ['POST'])]
//    public function delete(Request $request, Role $role, EntityManagerInterface $entityManager): Response
//    {
//        if ($this->isCsrfTokenValid('delete'.$role->getId(), $request->request->get('_token'))) {
//            $entityManager->remove($role);
//            $entityManager->flush();
//        }
//
//        return $this->redirectToRoute('role_index', [], Response::HTTP_SEE_OTHER);
//    }
}
