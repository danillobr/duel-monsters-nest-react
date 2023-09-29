import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1695698524400 implements MigrationInterface {
    name = 'AlterTables1695698524400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "decks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "decks" DROP COLUMN "createdAt"`);
    }

}
