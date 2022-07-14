<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OpportunityRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;



#[ORM\Entity(repositoryClass: OpportunityRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext:['groups'=>['read:opp_collection']],
    denormalizationContext:['groups'=>['write:opp_collection']]),
    ApiFilter(SearchFilter::class, properties:['businessunit.id'=>'exact','businessline.id'=>'exact','department.id'=>'exact','countries.id'=>'exact','salesManager.id'=>'exact'] ),
    ApiFilter(DateFilter::class, properties: ['creationDate']),

]
class Opportunity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $id;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $creationDate;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $lastUpdateDate;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $lastStageUpdateDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $stage;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $successRate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $reference;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $description;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $inBudget;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $revenueStartPlanned;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $totalValue;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $fullValue;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $reason;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $comment;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $rfqDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $rfqDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $bidReviewDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $bidReviewDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $submissionDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $submissionDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $awardDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $awardDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $signatureDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $signatureDateAchieved;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $contractDuration;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $total;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $salesManager;

    #[ORM\ManyToOne(targetEntity: Department::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $department;

    #[ORM\ManyToOne(targetEntity: Geography::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $countries;

    #[ORM\ManyToOne(targetEntity: Businessunit::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $businessunit;

    #[ORM\ManyToOne(targetEntity: Businessline::class, inversedBy: 'opportunities', cascade:["persist"])]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $businessline;

    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $customer;

    #[ORM\Column(type: 'date', nullable: true)]
    private $awardDateAch;

    #[ORM\ManyToOne(targetEntity: Currency::class, inversedBy: 'opportunities')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $currLocalPart;

    #[ORM\ManyToOne(targetEntity: Currency::class, inversedBy: 'opportunities_HQ')]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $currHQPart;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $revenueStartAchieved;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $revenueLocalPart = [];

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $revenueHQPart = [];

    #[ORM\ManyToOne(targetEntity: Presales::class, inversedBy: 'opportunities', cascade:["persist"])]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    #[JoinColumn(nullable:true)]
    private $presalesEng;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['read:opp_collection', 'write:opp_collection'])]
    private $status = true;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;
        return $this;
    }

    public function getLastUpdateDate(): ?\DateTimeInterface
    {
        return $this->lastUpdateDate;
    }

    public function setLastUpdateDate(\DateTimeInterface $lastUpdateDate): self
    {
        $this->lastUpdateDate = $lastUpdateDate;
        return $this;
    }

    public function getLastStageUpdateDate(): ?\DateTimeInterface
    {
        return $this->lastStageUpdateDate;
    }

    public function setLastStageUpdateDate(\DateTimeInterface $lastStageUpdateDate): self
    {
        $this->lastStageUpdateDate = $lastStageUpdateDate;
        return $this;
    }

    public function getStage(): ?string
    {
        return $this->stage;
    }

    public function setStage(string $stage): self
    {
        $this->stage = $stage;
        return $this;
    }

    public function getSuccessRate(): ?int
    {
        return $this->successRate;
    }

    public function setSuccessRate(int $successRate): self
    {
        $this->successRate = $successRate;
        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getInBudget(): ?bool
    {
        return $this->inBudget;
    }

    public function setInBudget(bool $inBudget): self
    {
        $this->inBudget = $inBudget;
        return $this;
    }

    public function getRevenueStartPlanned(): ?\DateTimeInterface
    {
        return $this->revenueStartPlanned;
    }

    public function setRevenueStartPlanned(\DateTimeInterface $revenueStartPlanned): self
    {
        $this->revenueStartPlanned = $revenueStartPlanned;
        return $this;
    }

    public function getTotalValue(): ?float
    {
        return $this->totalValue;
    }

    public function setTotalValue(float $totalValue): self
    {
        $this->totalValue = $totalValue;
        return $this;
    }

    public function getFullValue(): ?float
    {
        return $this->fullValue;
    }

    public function setFullValue(float $fullValue): self
    {
        $this->fullValue = $fullValue;
        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): self
    {
        $this->reason = $reason;
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

    public function getRfqDatePlanned(): ?\DateTimeInterface
    {
        return $this->rfqDatePlanned;
    }

    public function setRfqDatePlanned(?\DateTimeInterface $rfqDatePlanned): self
    {
        $this->rfqDatePlanned = $rfqDatePlanned;
        return $this;
    }

    public function getRfqDateAchieved(): ?\DateTimeInterface
    {
        return $this->rfqDateAchieved;
    }

    public function setRfqDateAchieved(?\DateTimeInterface $rfqDateAchieved): self
    {
        $this->rfqDateAchieved = $rfqDateAchieved;
        return $this;
    }

    public function getBidReviewDateAchieved(): ?\DateTimeInterface
    {
        return $this->bidReviewDateAchieved;
    }

    public function setBidReviewDateAchieved(?\DateTimeInterface $bidReviewDateAchieved): self
    {
        $this->bidReviewDateAchieved = $bidReviewDateAchieved;
        return $this;
    }

    public function getBidReviewDatePlanned(): ?\DateTimeInterface
    {
        return $this->bidReviewDatePlanned;
    }

    public function setBidReviewDatePlanned(?\DateTimeInterface $bidReviewDatePlanned): self
    {
        $this->bidReviewDatePlanned = $bidReviewDatePlanned;
        return $this;
    }

    public function getSubmissionDatePlanned(): ?\DateTimeInterface
    {
        return $this->submissionDatePlanned;
    }

    public function setSubmissionDatePlanned(?\DateTimeInterface $submissionDatePlanned): self
    {
        $this->submissionDatePlanned = $submissionDatePlanned;
        return $this;
    }

    public function getSubmissionDateAchieved(): ?\DateTimeInterface
    {
        return $this->submissionDateAchieved;
    }

    public function setSubmissionDateAchieved(?\DateTimeInterface $submissionDateAchieved): self
    {
        $this->submissionDateAchieved = $submissionDateAchieved;
        return $this;
    }

    public function getAwardDatePlanned(): ?\DateTimeInterface
    {
        return $this->awardDatePlanned;
    }

    public function setAwardDatePlanned(?\DateTimeInterface $awardDatePlanned): self
    {
        $this->awardDatePlanned = $awardDatePlanned;
        return $this;
    }

    public function getAwardDateAchieved(): ?\DateTimeInterface
    {
        return $this->awardDateAchieved;
    }

    public function setAwardDateAchieved(?\DateTimeInterface $awardDateAchieved): self
    {
        $this->awardDateAchieved = $awardDateAchieved;
        return $this;
    }

    public function getSignatureDatePlanned(): ?\DateTimeInterface
    {
        return $this->signatureDatePlanned;
    }

    public function setSignatureDatePlanned(?\DateTimeInterface $signatureDatePlanned): self
    {
        $this->signatureDatePlanned = $signatureDatePlanned;
        return $this;
    }

    public function getSignatureDateAchieved(): ?\DateTimeInterface
    {
        return $this->signatureDateAchieved;
    }

    public function setSignatureDateAchieved(?\DateTimeInterface $signatureDateAchieved): self
    {
        $this->signatureDateAchieved = $signatureDateAchieved;
        return $this;
    }

    public function getContractDuration(): ?int
    {
        return $this->contractDuration;
    }

    public function setContractDuration(?int $contractDuration): self
    {
        $this->contractDuration = $contractDuration;
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

    public function getSalesManager(): ?User
    {
        return $this->salesManager;
    }

    public function setSalesManager(?User $salesManager): self
    {
        $this->salesManager = $salesManager;
        return $this;
    }

    public function getDepartment(): ?Department
    {
        return $this->department;
    }

    public function setDepartment(?Department $department): self
    {
        $this->department = $department;
        return $this;
    }

    public function getCountries(): ?Geography
    {
        return $this->countries;
    }

    public function setCountries(?Geography $countries): self
    {
        $this->countries = $countries;
        return $this;
    }

    public function getBusinessunit(): ?Businessunit
    {
        return $this->businessunit;
    }

    public function setBusinessunit(?Businessunit $businessunit): self
    {
        $this->businessunit = $businessunit;
        return $this;
    }

    public function getBusinessline(): ?Businessline
    {
        return $this->businessline;
    }

    public function setBusinessline(?Businessline $businessline): self
    {
        $this->businessline = $businessline;
        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;
        return $this;
    }

    public function getAwardDateAch(): ?\DateTimeInterface
    {
        return $this->awardDateAch;
    }

    public function setAwardDateAch(?\DateTimeInterface $awardDateAch): self
    {
        $this->awardDateAch = $awardDateAch;
        return $this;
    }

    public function getCurrLocalPart(): ?Currency
    {
        return $this->currLocalPart;
    }

    public function setCurrLocalPart(?Currency $currLocalPart): self
    {
        $this->currLocalPart = $currLocalPart;
        return $this;
    }

    public function getCurrHQPart(): ?Currency
    {
        return $this->currHQPart;
    }

    public function setCurrHQPart(?Currency $currHQPart): self
    {
        $this->currHQPart = $currHQPart;
        return $this;
    }

    public function getRevenueStartAchieved(): ?\DateTimeInterface
    {
        return $this->revenueStartAchieved;
    }

    public function setRevenueStartAchieved(?\DateTimeInterface $revenueStartAchieved): self
    {
        $this->revenueStartAchieved = $revenueStartAchieved;
        return $this;
    }

    public function getRevenueLocalPart(): ?array
    {
        return $this->revenueLocalPart;
    }

    public function setRevenueLocalPart(?array $revenueLocalPart): self
    {
        $this->revenueLocalPart = $revenueLocalPart;
        return $this;
    }

    public function getRevenueHQPart(): ?array
    {
        return $this->revenueHQPart;
    }

    public function setRevenueHQPart(?array $revenueHQPart): self
    {
        $this->revenueHQPart = $revenueHQPart;
        return $this;
    }

    public function getPresalesEng(): ?Presales
    {
        return $this->presalesEng;
    }

    public function setPresalesEng(?Presales $presalesEng): self
    {
        $this->presalesEng = $presalesEng;

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
}