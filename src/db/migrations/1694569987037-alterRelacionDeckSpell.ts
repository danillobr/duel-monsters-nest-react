import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRelacionDeckSpell1694569987037 implements MigrationInterface {
    name = 'AlterRelacionDeckSpell1694569987037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spells_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "spellId" uuid, CONSTRAINT "CHK_5c22deb4abb95422de81194f56" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_c0ed4fa508fb4e2a6482c67f586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "spells_decks" ADD CONSTRAINT "FK_0b61ebbd9a4fbc5922bc0910c51" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "spells_decks" ADD CONSTRAINT "FK_d804ec24a32cc669924193c45ec" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spells_decks" DROP CONSTRAINT "FK_d804ec24a32cc669924193c45ec"`);
        await queryRunner.query(`ALTER TABLE "spells_decks" DROP CONSTRAINT "FK_0b61ebbd9a4fbc5922bc0910c51"`);
        await queryRunner.query(`DROP TABLE "spells_decks"`);
    }

}
