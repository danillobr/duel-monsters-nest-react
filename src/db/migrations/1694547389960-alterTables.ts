import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1694547389960 implements MigrationInterface {
    name = 'AlterTables1694547389960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6077bbed1f2d46517bb4f77d134" UNIQUE ("name"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks_cards_cards" ("decksId" uuid NOT NULL, "cardsId" uuid NOT NULL, CONSTRAINT "PK_2e62fc81e72369da5b28ce2c199" PRIMARY KEY ("decksId", "cardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73bc78c95062bc6f8980ffc083" ON "decks_cards_cards" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6aff5e82cd8d5501fb5d463dbe" ON "decks_cards_cards" ("cardsId") `);
        await queryRunner.query(`ALTER TABLE "decks_cards_cards" ADD CONSTRAINT "FK_73bc78c95062bc6f8980ffc083c" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_cards_cards" ADD CONSTRAINT "FK_6aff5e82cd8d5501fb5d463dbe4" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks_cards_cards" DROP CONSTRAINT "FK_6aff5e82cd8d5501fb5d463dbe4"`);
        await queryRunner.query(`ALTER TABLE "decks_cards_cards" DROP CONSTRAINT "FK_73bc78c95062bc6f8980ffc083c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6aff5e82cd8d5501fb5d463dbe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73bc78c95062bc6f8980ffc083"`);
        await queryRunner.query(`DROP TABLE "decks_cards_cards"`);
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
