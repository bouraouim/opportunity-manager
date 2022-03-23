<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DepartmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: DepartmentRepository::class)]
#[ApiResource]
class Department
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $id;

    #[Groups(['read:user_collection'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $name;



   

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
        return ['id'=>$this->id,'name'=>$this->name];
    }

  

  
    public function __toString() {
        return $this->name;
    }
}
