import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDataBases1692939101922 implements MigrationInterface {
    name = 'CreateDataBases1692939101922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "traps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "PK_784e90827988171a6601225914c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "traps"`);
    }

}
