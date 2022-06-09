<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530175613 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_area');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE user_area (user_id INT NOT NULL, area_id INT NOT NULL, PRIMARY KEY(user_id, area_id))');
        $this->addSql('CREATE INDEX idx_ad1571a1bd0f409c ON user_area (area_id)');
        $this->addSql('CREATE INDEX idx_ad1571a1a76ed395 ON user_area (user_id)');
        $this->addSql('ALTER TABLE user_area ADD CONSTRAINT fk_ad1571a1a76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_area ADD CONSTRAINT fk_ad1571a1bd0f409c FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
