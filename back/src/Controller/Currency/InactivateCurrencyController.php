<?php

namespace App\Controller;

use App\Entity\Currency;

class InactivateCurrencyController 
{
    public function __invoke(Currency $currency): Currency
    {
        $currency->setStatus(false);
        return $currency;
    }
}