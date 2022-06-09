<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CurrencyRepository;
use Symfony\Component\HttpFoundation\Request;

#[Route('/currency')]
class CurrencyController extends AbstractController
{
    #[Route('/read', name: 'currency_index', methods: ['GET'])]
    public function index(CurrencyRepository $currencyRepo): Response
    {
        return $this->json($currencyRepo->getActiveCurrencies());
    }
    
    #[Route('/closestCurr', name: 'closestCurr', methods: ['GET'])]
    public function getClosestCurr(CurrencyRepository $currencyRepo, Request $request) : Response
    {
        $code = $request->query->get('code');
        $date = $request->query->get('date');
        return $this->json($currencyRepo->getClosestCurrency($code, $date));
    }
}