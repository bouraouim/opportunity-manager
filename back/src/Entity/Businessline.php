<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\BusinesslineRepository;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\ApiPlatform\blcustomfilter;

#[ORM\Entity(repositoryClass: BusinesslineRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>[ 'read:collection']],
    denormalizationContext:['groups'=>[ 'write:collection']],
    itemOperations:[
        'put'=>[
            'denormalization_context'=>['groups'=>['write:collection']]
        ],
        'delete',
        'get','patch'
    ]
),
ApiFilter(blcustomfilter::class, SearchFilter::class, properties:['name'=>'partial','businessunit.name'=>'partial','businessunit.id'=>'exact','status'=>'exact'] ),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name'], arguments: ['orderParameterName' => 'order'])]
class Businessline
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection','write:user_collection','read:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection', 'write:collection','read:user_collection'])]
    private $name;

    #[ORM\ManyToOne(targetEntity: Businessunit::class, inversedBy: 'businessline')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:collection', 'write:collection'])]
    private $businessunit;


    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:collection'])]
    private $status;

   

    
    public function __construct()
    {
        $this->status=true;
    }
    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    

    
     public function toArray(){
         return ['id'=>$this->id,'name'=>$this->name, 'businessunit'=>$this->businessunit->getName()];
     }

     public function getBusinessunit(): ?Businessunit
     {
         return $this->businessunit;
     }

     public function setBusinessunit(?Businessunit $businessunit): self
     {
         $this->businessunit = $businessunit;

         return $this;
     }

     public function getStatus(): ?bool
     {
         return $this->status;
     }

     public function setStatus(?bool $status): self
     {
         $this->status = $status;

         return $this;
     }

    

     
    //  public function __toString() {
    //     return $this->name;
    // }

     
}
