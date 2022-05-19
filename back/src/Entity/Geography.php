<?php

namespace App\Entity;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\GeographyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\ApiPlatform\geocustomsearch;

#[ORM\Entity(repositoryClass: GeographyRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext:['groups'=>[ 'read:geography_collection']],
    denormalizationContext:['groups'=>[ 'write:geography_collection']]
),
ApiFilter(SearchFilter::class, properties:['country'=>'partial','area.name'=>'partial','area.id'=>'exact','continent'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties:['country','area.name','continent'], arguments: ['orderParameterName' => 'order']),
ApiFilter(geocustomsearch::class)
]

class Geography
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:customer_collection','write:customer_collection','read:geography_collection','write:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:customer_collection','read:geography_collection','write:geography_collection'])]
    private $country;

    #[ORM\ManyToOne(targetEntity: Area::class, inversedBy: 'geography')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $area;

    #[ORM\Column(type: 'array')]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $continent = [];

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $status=true;

    #[ORM\ManyToMany(targetEntity: Customer::class, mappedBy: 'count')]
    private $customers;

    #[ORM\OneToMany(mappedBy: 'countries', targetEntity: Opportunity::class)]
    private $opportunities;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;
        return $this;
    }

    public function getArea(): ?area
    {
        return $this->area;
    }

    public function setArea(?area $area): self
    {
        $this->area = $area;
        return $this;
    }

    public function getContinent(): ?array
    {
        return $this->continent;
    }

    public function setContinent(array $continent): self
    {
        $this->continent = $continent;
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
    public function __construct()
    {
        $this->status=true;
        $this->customers = new ArrayCollection();
        $this->opportunities = new ArrayCollection();
    }
    public function toArray(){
        return ['id'=>$this->id,'country'=>$this->country];
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
            $customer->addCount($this);
        }
        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            $customer->removeCount($this);
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
            $opportunity->setCountries($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getCountries() === $this) {
                $opportunity->setCountries(null);
            }
        }

        return $this;
    }
}