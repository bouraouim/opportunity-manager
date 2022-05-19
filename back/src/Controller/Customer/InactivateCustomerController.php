<?php

namespace App\Controller;

use App\Entity\Customer;

class InactivateCustomerController 
{
    public function __invoke(Customer $customer): Customer
    {
        $customer->setStatus(false);
        return $customer;
    }
}