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

    #[ORM\OneToOne(targetEntity: Productline::class, cascade: ['persist', 'remove'])]
    private $productline;

    #[ORM\OneToOne(targetEntity: Opportunity::class, cascade: ['persist', 'remove'])]
    private $opportunity;

    #[ORM\Column(type: 'float', nullable: true)]
    private $localPart;

    #[ORM\Column(type: 'float', nullable: true)]
    private $localPartEuro;

    #[ORM\Column(type: 'float', nullable: true)]
    private $hqPart;

    #[ORM\Column(type: 'float', nullable: true)]
    private $hqPartEuro;

    #[ORM\Column(type: 'float', nullable: true)]
    private $total;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $comment;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getOpportunity(): ?Opportunity
    {
        return $this->opportunity;
    }

    public function setOpportunity(?Opportunity $opportunity): self
    {
        $this->opportunity = $opportunity;

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

    public function getLocalPartEuro(): ?float
    {
        return $this->localPartEuro;
    }

    public function setLocalPartEuro(?float $localPartEuro): self
    {
        $this->localPartEuro = $localPartEuro;

        return $this;
    }

    public function getHqPart(): ?float
    {
        return $this->hqPart;
    }

    public function setHqPart(?float $hqPart): self
    {
        $this->hqPart = $hqPart;

        return $this;
    }

    public function getHqPartEuro(): ?float
    {
        return $this->hqPartEuro;
    }

    public function setHqPartEuro(?float $hqPartEuro): self
    {
        $this->hqPartEuro = $hqPartEuro;

        return $this;
    }

    public function getTotal(): ?float
    {
        return $this->total;
    }

    public function setTotal(?float $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }
}
