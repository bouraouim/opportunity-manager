<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OppProductlineRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OppProductlineRepository::class)]
#[ApiResource]
class OppProductline
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToOne(targetEntity: Opportunity::class, cascade: ['persist', 'remove'])]
    private $opportunity;

    #[ORM\OneToOne(targetEntity: Productline::class, cascade: ['persist', 'remove'])]
    private $productline;

    #[ORM\Column(type: 'float', nullable: true)]
    private $localPart;

    #[ORM\Column(type: 'float', nullable: true)]
    private $hqPart;

    #[ORM\Column(type: 'float', nullable: true)]
    private $totAmount;

    #[ORM\Column(type: 'string', nullable: true, length: 255)]
    private $comment;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOpportunity(): ?Opportunity
    {
        return $this->opportunity;
    }

    public function setOpportunity(?Opportunity $opportunity): self
    {
        $this->opportunity = $opportunity;
        return $this;
    }

    public function getProductline(): ?Productline
    {
        return $this->productline;
    }

    public function setProductline(?Productline $productline): self
    {
        $this->productline = $productline;
        return $this;
    }

    public function getLocalPart(): ?float
    {
        return $this->localPart;
    }

    public function setLocalPart(?float $localPart): self
    {
        $this->localPart = $localPart;
        return $this;
    }

    public function getHqPart(): ?float
    {
        return $this->hqPart;
    }

    public function setHqPart(float $hqPart): self
    {
        $this->hqPart = $hqPart;
        return $this;
    }

    public function getTotAmount(): ?float
    {
        return $this->totAmount;
    }

    public function setTotAmount(?float $totAmount): self
    {
        $this->totAmount = $totAmount;
        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;
        return $this;
    }
}