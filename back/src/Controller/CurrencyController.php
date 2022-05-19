<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CurrencyRepository;

#[Route('/currency')]
class CurrencyController extends AbstractController
{
    #[Route('/read', name: 'currency_index', methods: ['GET'])]
    public function index(CurrencyRepository $currencyRepo): Response
    {
        return $this->json($currencyRepo->getActiveCurrencies());
    }
}