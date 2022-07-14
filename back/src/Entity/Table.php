<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TableRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TableRepository::class)]
#[ORM\Table(name: '`table`')]
#[ApiResource]
class Table
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $att;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAtt(): ?string
    {
        return $this->att;
    }

    public function setAtt(string $att): self
    {
        $this->att = $att;

        return $this;
    }
}
