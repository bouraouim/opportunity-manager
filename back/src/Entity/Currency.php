<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CurrencyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ActivateCurrencyController;
use App\Controller\InactivateCurrencyController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CurrencyRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>['read:curr_collection']],
    denormalizationContext:['groups'=>['write:curr_collection']],
    itemOperations:[
        'GET',
        'PUT',
        'PATCH',
        'DELETE',
        'activate' => [
            'method' => 'PATCH',
            'path' => '/currencies/{id}/activate',
            'controller' => ActivateCurrencyController::class
        ],
        'inactivate' => [
            'method' => 'PATCH',
            'path' => '/currencies/{id}/inactivate',
            'controller' => InactivateCurrencyController::class
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['code'=>'partial','appDate'=>'exacte','status'=>'exact']),
ApiFilter(OrderFilter::class, properties: ['code','appDate','euroCnvrRate'], arguments: ['orderParameterName' => 'order'])
]

class Currency
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:curr_collection', 'write:curr_collection', 'read:opp_collection', 'write:opp_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:curr_collection', 'write:curr_collection', 'read:opp_collection'])]
    private $code;

    #[ORM\Column(type: 'date')]
    #[Groups(['read:curr_collection', 'write:curr_collection'])]
    private $appDate;

    #[ORM\Column(type: 'float')]
    #[Groups(['read:curr_collection', 'write:curr_collection','read:opp_collection'])]
    private $euroCnvrRate;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['read:curr_collection', 'write:curr_collection'])]
    private $status = true;

    #[ORM\OneToMany(mappedBy: 'currLocalPart', targetEntity: Opportunity::class)]
    private $opportunities;

    #[ORM\OneToMany(mappedBy: 'currHQPart', targetEntity: Opportunity::class)]
    private $opportunities_HQ;

    public function __construct()
    {
        $this->opportunities = new ArrayCollection();
        $this->opportunities_HQ = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;
        return $this;
    }

    public function getAppDate(): ?\DateTimeInterface
    {
        return $this->appDate;
    }

    public function setAppDate(\DateTimeInterface $appDate): self
    {
        $this->appDate = $appDate;
        return $this;
    }

    public function getEuroCnvrRate(): ?float
    {
        return $this->euroCnvrRate;
    }

    public function setEuroCnvrRate(float $euroCnvrRate): self
    {
        $this->euroCnvrRate = $euroCnvrRate;
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
            $opportunity->setCurrLocalPart($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getCurrLocalPart() === $this) {
                $opportunity->setCurrLocalPart(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Opportunity>
     */
    public function getOpportunitiesHQ(): Collection
    {
        return $this->opportunities_HQ;
    }

    public function addOpportunitiesHQ(Opportunity $opportunitiesHQ): self
    {
        if (!$this->opportunities_HQ->contains($opportunitiesHQ)) {
            $this->opportunities_HQ[] = $opportunitiesHQ;
            $opportunitiesHQ->setCurrHQPart($this);
        }

        return $this;
    }

    public function removeOpportunitiesHQ(Opportunity $opportunitiesHQ): self
    {
        if ($this->opportunities_HQ->removeElement($opportunitiesHQ)) {
            // set the owning side to null (unless already changed)
            if ($opportunitiesHQ->getCurrHQPart() === $this) {
                $opportunitiesHQ->setCurrHQPart(null);
            }
        }

        return $this;
    }
}