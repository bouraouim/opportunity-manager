<?php

namespace App\Entity;

use App\Repository\AreaRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\ActivateAreaController;
use App\Controller\InactivateAreaController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\ApiPlatform\areaCustomFilter;

#[ORM\Entity(repositoryClass: AreaRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext:['groups'=>['read:area_collection']],
    denormalizationContext:['groups'=>['write:area_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/areas/{id}/activate',
            'controller' => ActivateAreaController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/areas/{id}/inactivate',
            'controller' => InactivateAreaController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['name'=>'partial','businessunit.id'=>'exact','businessunit.name'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name'], arguments: ['orderParameterName' => 'order']),
ApiFilter(areaCustomFilter::class)]

class Area
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:customer_collection','write:customer_collection','read:presale_collection','write:presale_collection','read:area_collection', 'write:area_collection', 'read:geography_collection', 'write:geography_collection', 'write:user_collection', 'read:user_collection'])]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:customer_collection','read:presale_collection','write:presale_collection','read:area_collection','write:area_collection', 'read:geography_collection', 'read:user_collection'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'area', targetEntity: Geography::class, orphanRemoval: true)]
    private $geography;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'areas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:area_collection', 'write:area_collection'])]
    private $businessunit;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:area_collection', 'write:area_collection'])]
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Presales::class, mappedBy: 'areas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:area_collection', 'write:area_collection'])]
    private $presales;

    #[ORM\ManyToMany(targetEntity: Customer::class, mappedBy: 'areas')]
    private $customers;

    public function __construct()
    {
        $this->geography = new ArrayCollection();
        $this->businessunit = new ArrayCollection();
        $this->presales = new ArrayCollection();
        $this->customers = new ArrayCollection();
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
     * @return Collection<int, Geography>
     */
    public function getGeography(): Collection
    {
        return $this->geography;
    }

    public function addGeography(Geography $geography): self
    {
        if (!$this->geography->contains($geography)) {
            $this->geography[] = $geography;
            $geography->setArea($this);
        }
        return $this;
    }

    public function removeGeography(Geography $geography): self
    {
        if ($this->geography->removeElement($geography)) {
            // set the owning side to null (unless already changed)
            if ($geography->getArea() === $this) {
                $geography->setArea(null);
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
            $presale->addArea($this);
        }
        return $this;
    }

    public function removePresale(Presales $presale): self
    {
        if ($this->presales->removeElement($presale)) {
            $presale->removeArea($this);
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
            $customer->addArea($this);
        }
        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            $customer->removeArea($this);
        }
        return $this;
    }
}