<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530162115 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE milestones_id_seq CASCADE');
        $this->addSql('DROP TABLE milestones');
        $this->addSql('ALTER TABLE opp_productline ADD tot_amount DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE opp_productline DROP local_part_euro');
        $this->addSql('ALTER TABLE opp_productline DROP hq_part_euro');
        $this->addSql('ALTER TABLE opp_productline DROP total');
        $this->addSql('ALTER TABLE opportunity ADD curr_local_part_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD curr_hqpart_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD award_date_ach DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD revenue_start_achieved DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D7A38D724F FOREIGN KEY (curr_local_part_id) REFERENCES currency (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D7F632131E FOREIGN KEY (curr_hqpart_id) REFERENCES currency (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8389C3D7A38D724F ON opportunity (curr_local_part_id)');
        $this->addSql('CREATE INDEX IDX_8389C3D7F632131E ON opportunity (curr_hqpart_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE milestones_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE milestones (id INT NOT NULL, rfq_date_planned DATE DEFAULT NULL, rfq_date_achieved DATE DEFAULT NULL, bid_review_date_planned DATE DEFAULT NULL, bid_review_date_achieved DATE DEFAULT NULL, submission_date_planned DATE DEFAULT NULL, submission_date_achieved DATE DEFAULT NULL, award_date_planned DATE DEFAULT NULL, award_date_achieved DATE DEFAULT NULL, signature_date_achieved DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE opp_productline ADD hq_part_euro DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE opp_productline ADD total DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE opp_productline RENAME COLUMN tot_amount TO local_part_euro');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D7A38D724F');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D7F632131E');
        $this->addSql('DROP INDEX IDX_8389C3D7A38D724F');
        $this->addSql('DROP INDEX IDX_8389C3D7F632131E');
        $this->addSql('ALTER TABLE opportunity DROP curr_local_part_id');
        $this->addSql('ALTER TABLE opportunity DROP curr_hqpart_id');
        $this->addSql('ALTER TABLE opportunity DROP award_date_ach');
        $this->addSql('ALTER TABLE opportunity DROP revenue_start_achieved');
    }
}
