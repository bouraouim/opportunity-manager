<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ActivateCustomerController;
use App\Controller\InactivateCustomerController;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>['read:customer_collection']],
    denormalizationContext:['groups'=>['write:customer_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/customers/{id}/activate',
            'controller' => ActivateCustomerController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/customers/{id}/inactivate',
            'controller' => InactivateCustomerController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['name'=>'partial','sapPartner'=>'partial','businessunit.name'=>'partial','businessline.name'=>'partial','department.name'=>'partial','custGroup'=>'partial','areas.name'=>'partial','count.country'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['name','sapPartner','businessunit.name','businessline.name','department.name','custGroup','area.name','country.name'], arguments: ['orderParameterName' => 'order']),
]

class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:customer_collection','write:customer_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection','read:customer_collection','write:customer_collection'])]
    private $name;

    #[ORM\Column(type: 'string', length: 255, nullable:true)]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $sapPartner;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'customers')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $businessunit;

    #[ORM\ManyToMany(targetEntity: Businessline::class, inversedBy: 'customers')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $businessline;

    #[ORM\ManyToMany(targetEntity: Department::class, inversedBy: 'customers')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $department;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $custGroup;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Area::class, inversedBy: 'customers')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $areas;

    #[ORM\ManyToMany(targetEntity: Geography::class, inversedBy: 'customers')]
    #[Groups(['read:customer_collection','write:customer_collection'])]
    private $count;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Opportunity::class)]
    private $opportunities;

    public function __construct()
    {
        $this->businessunit = new ArrayCollection();
        $this->businessline = new ArrayCollection();
        $this->department = new ArrayCollection();
        $this->count = new ArrayCollection();
        $this->areas = new ArrayCollection();
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

    public function getSapPartner(): ?string
    {
        return $this->sapPartner;
    }

    public function setSapPartner(string $sapPartner): self
    {
        $this->sapPartner = $sapPartner;
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

    public function getCustGroup(): ?string
    {
        return $this->custGroup;
    }

    public function setCustGroup(string $custGroup): self
    {
        $this->custGroup = $custGroup;
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
        }
        return $this;
    }

    public function removeArea(Area $area): self
    {
        $this->areas->removeElement($area);
        return $this;
    }

    /**
     * @return Collection<int, Geography>
     */
    public function getCount(): Collection
    {
        return $this->count;
    }

    public function addCount(Geography $count): self
    {
        if (!$this->count->contains($count)) {
            $this->count[] = $count;
        }
        return $this;
    }

    public function removeCount(Geography $count): self
    {
        $this->count->removeElement($count);
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
            $opportunity->setCustomer($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getCustomer() === $this) {
                $opportunity->setCustomer(null);
            }
        }

        return $this;
    }
}