import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCardName1693257532681 implements MigrationInterface {
    name = 'AlterCardName1693257532681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spells" ADD CONSTRAINT "UQ_500a937a971f1f1c83d6405d75f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "traps" ADD CONSTRAINT "UQ_59e907c93d296a213cccf57e58a" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "monsters" ADD CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters" DROP CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615"`);
        await queryRunner.query(`ALTER TABLE "traps" DROP CONSTRAINT "UQ_59e907c93d296a213cccf57e58a"`);
        await queryRunner.query(`ALTER TABLE "spells" DROP CONSTRAINT "UQ_500a937a971f1f1c83d6405d75f"`);
    }

}
