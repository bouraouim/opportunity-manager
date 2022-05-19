<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProductlineRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\ActivateProductLineController;
use App\Controller\InactivateProductLineController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: ProductlineRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>['read:productline_collection']],
    denormalizationContext:['groups'=>['write:productline_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/productlines/{id}/activate',
            'controller' => ActivateProductLineController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/productlines/{id}/inactivate',
            'controller' => InactivateProductLineController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['name'=>'partial','businessunit.name'=>'partial','businessline.name'=>'partial','department.name'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name','businessline.name','department.name'], arguments: ['orderParameterName' => 'order'])
]

class Productline
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $name;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'productlines')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $businessunit;

    #[ORM\ManyToMany(targetEntity: Businessline::class, inversedBy: 'productlines')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $businessline;

    #[ORM\ManyToMany(targetEntity: Department::class, inversedBy: 'productlines')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:productline_collection','write:productline_collection'])]
    private $department;

    public function __construct()
    {
        $this->businessunit = new ArrayCollection();
        $this->businessline = new ArrayCollection();
        $this->department = new ArrayCollection();
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

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return Collection<int, Businessunit>
     */
    public function getBusinessunit(): Collection
    {
        return $this->businessunit;
    }

    public function addBusinessunit(Businessunit $businessunit): self
    {
        if (!$this->businessunit->contains($businessunit)) {
            $this->businessunit[] = $businessunit;
        }
        return $this;
    }

    public function removeBusinessunit(Businessunit $businessunit): self
    {
        $this->businessunit->removeElement($businessunit);
        return $this;
    }

    /**
     * @return Collection<int, Businessline>
     */
    public function getBusinessline(): Collection
    {
        return $this->businessline;
    }

    public function addBusinessline(Businessline $businessline): self
    {
        if (!$this->businessline->contains($businessline)) {
            $this->businessline[] = $businessline;
        }
        return $this;
    }

    public function removeBusinessline(Businessline $businessline): self
    {
        $this->businessline->removeElement($businessline);
        return $this;
    }

    /**
     * @return Collection<int, Department>
     */
    public function getDepartment(): Collection
    {
        return $this->department;
    }

    public function addDepartment(Department $department): self
    {
        if (!$this->department->contains($department)) {
            $this->department[] = $department;
        }
        return $this;
    }

    public function removeDepartment(Department $department): self
    {
        $this->department->removeElement($department);
        return $this;
    }
}