<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DepartmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\ActivateDepartmentController;
use App\Controller\InactivateDepartmentController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: DepartmentRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext:['groups'=>['read:department_collection']],
    denormalizationContext:['groups'=>['write:department_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/departments/{id}/activate',
            'controller' => ActivateDepartmentController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/departments/{id}/inactivate',
            'controller' => InactivateDepartmentController::class
        ]
    ]
),
ApiFilter( SearchFilter::class, properties:['name'=>'partial','businessunit.name'=>'partial','businessunit.id'=>'exact','status'=>'exact','businessline.id'=>'exact'] ),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name','businessline.name'], arguments: ['orderParameterName' => 'order'])
]

class Department
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection','write:opp_collection','read:customer_collection','write:customer_collection','read:productline_collection','write:productline_collection','read:presale_collection','write:presale_collection','read:department_collection', 'write:department_collection', 'write:user_collection', 'read:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection','read:customer_collection','read:productline_collection','read:presale_collection','read:department_collection', 'write:department_collection', 'read:user_collection'])]
    private $name;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:department_collection', 'write:department_collection'])]    
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Businessline::class, inversedBy: 'departments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:department_collection','write:department_collection'])]
    private $businessline;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'departments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:department_collection','write:department_collection'])]
    private $businessunit;

    #[ORM\ManyToMany(targetEntity: Presales::class, mappedBy: 'department')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:department_collection','write:department_collection'])]
    private $presales;

    #[ORM\ManyToMany(targetEntity: Productline::class, mappedBy: 'department')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:department_collection','write:department_collection'])]
    private $productlines;

    #[ORM\ManyToMany(targetEntity: Customer::class, mappedBy: 'department')]
    private $customers;

    #[ORM\OneToMany(mappedBy: 'department', targetEntity: Opportunity::class)]
    private $opportunities;

    public function __construct()
    {
        $this->businessline = new ArrayCollection();
        $this->businessunit = new ArrayCollection();
        $this->presales = new ArrayCollection();
        $this->productlines = new ArrayCollection();
        $this->customers = new ArrayCollection();
        $this->opportunities = new ArrayCollection();
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
     * @return Collection<int, Presales>
     */
    public function getPresales(): Collection
    {
        return $this->presales;
    }

    public function addPresale(Presales $presale): self
    {
        if (!$this->presales->contains($presale)) {
            $this->presales[] = $presale;
            $presale->addDepartment($this);
        }
        return $this;
    }

    public function removePresale(Presales $presale): self
    {
        if ($this->presales->removeElement($presale)) {
            $presale->removeDepartment($this);
        }
        return $this;
    }

    /**
     * @return Collection<int, Productline>
     */
    public function getProductlines(): Collection
    {
        return $this->productlines;
    }

    public function addProductline(Productline $productline): self
    {
        if (!$this->productlines->contains($productline)) {
            $this->productlines[] = $productline;
            $productline->addDepartment($this);
        }
        return $this;
    }

    public function removeProductline(Productline $productline): self
    {
        if ($this->productlines->removeElement($productline)) {
            $productline->removeDepartment($this);
        }
        return $this;
    }

    /**
     * @return Collection<int, Customer>
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers[] = $customer;
            $customer->addDepartment($this);
        }
        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            $customer->removeDepartment($this);
        }
        return $this;
    }

    /**
     * @return Collection<int, Opportunity>
     */
    public function getOpportunities(): Collection
    {
        return $this->opportunities;
    }

    public function addOpportunity(Opportunity $opportunity): self
    {
        if (!$this->opportunities->contains($opportunity)) {
            $this->opportunities[] = $opportunity;
            $opportunity->setDepartment($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getDepartment() === $this) {
                $opportunity->setDepartment(null);
            }
        }

        return $this;
    }
}