<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231107102702 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE month_liste_chiffre_affaire ADD financement_chiffre_affaire_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE month_liste_chiffre_affaire ADD CONSTRAINT FK_1D13244E524CFA4E FOREIGN KEY (financement_chiffre_affaire_id) REFERENCES financement_chiffre_affaire (id)');
        $this->addSql('CREATE INDEX IDX_1D13244E524CFA4E ON month_liste_chiffre_affaire (financement_chiffre_affaire_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE month_liste_chiffre_affaire DROP FOREIGN KEY FK_1D13244E524CFA4E');
        $this->addSql('DROP INDEX IDX_1D13244E524CFA4E ON month_liste_chiffre_affaire');
        $this->addSql('ALTER TABLE month_liste_chiffre_affaire DROP financement_chiffre_affaire_id');
    }
}
