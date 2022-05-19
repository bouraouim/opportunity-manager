<?php

namespace App\Controller;

use App\Entity\Businessunit;

class InactivateBusinessUnitController 
{
    public function __invoke(Businessunit $businessUnit): Businessunit
    {
        $businessUnit->setStatus(false);
        return $businessUnit;
    }
}