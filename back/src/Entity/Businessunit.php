<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\BusinessunitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BusinessunitRepository::class)]
#[ApiResource(
    denormalizationContext:['groups'=>[ 'deletebu:collection','businessUnit:write']],
    normalizationContext: ['groups' => ['businessUnit:read']],
)]

class Businessunit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection','write:collection','read:user_collection','write:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:collection','read:user_collection','businessUnit:write'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'businessunit', targetEntity: Businessline::class, orphanRemoval: true)]
    private $businessline;

    // /**
    // * @ORM\ManyToMany(targetEntity="User",mappedBy="businessUnits")
    // */
    // #[Groups(['write:user_collection'])]
    // private $user;


    public function __construct()
    {
        $this->businessline = new ArrayCollection();
        $this->user=new ArrayCollection();
    }

    
    #[Groups(['write:collection'])]
    public function getId(): ?int
    {
        return $this->id;
    }
    
    // public function getUser(): Collection
    // {
    //     return $this->user;
    // }

    // public function adduser(Userr $user): self
    // {
    //     if (!$this->user->contains($user)) {
    //         $this->user[] = $user;
    //     }

    //     return $this;
    // }

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
        return ['id'=>$this->id,'name'=>$this->name];
    }
    public function __toString() {
        return $this->name;
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
            $businessline->setBusinessunit($this);
        }

        return $this;
    }

    public function removeBusinessline(Businessline $businessline): self
    {
        if ($this->businessline->removeElement($businessline)) {
            // set the owning side to null (unless already changed)
            if ($businessline->getBusinessunit() === $this) {
                $businessline->setBusinessunit(null);
            }
        }

        return $this;
    }




   
   

    

    
}
