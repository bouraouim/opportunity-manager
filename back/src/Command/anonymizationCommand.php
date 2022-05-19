<?php
namespace App\Command;

use App\Controller\UserController;
use App\Repository\NumberRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class anonymizationCommand extends Command{
    private $userController;
    private $userRepository;
    private $entityManager;
    private $numberManager;
    

    protected static $defaultName = 'app:anonymization';
    public function __construct(UserController $userController,UserRepository $userRepository, EntityManagerInterface $entityManager , NumberRepository $numberManager)
    {
        $this->userController = $userController;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->numberManager = $numberManager;

        parent::__construct();
    }
    protected function configure()
    {
        $this
            ->setDescription('anonymize users')
        ;
    }
    protected function execute(InputInterface $input, OutputInterface $output):int
    {

        $this->userController->anonymize( $this->userRepository, $this->entityManager, $this->numberManager);
return 0;

    }
}