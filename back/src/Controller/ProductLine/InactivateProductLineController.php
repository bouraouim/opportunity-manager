<?php

namespace App\Controller;

use App\Entity\Productline;

class InactivateProductLineController
{
    public function __invoke(Productline $productLine): Productline
    {
        $productLine->setStatus(false);
        return $productLine;
    }
}