import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMagic1693061205130 implements MigrationInterface {
    name = 'CreateMagic1693061205130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "magics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "PK_3e3b10e6acd059af118bca84a7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "magics"`);
    }

}
