import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRelacionDeck1694629956302 implements MigrationInterface {
    name = 'AlterRelacionDeck1694629956302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "traps_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "trapId" uuid, CONSTRAINT "CHK_17959087f142740daee8ec5953" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_7d1159deebd323753a9e1396a49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "monsters_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "monsterId" uuid, CONSTRAINT "CHK_c17ae191229347c082d5907e5b" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_3ade0e02dd5d5dbe521717136e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "traps_decks" ADD CONSTRAINT "FK_db8247139f0824dfeaa7b04c660" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "traps_decks" ADD CONSTRAINT "FK_7795c7d4955b8645475be2fc1a5" FOREIGN KEY ("trapId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" ADD CONSTRAINT "FK_51b8c484223202d353bb129575e" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" ADD CONSTRAINT "FK_72bbe2f643a62e932f8e724d40d" FOREIGN KEY ("monsterId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters_decks" DROP CONSTRAINT "FK_72bbe2f643a62e932f8e724d40d"`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" DROP CONSTRAINT "FK_51b8c484223202d353bb129575e"`);
        await queryRunner.query(`ALTER TABLE "traps_decks" DROP CONSTRAINT "FK_7795c7d4955b8645475be2fc1a5"`);
        await queryRunner.query(`ALTER TABLE "traps_decks" DROP CONSTRAINT "FK_db8247139f0824dfeaa7b04c660"`);
        await queryRunner.query(`DROP TABLE "monsters_decks"`);
        await queryRunner.query(`DROP TABLE "traps_decks"`);
    }

}
