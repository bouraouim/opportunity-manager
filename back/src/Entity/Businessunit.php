<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\BusinessunitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\ActivateBusinessUnitController;
use App\Controller\InactivateBusinessUnitController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\ApiPlatform\buCustomFilter;

#[ORM\Entity(repositoryClass: BusinessunitRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>['read:bu_collection']],
    denormalizationContext:['groups'=>['write:bu_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/businessunits/{id}/activate',
            'controller' => ActivateBusinessUnitController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/businessunits/{id}/inactivate',
            'controller' => InactivateBusinessUnitController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['name'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['name'], arguments: ['orderParameterName' => 'order']),
ApiFilter(buCustomFilter::class)]

class Businessunit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:customer_collection','write:customer_collection','write:bu_collection','read:bu_collection','read:productline_collection','write:productline_collection','read:presale_collection', 'write:presale_collection','read:department_collection','write:department_collection','read:collection', 'write:collection', 'read:user_collection', 'write:user_collection', 'read:area_collection', 'write:area_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection','read:customer_collection','write:bu_collection','read:bu_collection','read:productline_collection','read:presale_collection','read:department_collection','read:collection', 'write:collection', 'read:user_collection', 'write:user_collection', 'read:area_collection'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'businessunit', targetEntity: Businessline::class, orphanRemoval: true)]
    private $businessline;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['write:bu_collection','read:bu_collection','read:collection', 'write:collection'])]
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Area::class, mappedBy: 'businessunit')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:bu_collection', 'write:bu_collection'])]
    private $areas;

    #[ORM\ManyToMany(targetEntity: Department::class, mappedBy: 'businessunit')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:bu_collection', 'write:bu_collection'])]
    private $departments;

    #[ORM\ManyToMany(targetEntity: Presales::class, mappedBy: 'businessunit')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:bu_collection', 'write:bu_collection'])]
    private $presales;

    #[ORM\ManyToMany(targetEntity: Productline::class, mappedBy: 'businessunit')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:bu_collection', 'write:bu_collection'])]
    private $productlines;

    #[ORM\ManyToMany(targetEntity: Customer::class, mappedBy: 'businessunit')]
    private $customers;

    #[ORM\OneToMany(mappedBy: 'businessunit', targetEntity: Opportunity::class)]
    private $opportunities;

    #[ORM\ManyToMany(targetEntity: Businessline::class, mappedBy: 'businessunit')]
    private $businesslines;

    public function __construct()
    {
        $this->businessline = new ArrayCollection();
        $this->user = new ArrayCollection();
        $this->areas = new ArrayCollection();
        $this->departments = new ArrayCollection();
        $this->presales = new ArrayCollection();
        $this->productlines = new ArrayCollection();
        $this->customers = new ArrayCollection();
        $this->opportunities = new ArrayCollection();
        $this->businesslines = new ArrayCollection();
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
            $businessline->setBusinessunit($this);
        }
        return $this;
    }

    public function removeBusinessline(Businessline $businessline): self
    {
        if ($this->businessline->removeElement($businessline)) {
            // set the owning side to null (unless already changed)
            if ($businessline->getBusinessunit() === $this) {
                $businessline->setBusinessunit(null);
            }
        }
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
     * @return Collection<int, Area>
     */
    public function getAreas(): Collection
    {
        return $this->areas;
    }

    public function addArea(Area $area): self
    {
        if (!$this->areas->contains($area)) {
            $this->areas[] = $area;
            $area->addBusinessunit($this);
        }
        return $this;
    }

    public function removeArea(Area $area): self
    {
        if ($this->areas->removeElement($area)) {
            $area->removeBusinessunit($this);
        }
        return $this;
    }

    /**
     * @return Collection<int, Department>
     */
    public function getDepartments(): Collection
    {
        return $this->departments;
    }

    public function addDepartment(Department $department): self
    {
        if (!$this->departments->contains($department)) {
            $this->departments[] = $department;
            $department->addBusinessunit($this);
        }
        return $this;
    }

    public function removeDepartment(Department $department): self
    {
        if ($this->departments->removeElement($department)) {
            $department->removeBusinessunit($this);
        }
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
            $presale->addBusinessunit($this);
        }
        return $this;
    }

    public function removePresale(Presales $presale): self
    {
        if ($this->presales->removeElement($presale)) {
            $presale->removeBusinessunit($this);
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
            $productline->addBusinessunit($this);
        }
        return $this;
    }

    public function removeProductline(Productline $productline): self
    {
        if ($this->productlines->removeElement($productline)) {
            $productline->removeBusinessunit($this);
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
            $customer->addBusinessunit($this);
        }
        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            $customer->removeBusinessunit($this);
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
            $opportunity->setBusinessunit($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getBusinessunit() === $this) {
                $opportunity->setBusinessunit(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Businessline>
     */
    public function getBusinesslines(): Collection
    {
        return $this->businesslines;
    }
}