<?php

namespace App\Entity;

use App\Repository\AreaRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: AreaRepository::class)]
#[ApiResource(
    normalizationContext:['groups'=>[ 'read:area_collection']],
    denormalizationContext:['groups'=>[ 'write:area_collection']]
)]
class Area
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:area_collection','read:geography_collection','write:geography_collection','write:user_collection','read:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:area_collection','read:geography_collection','read:user_collection'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'area', targetEntity: Geography::class, orphanRemoval: true)]
    private $geography;

    public function __construct()
    {
        $this->geography = new ArrayCollection();
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
    public function toArray(){
        return ['id'=>$this->id,'name'=>$this->name];
    }

    

   
    // public function __toString() {
    //     return $this->name;
    // }
}
