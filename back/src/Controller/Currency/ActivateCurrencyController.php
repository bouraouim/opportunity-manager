<?php

namespace App\Controller;

use App\Entity\Currency;

class ActivateCurrencyController 
{
    public function __invoke(Currency $currency): Currency
    {
        $currency->setStatus(true);
        return $currency;
    }
}