<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: RoleRepository::class)]
#[ApiResource]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['write:user_collection','read:user_collection'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['read:user_collection'])]
    private $name;

    #[ORM\Column(type: 'boolean')]
    private $dashboard=false;

    #[ORM\Column(type: 'boolean')]
    private $list_opp=false;

    #[ORM\Column(type: 'boolean')]
    private $create_opp=false;

    #[ORM\Column(type: 'boolean')]
    private $update_opp=false;

    #[ORM\Column(type: 'boolean')]
    private $list_areas=false;

    #[ORM\Column(type: 'boolean')]
    private $create_areas=false;

    #[ORM\Column(type: 'boolean')]
    private $update_areas=false;

    #[ORM\Column(type: 'boolean')]
    private $list_bl=false;

    #[ORM\Column(type: 'boolean')]
    private $create_bl=false;

    #[ORM\Column(type: 'boolean')]
    private $update_bl=false;

    #[ORM\Column(type: 'boolean')]
    private $list_bu=false;

    #[ORM\Column(type: 'boolean')]
    private $create_bu=false;

    #[ORM\Column(type: 'boolean')]
    private $update_bu=false;

    #[ORM\Column(type: 'boolean')]
    private $list_currencies=false;

    #[ORM\Column(type: 'boolean')]
    private $create_currencies=false;

    #[ORM\Column(type: 'boolean')]
    private $update_currencies=false;

    #[ORM\Column(type: 'boolean')]
    private $list_customers=false;

    #[ORM\Column(type: 'boolean')]
    private $create_customers=false;

    #[ORM\Column(type: 'boolean')]
    private $update_customers=false;

    #[ORM\Column(type: 'boolean')]
    private $list_departments=false;

    #[ORM\Column(type: 'boolean')]
    private $create_departments=false;

    #[ORM\Column(type: 'boolean')]
    private $update_departments=false;

    #[ORM\Column(type: 'boolean')]
    private $list_geo=false;

    #[ORM\Column(type: 'boolean')]
    private $create_geo=false;

    #[ORM\Column(type: 'boolean')]
    private $update_geo=false;

    #[ORM\Column(type: 'boolean')]
    private $list_roles=false;

    #[ORM\Column(type: 'boolean')]
    private $create_roles=false;

    #[ORM\Column(type: 'boolean')]
    private $update_roles=false;

    #[ORM\Column(type: 'boolean')]
    private $assign_roles=false;

    #[ORM\Column(type: 'boolean')]
    private $list_presales=false;

    #[ORM\Column(type: 'boolean')]
    private $create_presales=false;

    #[ORM\Column(type: 'boolean')]
    private $update_presales=false;

   

    public function __construct()
    {
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
   
    public function toArray(){
        return ['id'=>$this->id,'name'=>$this->name];
    }

    public function getDashboard(): ?bool
    {
        return $this->dashboard;
    }

    public function setDashboard(bool $dashboard): self
    {
        $this->dashboard = $dashboard;

        return $this;
    }

    public function getListOpp(): ?bool
    {
        return $this->list_opp;
    }

    public function setListOpp(bool $list_opp): self
    {
        $this->list_opp = $list_opp;

        return $this;
    }

    public function getCreateOpp(): ?bool
    {
        return $this->create_opp;
    }

    public function setCreateOpp(bool $create_opp): self
    {
        $this->create_opp = $create_opp;

        return $this;
    }

    public function getUpdateOpp(): ?bool
    {
        return $this->update_opp;
    }

    public function setUpdateOpp(bool $update_opp): self
    {
        $this->update_opp = $update_opp;

        return $this;
    }

    public function getListAreas(): ?bool
    {
        return $this->list_areas;
    }

    public function setListAreas(bool $list_areas): self
    {
        $this->list_areas = $list_areas;

        return $this;
    }

    public function getCreateAreas(): ?bool
    {
        return $this->create_areas;
    }

    public function setCreateAreas(bool $create_areas): self
    {
        $this->create_areas = $create_areas;

        return $this;
    }

    public function getUpdateAreas(): ?bool
    {
        return $this->update_areas;
    }

    public function setUpdateAreas(bool $update_areas): self
    {
        $this->update_areas = $update_areas;

        return $this;
    }

    public function getListBl(): ?bool
    {
        return $this->list_bl;
    }

    public function setListBl(bool $list_bl): self
    {
        $this->list_bl = $list_bl;

        return $this;
    }

    public function getCreateBl(): ?bool
    {
        return $this->create_bl;
    }

    public function setCreateBl(bool $create_bl): self
    {
        $this->create_bl = $create_bl;

        return $this;
    }

    public function getUpdateBl(): ?bool
    {
        return $this->update_bl;
    }

    public function setUpdateBl(bool $update_bl): self
    {
        $this->update_bl = $update_bl;

        return $this;
    }

    public function getListBu(): ?bool
    {
        return $this->list_bu;
    }

    public function setListBu(bool $list_bu): self
    {
        $this->list_bu = $list_bu;

        return $this;
    }

    public function getCreateBu(): ?bool
    {
        return $this->create_bu;
    }

    public function setCreateBu(bool $create_bu): self
    {
        $this->create_bu = $create_bu;

        return $this;
    }

    public function getUpdateBu(): ?bool
    {
        return $this->update_bu;
    }

    public function setUpdateBu(bool $update_bu): self
    {
        $this->update_bu = $update_bu;

        return $this;
    }

    public function getListCurrencies(): ?bool
    {
        return $this->list_currencies;
    }

    public function setListCurrencies(bool $list_currencies): self
    {
        $this->list_currencies = $list_currencies;

        return $this;
    }

    public function getCreateCurrencies(): ?bool
    {
        return $this->create_currencies;
    }

    public function setCreateCurrencies(bool $create_currencies): self
    {
        $this->create_currencies = $create_currencies;

        return $this;
    }

    public function getUpdateCurrencies(): ?bool
    {
        return $this->update_currencies;
    }

    public function setUpdateCurrencies(bool $update_currencies): self
    {
        $this->update_currencies = $update_currencies;

        return $this;
    }

    public function getListCustomers(): ?bool
    {
        return $this->list_customers;
    }

    public function setListCustomers(bool $list_customers): self
    {
        $this->list_customers = $list_customers;

        return $this;
    }

    public function getCreateCustomers(): ?bool
    {
        return $this->create_customers;
    }

    public function setCreateCustomers(bool $create_customers): self
    {
        $this->create_customers = $create_customers;

        return $this;
    }

    public function getUpdateCustomers(): ?bool
    {
        return $this->update_customers;
    }

    public function setUpdateCustomers(bool $update_customers): self
    {
        $this->update_customers = $update_customers;

        return $this;
    }

    public function getListDepartments(): ?bool
    {
        return $this->list_departments;
    }

    public function setListDepartments(bool $list_departments): self
    {
        $this->list_departments = $list_departments;

        return $this;
    }

    public function getCreateDepartments(): ?bool
    {
        return $this->create_departments;
    }

    public function setCreateDepartments(bool $create_departments): self
    {
        $this->create_departments = $create_departments;

        return $this;
    }

    public function getUpdateDepartments(): ?bool
    {
        return $this->update_departments;
    }

    public function setUpdateDepartments(bool $update_departments): self
    {
        $this->update_departments = $update_departments;

        return $this;
    }

    public function getListGeo(): ?bool
    {
        return $this->list_geo;
    }

    public function setListGeo(bool $list_geo): self
    {
        $this->list_geo = $list_geo;

        return $this;
    }

    public function getCreateGeo(): ?bool
    {
        return $this->create_geo;
    }

    public function setCreateGeo(bool $create_geo): self
    {
        $this->create_geo = $create_geo;

        return $this;
    }

    public function getUpdateGeo(): ?bool
    {
        return $this->update_geo;
    }

    public function setUpdateGeo(bool $update_geo): self
    {
        $this->update_geo = $update_geo;

        return $this;
    }

    public function getListRoles(): ?bool
    {
        return $this->list_roles;
    }

    public function setListRoles(bool $list_roles): self
    {
        $this->list_roles = $list_roles;

        return $this;
    }

    public function getCreateRoles(): ?bool
    {
        return $this->create_roles;
    }

    public function setCreateRoles(bool $create_roles): self
    {
        $this->create_roles = $create_roles;

        return $this;
    }

    public function getUpdateRoles(): ?bool
    {
        return $this->update_roles;
    }

    public function setUpdateRoles(bool $update_roles): self
    {
        $this->update_roles = $update_roles;

        return $this;
    }

    public function getAssignRoles(): ?bool
    {
        return $this->assign_roles;
    }

    public function setAssignRoles(bool $assign_roles): self
    {
        $this->assign_roles = $assign_roles;

        return $this;
    }

    public function getListPresales(): ?bool
    {
        return $this->list_presales;
    }

    public function setListPresales(bool $list_presales): self
    {
        $this->list_presales = $list_presales;

        return $this;
    }

    public function getCreatePresales(): ?bool
    {
        return $this->create_presales;
    }

    public function setCreatePresales(bool $create_presales): self
    {
        $this->create_presales = $create_presales;

        return $this;
    }

    public function getUpdatePresales(): ?bool
    {
        return $this->update_presales;
    }

    public function setUpdatePresales(bool $update_presales): self
    {
        $this->update_presales = $update_presales;

        return $this;
    }
    
}
