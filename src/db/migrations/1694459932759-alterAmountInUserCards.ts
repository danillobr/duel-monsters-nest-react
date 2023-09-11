import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAmountInUserCards1694459932759 implements MigrationInterface {
    name = 'AlterAmountInUserCards1694459932759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "monsters_users" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "traps_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "traps_users" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "traps_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "traps_users" ADD "amount" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monsters_users" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "monsters_users" ADD "amount" character varying(200) NOT NULL`);
    }

}
