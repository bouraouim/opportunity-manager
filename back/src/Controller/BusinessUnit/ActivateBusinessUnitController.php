<?php

namespace App\Controller;

use App\Entity\Businessunit;

class ActivateBusinessUnitController 
{
    public function __invoke(Businessunit $businessUnit): Businessunit
    {
        $businessUnit->setStatus(true);
        return $businessUnit;
    }
}