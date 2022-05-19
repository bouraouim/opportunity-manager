<?php

namespace App\Controller;

use App\Entity\Customer;

class ActivateCustomerController 
{
    public function __invoke(Customer $customer): Customer
    {
        $customer->setStatus(true);
        return $customer;
    }
}