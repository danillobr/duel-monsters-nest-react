import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeck1693420714628 implements MigrationInterface {
    name = 'CreateDeck1693420714628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "userId" uuid, CONSTRAINT "UQ_1a695dc10cbc857f812a300ff6f" UNIQUE ("name"), CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks_spells_spells" ("decksId" uuid NOT NULL, "spellsId" uuid NOT NULL, CONSTRAINT "PK_8698df76935a8a53d423feb9cbf" PRIMARY KEY ("decksId", "spellsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f80b9ed2aa68aa85f7d3a38260" ON "decks_spells_spells" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d8ddead7968d849d99a58232c" ON "decks_spells_spells" ("spellsId") `);
        await queryRunner.query(`CREATE TABLE "decks_traps_traps" ("decksId" uuid NOT NULL, "trapsId" uuid NOT NULL, CONSTRAINT "PK_0dfbe54850feafc28e87347d1f7" PRIMARY KEY ("decksId", "trapsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_801312ddce8c86f271de67fd2c" ON "decks_traps_traps" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_914c0c9041e41a33d2317c3931" ON "decks_traps_traps" ("trapsId") `);
        await queryRunner.query(`CREATE TABLE "decks_monsters_monsters" ("decksId" uuid NOT NULL, "monstersId" uuid NOT NULL, CONSTRAINT "PK_96936c2bbcdef1835d3208d6942" PRIMARY KEY ("decksId", "monstersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80778faa197cf08c6c591496dc" ON "decks_monsters_monsters" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f51a6133bea5023f5303785c56" ON "decks_monsters_monsters" ("monstersId") `);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "FK_d60e048034edfd232e0b8cedaeb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "decks_spells_spells" ADD CONSTRAINT "FK_f80b9ed2aa68aa85f7d3a382602" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_spells_spells" ADD CONSTRAINT "FK_7d8ddead7968d849d99a58232c4" FOREIGN KEY ("spellsId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_traps_traps" ADD CONSTRAINT "FK_801312ddce8c86f271de67fd2cb" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_traps_traps" ADD CONSTRAINT "FK_914c0c9041e41a33d2317c3931d" FOREIGN KEY ("trapsId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_monsters_monsters" ADD CONSTRAINT "FK_80778faa197cf08c6c591496dce" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks_monsters_monsters" ADD CONSTRAINT "FK_f51a6133bea5023f5303785c569" FOREIGN KEY ("monstersId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks_monsters_monsters" DROP CONSTRAINT "FK_f51a6133bea5023f5303785c569"`);
        await queryRunner.query(`ALTER TABLE "decks_monsters_monsters" DROP CONSTRAINT "FK_80778faa197cf08c6c591496dce"`);
        await queryRunner.query(`ALTER TABLE "decks_traps_traps" DROP CONSTRAINT "FK_914c0c9041e41a33d2317c3931d"`);
        await queryRunner.query(`ALTER TABLE "decks_traps_traps" DROP CONSTRAINT "FK_801312ddce8c86f271de67fd2cb"`);
        await queryRunner.query(`ALTER TABLE "decks_spells_spells" DROP CONSTRAINT "FK_7d8ddead7968d849d99a58232c4"`);
        await queryRunner.query(`ALTER TABLE "decks_spells_spells" DROP CONSTRAINT "FK_f80b9ed2aa68aa85f7d3a382602"`);
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "FK_d60e048034edfd232e0b8cedaeb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f51a6133bea5023f5303785c56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80778faa197cf08c6c591496dc"`);
        await queryRunner.query(`DROP TABLE "decks_monsters_monsters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_914c0c9041e41a33d2317c3931"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_801312ddce8c86f271de67fd2c"`);
        await queryRunner.query(`DROP TABLE "decks_traps_traps"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d8ddead7968d849d99a58232c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f80b9ed2aa68aa85f7d3a38260"`);
        await queryRunner.query(`DROP TABLE "decks_spells_spells"`);
        await queryRunner.query(`DROP TABLE "decks"`);
    }

}
