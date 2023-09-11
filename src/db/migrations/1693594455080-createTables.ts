import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1693594455080 implements MigrationInterface {
    name = 'CreateTables1693594455080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monsters_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying(200) NOT NULL, "userId" uuid, "monsterId" uuid, CONSTRAINT "PK_76a7df016fcac52348c7c63ef99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "monsters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "atk" integer NOT NULL, "def" integer NOT NULL, "level" integer NOT NULL, "specialAbility" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615" UNIQUE ("name"), CONSTRAINT "PK_54abad06b2131c35078519e9e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spells_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying(200) NOT NULL, "userId" uuid, "spellId" uuid, CONSTRAINT "PK_d32521de861aa00124e8fa928fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spells" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "UQ_500a937a971f1f1c83d6405d75f" UNIQUE ("name"), CONSTRAINT "PK_19d1052082c20f04349c0b5875c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "traps_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying(200) NOT NULL, "userId" uuid, "trapId" uuid, CONSTRAINT "PK_cf24b7364c0ab5224fbc95d8e30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "traps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "UQ_59e907c93d296a213cccf57e58a" UNIQUE ("name"), CONSTRAINT "PK_784e90827988171a6601225914c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "userId" uuid, CONSTRAINT "UQ_24ca144c8cc5e9a92056f369879" UNIQUE ("userId", "name"), CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "salt" character varying NOT NULL, "confirmationToken" character varying(64), "recoverToken" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks_spells_spells" ("decksId" uuid NOT NULL, "spellsId" uuid NOT NULL, CONSTRAINT "PK_8698df76935a8a53d423feb9cbf" PRIMARY KEY ("decksId", "spellsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f80b9ed2aa68aa85f7d3a38260" ON "decks_spells_spells" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d8ddead7968d849d99a58232c" ON "decks_spells_spells" ("spellsId") `);
        await queryRunner.query(`CREATE TABLE "decks_traps_traps" ("decksId" uuid NOT NULL, "trapsId" uuid NOT NULL, CONSTRAINT "PK_0dfbe54850feafc28e87347d1f7" PRIMARY KEY ("decksId", "trapsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_801312ddce8c86f271de67fd2c" ON "decks_traps_traps" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_914c0c9041e41a33d2317c3931" ON "decks_traps_traps" ("trapsId") `);
        await queryRunner.query(`CREATE TABLE "decks_monsters_monsters" ("decksId" uuid NOT NULL, "monstersId" uuid NOT NULL, CONSTRAINT "PK_96936c2bbcdef1835d3208d6942" PRIMARY KEY ("decksId", "monstersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80778faa197cf08c6c591496dc" ON "decks_monsters_monsters" ("decksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f51a6133bea5023f5303785c56" ON "decks_monsters_monsters" ("monstersId") `);
        await queryRunner.query(`ALTER TABLE "monsters_users" ADD CONSTRAINT "FK_3722b8a5822467778e18527cea0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "monsters_users" ADD CONSTRAINT "FK_a4f4c9398dc1742b7dbaadaefd2" FOREIGN KEY ("monsterId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "spells_users" ADD CONSTRAINT "FK_5804db5a8376b2771687e3a2dc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "spells_users" ADD CONSTRAINT "FK_0da027aa92f20d486985cb6143d" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "traps_users" ADD CONSTRAINT "FK_80974e6b408b958f95224f64ec6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "traps_users" ADD CONSTRAINT "FK_caf333a9660860012199ebbad14" FOREIGN KEY ("trapId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
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
        await queryRunner.query(`ALTER TABLE "traps_users" DROP CONSTRAINT "FK_caf333a9660860012199ebbad14"`);
        await queryRunner.query(`ALTER TABLE "traps_users" DROP CONSTRAINT "FK_80974e6b408b958f95224f64ec6"`);
        await queryRunner.query(`ALTER TABLE "spells_users" DROP CONSTRAINT "FK_0da027aa92f20d486985cb6143d"`);
        await queryRunner.query(`ALTER TABLE "spells_users" DROP CONSTRAINT "FK_5804db5a8376b2771687e3a2dc4"`);
        await queryRunner.query(`ALTER TABLE "monsters_users" DROP CONSTRAINT "FK_a4f4c9398dc1742b7dbaadaefd2"`);
        await queryRunner.query(`ALTER TABLE "monsters_users" DROP CONSTRAINT "FK_3722b8a5822467778e18527cea0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f51a6133bea5023f5303785c56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80778faa197cf08c6c591496dc"`);
        await queryRunner.query(`DROP TABLE "decks_monsters_monsters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_914c0c9041e41a33d2317c3931"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_801312ddce8c86f271de67fd2c"`);
        await queryRunner.query(`DROP TABLE "decks_traps_traps"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d8ddead7968d849d99a58232c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f80b9ed2aa68aa85f7d3a38260"`);
        await queryRunner.query(`DROP TABLE "decks_spells_spells"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "decks"`);
        await queryRunner.query(`DROP TABLE "traps"`);
        await queryRunner.query(`DROP TABLE "traps_users"`);
        await queryRunner.query(`DROP TABLE "spells"`);
        await queryRunner.query(`DROP TABLE "spells_users"`);
        await queryRunner.query(`DROP TABLE "monsters"`);
        await queryRunner.query(`DROP TABLE "monsters_users"`);
    }

}
