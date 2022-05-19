<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220518174257 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE businessline_businessunit (businessline_id INT NOT NULL, businessunit_id INT NOT NULL, PRIMARY KEY(businessline_id, businessunit_id))');
        $this->addSql('CREATE INDEX IDX_128C0E68EFE8DD3B ON businessline_businessunit (businessline_id)');
        $this->addSql('CREATE INDEX IDX_128C0E685A2ED874 ON businessline_businessunit (businessunit_id)');
        $this->addSql('ALTER TABLE businessline_businessunit ADD CONSTRAINT FK_128C0E68EFE8DD3B FOREIGN KEY (businessline_id) REFERENCES businessline (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE businessline_businessunit ADD CONSTRAINT FK_128C0E685A2ED874 FOREIGN KEY (businessunit_id) REFERENCES businessunit (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE businessline DROP CONSTRAINT fk_20c9c7c5a2ed874');
        $this->addSql('DROP INDEX idx_20c9c7c5a2ed874');
        $this->addSql('ALTER TABLE businessline DROP businessunit_id');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT fk_8389c3d7a58ecb40');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT fk_8389c3d71048ce0f');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT fk_8389c3d7ba60e34d');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT fk_8389c3d7f92f3e70');
        $this->addSql('DROP INDEX idx_8389c3d7a58ecb40');
        $this->addSql('DROP INDEX idx_8389c3d7f92f3e70');
        $this->addSql('DROP INDEX idx_8389c3d7ba60e34d');
        $this->addSql('DROP INDEX idx_8389c3d71048ce0f');
        $this->addSql('ALTER TABLE opportunity ADD countries_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD businessunit_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD businessline_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD presales_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity DROP business_unit_id');
        $this->addSql('ALTER TABLE opportunity DROP business_line_id');
        $this->addSql('ALTER TABLE opportunity DROP presales_engineer_id');
        $this->addSql('ALTER TABLE opportunity DROP country_id');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D7AEBAE514 FOREIGN KEY (countries_id) REFERENCES geography (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D75A2ED874 FOREIGN KEY (businessunit_id) REFERENCES businessunit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D7EFE8DD3B FOREIGN KEY (businessline_id) REFERENCES businessline (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT FK_8389C3D7B09D873F FOREIGN KEY (presales_id) REFERENCES presales (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8389C3D7AEBAE514 ON opportunity (countries_id)');
        $this->addSql('CREATE INDEX IDX_8389C3D75A2ED874 ON opportunity (businessunit_id)');
        $this->addSql('CREATE INDEX IDX_8389C3D7EFE8DD3B ON opportunity (businessline_id)');
        $this->addSql('CREATE INDEX IDX_8389C3D7B09D873F ON opportunity (presales_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE businessline_businessunit');
        $this->addSql('ALTER TABLE businessline ADD businessunit_id INT NOT NULL');
        $this->addSql('ALTER TABLE businessline ADD CONSTRAINT fk_20c9c7c5a2ed874 FOREIGN KEY (businessunit_id) REFERENCES businessunit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_20c9c7c5a2ed874 ON businessline (businessunit_id)');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D7AEBAE514');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D75A2ED874');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D7EFE8DD3B');
        $this->addSql('ALTER TABLE opportunity DROP CONSTRAINT FK_8389C3D7B09D873F');
        $this->addSql('DROP INDEX IDX_8389C3D7AEBAE514');
        $this->addSql('DROP INDEX IDX_8389C3D75A2ED874');
        $this->addSql('DROP INDEX IDX_8389C3D7EFE8DD3B');
        $this->addSql('DROP INDEX IDX_8389C3D7B09D873F');
        $this->addSql('ALTER TABLE opportunity ADD business_unit_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD business_line_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD presales_engineer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity ADD country_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opportunity DROP countries_id');
        $this->addSql('ALTER TABLE opportunity DROP businessunit_id');
        $this->addSql('ALTER TABLE opportunity DROP businessline_id');
        $this->addSql('ALTER TABLE opportunity DROP presales_id');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT fk_8389c3d7a58ecb40 FOREIGN KEY (business_unit_id) REFERENCES businessunit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT fk_8389c3d71048ce0f FOREIGN KEY (business_line_id) REFERENCES businessline (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT fk_8389c3d7ba60e34d FOREIGN KEY (presales_engineer_id) REFERENCES presales (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE opportunity ADD CONSTRAINT fk_8389c3d7f92f3e70 FOREIGN KEY (country_id) REFERENCES geography (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8389c3d7a58ecb40 ON opportunity (business_unit_id)');
        $this->addSql('CREATE INDEX idx_8389c3d7f92f3e70 ON opportunity (country_id)');
        $this->addSql('CREATE INDEX idx_8389c3d7ba60e34d ON opportunity (presales_engineer_id)');
        $this->addSql('CREATE INDEX idx_8389c3d71048ce0f ON opportunity (business_line_id)');
    }
}
