import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableDecks1693445399361 implements MigrationInterface {
    name = 'UpdateTableDecks1693445399361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "UQ_1a695dc10cbc857f812a300ff6f"`);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "UQ_24ca144c8cc5e9a92056f369879" UNIQUE ("userId", "name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "UQ_24ca144c8cc5e9a92056f369879"`);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "UQ_1a695dc10cbc857f812a300ff6f" UNIQUE ("name")`);
    }

}
