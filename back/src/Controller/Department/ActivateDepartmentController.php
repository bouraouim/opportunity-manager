<?php

namespace App\Controller;

use App\Entity\Department;

class ActivateDepartmentController 
{
    public function __invoke(Department $department): Department
    {
        $department->setStatus(true);
        return $department;
    }
}