<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\OppProductlineRepository;

#[Route('/PLOP')]
class OppProductLineController extends AbstractController
{
    #[Route('/opp/product/line', name: 'opp_product_line')]
    public function index(): Response
    {
        return $this->render('opp_product_line/index.html.twig', [
            'controller_name' => 'OppProductLineController',
        ]);
    }
    #[Route('/plByOpp', name: 'getplByOpp', methods: ['GET'])]
    public function getPlByOpp(OppProductlineRepository $OppPl, Request $request) : Response
    {
        $id = $request->query->get('id');
        return $this->json($OppPl->findPlByOpp($id));
    }
}
