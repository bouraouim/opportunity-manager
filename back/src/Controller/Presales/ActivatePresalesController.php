<?php

namespace App\Controller;

use App\Entity\Presales;

class ActivatePresalesController 
{
    public function __invoke(Presales $presales): Presales
    {
        $presales->setStatus(true);
        return $presales;
    }
}