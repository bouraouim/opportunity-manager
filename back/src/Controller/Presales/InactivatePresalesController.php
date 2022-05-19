<?php

namespace App\Controller;

use App\Entity\Presales;

class InactivatePresalesController 
{
    public function __invoke(Presales $presales): Presales
    {
        $presales->setStatus(false);
        return $presales;
    }
}