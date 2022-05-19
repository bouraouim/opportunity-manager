<?php

namespace App\Controller;

use App\Entity\Area;

class ActivateAreaController 
{
    public function __invoke(Area $area): Area
    {
        $area->setStatus(true);
        return $area;
    }
}