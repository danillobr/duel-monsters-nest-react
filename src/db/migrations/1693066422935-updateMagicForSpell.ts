import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMagicForSpell1693066422935 implements MigrationInterface {
    name = 'UpdateMagicForSpell1693066422935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spells" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "PK_19d1052082c20f04349c0b5875c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "spells"`);
    }

}
