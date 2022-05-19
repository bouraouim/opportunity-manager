<?php

namespace App\Controller;

use App\Entity\Area;

class InactivateAreaController 
{
    public function __invoke(Area $area): Area
    {
        $area->setStatus(false);
        return $area;
    }
}