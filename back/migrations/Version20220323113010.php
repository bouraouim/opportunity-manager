<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323113010 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE area_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE businessline_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE businessunit_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE department_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE geography_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE role_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE userr_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE area (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE businessline (id INT NOT NULL, businessunit_id INT NOT NULL, name VARCHAR(255) NOT NULL, status BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_20C9C7C5A2ED874 ON businessline (businessunit_id)');
        $this->addSql('CREATE TABLE businessunit (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE department (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE geography (id INT NOT NULL, area_id INT NOT NULL, country VARCHAR(255) NOT NULL, continent TEXT NOT NULL, status BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FE8B365CBD0F409C ON geography (area_id)');
        $this->addSql('COMMENT ON COLUMN geography.continent IS \'(DC2Type:array)\'');
        $this->addSql('CREATE TABLE role (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(180) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64935C246D5 ON "user" (password)');
        $this->addSql('CREATE TABLE userr (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, plainpassword VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, status BOOLEAN DEFAULT NULL, lastconnectiondate DATE DEFAULT NULL, creationdate DATE DEFAULT NULL, anonymized BOOLEAN DEFAULT NULL, anonymizednumber INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6384957FE7927C74 ON userr (email)');
        $this->addSql('CREATE TABLE userr_businessline (userr_id INT NOT NULL, businessline_id INT NOT NULL, PRIMARY KEY(userr_id, businessline_id))');
        $this->addSql('CREATE INDEX IDX_CC475B06DF0FD358 ON userr_businessline (userr_id)');
        $this->addSql('CREATE INDEX IDX_CC475B06EFE8DD3B ON userr_businessline (businessline_id)');
        $this->addSql('CREATE TABLE userr_businessunit (userr_id INT NOT NULL, businessunit_id INT NOT NULL, PRIMARY KEY(userr_id, businessunit_id))');
        $this->addSql('CREATE INDEX IDX_C1E8E3A3DF0FD358 ON userr_businessunit (userr_id)');
        $this->addSql('CREATE INDEX IDX_C1E8E3A35A2ED874 ON userr_businessunit (businessunit_id)');
        $this->addSql('CREATE TABLE userr_role (userr_id INT NOT NULL, role_id INT NOT NULL, PRIMARY KEY(userr_id, role_id))');
        $this->addSql('CREATE INDEX IDX_53BC17C1DF0FD358 ON userr_role (userr_id)');
        $this->addSql('CREATE INDEX IDX_53BC17C1D60322AC ON userr_role (role_id)');
        $this->addSql('CREATE TABLE userr_department (userr_id INT NOT NULL, department_id INT NOT NULL, PRIMARY KEY(userr_id, department_id))');
        $this->addSql('CREATE INDEX IDX_81D30271DF0FD358 ON userr_department (userr_id)');
        $this->addSql('CREATE INDEX IDX_81D30271AE80F5DF ON userr_department (department_id)');
        $this->addSql('CREATE TABLE userr_area (userr_id INT NOT NULL, area_id INT NOT NULL, PRIMARY KEY(userr_id, area_id))');
        $this->addSql('CREATE INDEX IDX_D341A0C3DF0FD358 ON userr_area (userr_id)');
        $this->addSql('CREATE INDEX IDX_D341A0C3BD0F409C ON userr_area (area_id)');
        $this->addSql('ALTER TABLE businessline ADD CONSTRAINT FK_20C9C7C5A2ED874 FOREIGN KEY (businessunit_id) REFERENCES businessunit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE geography ADD CONSTRAINT FK_FE8B365CBD0F409C FOREIGN KEY (area_id) REFERENCES area (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_businessline ADD CONSTRAINT FK_CC475B06DF0FD358 FOREIGN KEY (userr_id) REFERENCES userr (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_businessline ADD CONSTRAINT FK_CC475B06EFE8DD3B FOREIGN KEY (businessline_id) REFERENCES businessline (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_businessunit ADD CONSTRAINT FK_C1E8E3A3DF0FD358 FOREIGN KEY (userr_id) REFERENCES userr (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_businessunit ADD CONSTRAINT FK_C1E8E3A35A2ED874 FOREIGN KEY (businessunit_id) REFERENCES businessunit (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_role ADD CONSTRAINT FK_53BC17C1DF0FD358 FOREIGN KEY (userr_id) REFERENCES userr (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_role ADD CONSTRAINT FK_53BC17C1D60322AC FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_department ADD CONSTRAINT FK_81D30271DF0FD358 FOREIGN KEY (userr_id) REFERENCES userr (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_department ADD CONSTRAINT FK_81D30271AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_area ADD CONSTRAINT FK_D341A0C3DF0FD358 FOREIGN KEY (userr_id) REFERENCES userr (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userr_area ADD CONSTRAINT FK_D341A0C3BD0F409C FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE geography DROP CONSTRAINT FK_FE8B365CBD0F409C');
        $this->addSql('ALTER TABLE userr_area DROP CONSTRAINT FK_D341A0C3BD0F409C');
        $this->addSql('ALTER TABLE userr_businessline DROP CONSTRAINT FK_CC475B06EFE8DD3B');
        $this->addSql('ALTER TABLE businessline DROP CONSTRAINT FK_20C9C7C5A2ED874');
        $this->addSql('ALTER TABLE userr_businessunit DROP CONSTRAINT FK_C1E8E3A35A2ED874');
        $this->addSql('ALTER TABLE userr_department DROP CONSTRAINT FK_81D30271AE80F5DF');
        $this->addSql('ALTER TABLE userr_role DROP CONSTRAINT FK_53BC17C1D60322AC');
        $this->addSql('ALTER TABLE userr_businessline DROP CONSTRAINT FK_CC475B06DF0FD358');
        $this->addSql('ALTER TABLE userr_businessunit DROP CONSTRAINT FK_C1E8E3A3DF0FD358');
        $this->addSql('ALTER TABLE userr_role DROP CONSTRAINT FK_53BC17C1DF0FD358');
        $this->addSql('ALTER TABLE userr_department DROP CONSTRAINT FK_81D30271DF0FD358');
        $this->addSql('ALTER TABLE userr_area DROP CONSTRAINT FK_D341A0C3DF0FD358');
        $this->addSql('DROP SEQUENCE area_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE businessline_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE businessunit_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE department_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE geography_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE role_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE userr_id_seq CASCADE');
        $this->addSql('DROP TABLE area');
        $this->addSql('DROP TABLE businessline');
        $this->addSql('DROP TABLE businessunit');
        $this->addSql('DROP TABLE department');
        $this->addSql('DROP TABLE geography');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE userr');
        $this->addSql('DROP TABLE userr_businessline');
        $this->addSql('DROP TABLE userr_businessunit');
        $this->addSql('DROP TABLE userr_role');
        $this->addSql('DROP TABLE userr_department');
        $this->addSql('DROP TABLE userr_area');
    }
}
