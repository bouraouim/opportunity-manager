<?php

namespace App\Controller;

use App\Entity\Department;

class InactivateDepartmentController 
{
    public function __invoke(Department $department): Department
    {
        $department->setStatus(false);
        return $department;
    }
}