<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PresalesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\ActivatePresalesController;
use App\Controller\InactivatePresalesController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: PresalesRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>['read:presale_collection']],
    denormalizationContext:['groups'=>['write:presale_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/presales/{id}/activate',
            'controller' => ActivatePresalesController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/presales/{id}/inactivate',
            'controller' => InactivatePresalesController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['name'=>'partial','businessunit.name'=>'partial','businessline.name'=>'partial','department.name'=>'partial','areas.name'=>'partial','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['name','businessunit.name','businessline.name','department.name','areas.name'], arguments: ['orderParameterName' => 'order'])
]

class Presales
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:presale_collection', 'write:presale_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:opp_collection','read:presale_collection', 'write:presale_collection'])]
    private $name;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:presale_collection', 'write:presale_collection'])]
    private $status = true;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, inversedBy: 'presales')]
    #[Groups(['read:presale_collection', 'write:presale_collection'])]
    private $businessunit;

    #[ORM\ManyToMany(targetEntity: Businessline::class, inversedBy: 'presales')]
    #[Groups(['read:presale_collection', 'write:presale_collection'])]
    private $businessline;

    #[ORM\ManyToMany(targetEntity: Department::class, inversedBy: 'presales')]
    #[Groups(['read:presale_collection', 'write:presale_collection'])]
    private $department;

    #[ORM\ManyToMany(targetEntity: Area::class, inversedBy: 'presales')]
    #[Groups(['read:presale_collection', 'write:presale_collection'])]
    private $areas;

    #[ORM\OneToMany(mappedBy: 'presalesEng', targetEntity: Opportunity::class)]
    private $opportunities;


    public function __construct()
    {
        $this->businessunit = new ArrayCollection();
        $this->businessline = new ArrayCollection();
        $this->department = new ArrayCollection();
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
            $opportunity->setPresalesEng($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getPresalesEng() === $this) {
                $opportunity->setPresalesEng(null);
            }
        }

        return $this;
    }
}