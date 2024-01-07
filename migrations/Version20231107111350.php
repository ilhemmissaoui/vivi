<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231107111350 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE financement_depense ADD avancement INT DEFAULT NULL');
        $this->addSql('ALTER TABLE month_charge_ext ADD financement_depense_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE month_charge_ext ADD CONSTRAINT FK_A11797897A187140 FOREIGN KEY (financement_depense_id) REFERENCES financement_depense (id)');
        $this->addSql('CREATE INDEX IDX_A11797897A187140 ON month_charge_ext (financement_depense_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE financement_depense DROP avancement');
        $this->addSql('ALTER TABLE month_charge_ext DROP FOREIGN KEY FK_A11797897A187140');
        $this->addSql('DROP INDEX IDX_A11797897A187140 ON month_charge_ext');
        $this->addSql('ALTER TABLE month_charge_ext DROP financement_depense_id');
    }
}
