<?php

namespace App\Entity;

use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use App\ApiPlatform\usercustomsearch;
use Doctrine\ORM\QueryBuilder;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    denormalizationContext: ['groups'=>[ 'write:user_collection']],
    normalizationContext: ['groups'=>[ 'read:user_collection']]
    
),
ApiFilter(SearchFilter::class, properties:['email'=>'partial','firstname'=>'partial','lastname'=>'partial','anonymized'=>'exact', 'status'=>'exact','role.name'=>'exact'] ),
ApiFilter(OrderFilter::class, properties: ['email','firstname','lastname'], arguments: ['orderParameterName' => 'order']),
ApiFilter(usercustomsearch::class)]

#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:opp_collection', 'write:opp_collection','read:user_collection', 'read:opp_collection', 'write:opp_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, nullable:true)]
    #[Groups(['read:opp_collection','read:user_collection', 'read:opp_collection', 'write:opp_collection'])]
    private $username;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['write:user_collection','read:user_collection'])]
    public $email;

    #[ORM\Column(type: 'json', nullable:true)]
    private $roles = [];

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['write:user_collection'])]
    private $password;

    #[ORM\Column(type: 'string', length: 180)]
    #[Groups(['write:user_collection','read:user_collection']),SerializedName("password")]
    private $plainPassword;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['write:user_collection','read:user_collection','read:opp_collection'])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['write:user_collection','read:user_collection','read:opp_collection'])]
    private $lastname;

    #[ORM\ManyToMany(targetEntity: Businessline::class)]
    #[Groups(['write:user_collection','read:user_collection'])]
    private  $businessline;

    #[ORM\ManyToMany(targetEntity: Businessunit::class, cascade:["persist"])]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $businessunit;

    #[ORM\ManyToMany(targetEntity: Role::class)]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $role;

    #[ORM\ManyToMany(targetEntity: Department::class)]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $department;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['write:user_collection','read:user_collection'])]
    public $status;

    #[Groups(['write:user_collection','read:user_collection'])]
    #[ORM\Column(type: 'date', nullable: true)]
    public $lastconnectiondate;

    #[Groups(['write:user_collection','read:user_collection'])]
    #[ORM\Column(type: 'date', nullable: true)]
    private $creationdate;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['write:user_collection','read:user_collection'])]
    public $anonymized=false;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read:user_collection'])]
    private static $anonymizednumber=0;

    #[ORM\OneToMany(mappedBy: 'salesManager', targetEntity: Opportunity::class)]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $opportunities;

    #[ORM\ManyToMany(targetEntity: Area::class, inversedBy: 'users')]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $areas;

    public function __construct()
    {
        $this->businessline = new ArrayCollection();
        $this->businessunit = new ArrayCollection();
        $this->role = new ArrayCollection();
        $this->department = new ArrayCollection();
        $this->status=true;
        $this->setCreationdate(new \DateTime('now'));
        $this->setLastconnectiondate(new \DateTime('now'));
        $this->opportunities = new ArrayCollection();
        $this->areas = new ArrayCollection();
    }

    private const DAYS_BEFORE_check = 7;

    public function anonymize(): void
    {
        // $time = strtotime(date("Y-m-d") );
        // $dd=date_create($time);
        // $interval = date_diff($dd, $this->lastconnectiondate);
        // if($interval->format('%i ')>2){
        //     $this->anonymized =true;
        //     $this->status=false;
        // }
        // return $this;
    }


    public function getplainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setplainPassword(string $email): self
    {
        $this->plainPassword = $email;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    static public function getAnonymizednumber(): ?int
    {
        return self::$anonymizednumber;
    }

    // public function getLogin(): ?string
    // {
    //     return $this->login;
    // }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;
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
     * @return Collection<int, Role>
     */
    public function getRole(): Collection
    {
        return $this->role;
    }

    public function addRole(Role $role): self
    {
        if (!$this->role->contains($role)) {
            $this->role[] = $role;
        }
        return $this;
    }

    public function removeRole(Role $role): self
    {
        $this->role->removeElement($role);
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

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getLastconnectiondate(): ?\DateTimeInterface
    {
        return $this->lastconnectiondate;
    }

    public function setLastconnectiondate(?\DateTimeInterface $lastconnectiondate): self
    {
        $this->lastconnectiondate = $lastconnectiondate;
        return $this;
    }

    public function getCreationdate(): ?\DateTimeInterface
    {
        return $this->creationdate;
    }

    public function setCreationdate(?\DateTimeInterface $creationdate): self
    {
        $this->creationdate = $creationdate;
        return $this;
    }

    public function getAnonymized(): ?bool
    {
        return $this->anonymized;
    }

    public function setAnonymized(?bool $anonymized): self
    {
        $this->anonymized = $anonymized;
        return $this;
    }
    static public function setAnonymizednumber(): void
    {
        self::$anonymizednumber++;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->email;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        //  $this->plainPassword = null;
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
            $opportunity->setSalesManager($this);
        }
        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->removeElement($opportunity)) {
            // set the owning side to null (unless already changed)
            if ($opportunity->getSalesManager() === $this) {
                $opportunity->setSalesManager(null);
            }
        }
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
}