import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAmountInSpellsUsers1693627008687 implements MigrationInterface {
    name = 'AlterAmountInSpellsUsers1693627008687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spells_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "spells_users" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spells_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "spells_users" ADD "amount" character varying(200) NOT NULL`);
    }

}
