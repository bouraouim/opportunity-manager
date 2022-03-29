<?php

namespace App\Entity;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\GeographyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\ApiPlatform\geocustomsearch;



#[ORM\Entity(repositoryClass: GeographyRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>[ 'read:geography_collection']],
    denormalizationContext:['groups'=>[ 'write:geography_collection']]
),
ApiFilter(SearchFilter::class, properties:['country'=>'partial','area.name'=>'partial','continent'=>'partial','status'=>'exact'] ),
ApiFilter(OrderFilter::class, properties: ['country','area.name','continent'], arguments: ['orderParameterName' => 'order']),
ApiFilter(geocustomsearch::class)
]
class Geography
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:geography_collection','write:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $country;

    #[ORM\ManyToOne(targetEntity: Area::class, inversedBy: 'geography')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $area;

    #[ORM\Column(type: 'array')]
    #[Groups(['read:geography_collection','write:geography_collection'])]
    private $continent = [];

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:geography_collection'])]
    private $status=true;

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
    }
    public function toArray(){
        return ['id'=>$this->id,'name'=>$this->name];
    }
    // public function __toString() {
    //     return $this->name;
    // }
}
