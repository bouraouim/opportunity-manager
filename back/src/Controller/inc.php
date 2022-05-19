<?php

namespace App\Controller;
use App\Entity\Userr;



class inc{

    public function __invoke(Userr $data): Userr
    {
        $data->setAnonymizednumber();
        return $data;
    }
}