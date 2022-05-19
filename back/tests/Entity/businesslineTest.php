<?php
namespace App\Tests\Entity;

use App\Entity\Businessline;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class businesslineTest extends KernelTestCase{

    public function getEntity():Businessline{
        return (new Businessline())
        ->setName("test")  
        ->setStatus(true);
    }

    // public function     asserthasError(Businessline $code , int $number=0){
    //     self::bootKernel() ;
    //     $container = static::getContainer();
    //     $error=$container->get('validator')->validate($code);
    //     $this->assertCount($number,$error);
    // }

    public function testValidEntity (){
        $code=(new Businessline())
        ->setName("test")  
        ->setStatus(true);
        self::bootKernel() ;
        $container = static::getContainer();
        $error=$container->get('validator')->validate($code);
        $this->assertCount(0,$error);
    }

    public function testInvalidEntity (){
        $code=$this->getEntity()->setName(123);
        self::bootKernel();
        $container = static::getContainer();
        $error=$container->get('validator')->validate($code);
        $this->assertCount(1,$error);
    }
}