<?php

namespace App\Controller;

use App\Entity\Productline;

class ActivateProductLineController
{
    public function __invoke(Productline $productLine): Productline
    {
        $productLine->setStatus(true);
        return $productLine;
    }
}