<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530175752 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_area (user_id INT NOT NULL, area_id INT NOT NULL, PRIMARY KEY(user_id, area_id))');
        $this->addSql('CREATE INDEX IDX_AD1571A1A76ED395 ON user_area (user_id)');
        $this->addSql('CREATE INDEX IDX_AD1571A1BD0F409C ON user_area (area_id)');
        $this->addSql('ALTER TABLE user_area ADD CONSTRAINT FK_AD1571A1A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_area ADD CONSTRAINT FK_AD1571A1BD0F409C FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE user_area');
    }
}
