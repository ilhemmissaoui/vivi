<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231020111742 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE projet_annees_solution (projet_annees_id INT NOT NULL, solution_id INT NOT NULL, INDEX IDX_B5A2A9C79669628 (projet_annees_id), INDEX IDX_B5A2A9C1C0BE183 (solution_id), PRIMARY KEY(projet_annees_id, solution_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE projet_annees_solution ADD CONSTRAINT FK_B5A2A9C79669628 FOREIGN KEY (projet_annees_id) REFERENCES projet_annees (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE projet_annees_solution ADD CONSTRAINT FK_B5A2A9C1C0BE183 FOREIGN KEY (solution_id) REFERENCES solution (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE solution DROP FOREIGN KEY FK_9F3329DBA0E0FBD0');
        $this->addSql('DROP INDEX IDX_9F3329DBA0E0FBD0 ON solution');
        $this->addSql('ALTER TABLE solution DROP annee_projet_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE projet_annees_solution DROP FOREIGN KEY FK_B5A2A9C79669628');
        $this->addSql('ALTER TABLE projet_annees_solution DROP FOREIGN KEY FK_B5A2A9C1C0BE183');
        $this->addSql('DROP TABLE projet_annees_solution');
        $this->addSql('ALTER TABLE solution ADD annee_projet_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE solution ADD CONSTRAINT FK_9F3329DBA0E0FBD0 FOREIGN KEY (annee_projet_id) REFERENCES projet_annees (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9F3329DBA0E0FBD0 ON solution (annee_projet_id)');
    }
}
