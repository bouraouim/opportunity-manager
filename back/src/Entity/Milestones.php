<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MilestonesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MilestonesRepository::class)]
#[ApiResource]
class Milestones
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'date', nullable: true)]
    private $rfqDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    private $rfqDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    private $bidReviewDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    private $bidReviewDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    private $submissionDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    private $submissionDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    private $awardDatePlanned;

    #[ORM\Column(type: 'date', nullable: true)]
    private $awardDateAchieved;

    #[ORM\Column(type: 'date', nullable: true)]
    private $signatureDateAchieved;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getBidReviewDatePlanned(): ?\DateTimeInterface
    {
        return $this->bidReviewDatePlanned;
    }

    public function setBidReviewDatePlanned(?\DateTimeInterface $bidReviewDatePlanned): self
    {
        $this->bidReviewDatePlanned = $bidReviewDatePlanned;

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

    public function getSignatureDateAchieved(): ?\DateTimeInterface
    {
        return $this->signatureDateAchieved;
    }

    public function setSignatureDateAchieved(?\DateTimeInterface $signatureDateAchieved): self
    {
        $this->signatureDateAchieved = $signatureDateAchieved;

        return $this;
    }
}
