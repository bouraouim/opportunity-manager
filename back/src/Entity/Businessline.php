<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\BusinesslineRepository;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\ApiPlatform\blcustomfilter;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BusinesslineRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
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
ApiFilter( SearchFilter::class, properties:['name'=>'partial','businessunit.name'=>'partial','businessunit.id'=>'exact','status'=>'exact'] ),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name'], arguments: ['orderParameterName' => 'order']),
ApiFilter(blcustomfilter::class)
]

class Businessline
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:customer_collection','write:customer_collection','read:collection','write:user_collection','read:user_collection','write:presale_collection','read:presale_collection','read:department_collection','write:department_collection'])]
    private $id;

    /**
     * @Assert\Type(
     *    "string"
     * )
     */
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection','read:customer_collection','read:collection', 'write:collection','read:user_collection','read:presale_collection','read:productline_collection','read:department_collection'])]
    private $name;

    
    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:collection','write:collection'])]
    private $status;

    #[ORM\ManyToMany(targetEntity: Customer::class, mappedBy: 'businessline')]
    private $customers;

    #[ORM\OneToMany(mappedBy: 'businessline', targetEntity: Opportunity::class)]
    private $opportunities;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'businesslines')]
    #[Groups(['read:collection','write:collection'])]
    private $businessunit;

    public function __construct()
    {
        $this->status=true;
        $this->customers = new ArrayCollection();
        $this->opportunities = new ArrayCollection();
        $this->businessunit = new ArrayCollection();
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

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): self
    {
        $this->status = $status;
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
            $customer->addBusinessline($this);
        }
        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            $customer->removeBusinessline($this);
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
            $opportunity->setBusinessline($this);
        }
        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getBusinessline() === $this) {
                $opportunity->setBusinessline(null);
            }
        }
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
}