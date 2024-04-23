import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1713851242665 implements MigrationInterface {
    name = 'CreateDatabase1713851242665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monsters_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "monsterId" uuid, CONSTRAINT "CHK_c17ae191229347c082d5907e5b" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_3ade0e02dd5d5dbe521717136e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "monsters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "atk" integer NOT NULL, "def" integer NOT NULL, "level" integer NOT NULL, "specialAbility" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615" UNIQUE ("name"), CONSTRAINT "PK_54abad06b2131c35078519e9e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_monsters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "userCardsId" uuid, "monsterId" uuid, CONSTRAINT "PK_966617955d27eff50906fa78df9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "traps_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "trapId" uuid, CONSTRAINT "CHK_17959087f142740daee8ec5953" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_7d1159deebd323753a9e1396a49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "traps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "UQ_59e907c93d296a213cccf57e58a" UNIQUE ("name"), CONSTRAINT "PK_784e90827988171a6601225914c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_traps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "userCardsId" uuid, "trapId" uuid, CONSTRAINT "PK_8cc199e786fb59a18ee7e90dfdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_c4f3cadb56d0dbac6b438058d4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_spells" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "userCardsId" uuid, "spellId" uuid, CONSTRAINT "PK_0500c97410024a277bc60ea3e8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spells" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "img" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "effectDuration" integer NOT NULL, "symbol" character varying(20) NOT NULL, CONSTRAINT "UQ_500a937a971f1f1c83d6405d75f" UNIQUE ("name"), CONSTRAINT "PK_19d1052082c20f04349c0b5875c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spells_decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "deckId" uuid, "spellId" uuid, CONSTRAINT "CHK_5c22deb4abb95422de81194f56" CHECK ("amount" >= 0 AND "amount" <= 3), CONSTRAINT "PK_c0ed4fa508fb4e2a6482c67f586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_24ca144c8cc5e9a92056f369879" UNIQUE ("userId", "name"), CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "username" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "role" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "password" character varying, "salt" character varying, "confirmationToken" character varying(64), "recoverToken" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cardsId" uuid, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_fe17c3aeb63da26e833344ee77" UNIQUE ("cardsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" ADD CONSTRAINT "FK_51b8c484223202d353bb129575e" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" ADD CONSTRAINT "FK_72bbe2f643a62e932f8e724d40d" FOREIGN KEY ("monsterId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_monsters" ADD CONSTRAINT "FK_55bfc8e8211eeb9789ea713aae4" FOREIGN KEY ("userCardsId") REFERENCES "users_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_monsters" ADD CONSTRAINT "FK_e5439243a02270cd8f7f91de238" FOREIGN KEY ("monsterId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "traps_decks" ADD CONSTRAINT "FK_db8247139f0824dfeaa7b04c660" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "traps_decks" ADD CONSTRAINT "FK_7795c7d4955b8645475be2fc1a5" FOREIGN KEY ("trapId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_traps" ADD CONSTRAINT "FK_288e756a36e802bc0517c1b8173" FOREIGN KEY ("userCardsId") REFERENCES "users_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_traps" ADD CONSTRAINT "FK_358270df65555479344a3e925f6" FOREIGN KEY ("trapId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_spells" ADD CONSTRAINT "FK_dc44d41cb120300ebea81109b43" FOREIGN KEY ("userCardsId") REFERENCES "users_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_spells" ADD CONSTRAINT "FK_701d35408207bf2a35ae28059d6" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "spells_decks" ADD CONSTRAINT "FK_0b61ebbd9a4fbc5922bc0910c51" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "spells_decks" ADD CONSTRAINT "FK_d804ec24a32cc669924193c45ec" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "FK_d60e048034edfd232e0b8cedaeb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fe17c3aeb63da26e833344ee773" FOREIGN KEY ("cardsId") REFERENCES "users_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fe17c3aeb63da26e833344ee773"`);
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "FK_d60e048034edfd232e0b8cedaeb"`);
        await queryRunner.query(`ALTER TABLE "spells_decks" DROP CONSTRAINT "FK_d804ec24a32cc669924193c45ec"`);
        await queryRunner.query(`ALTER TABLE "spells_decks" DROP CONSTRAINT "FK_0b61ebbd9a4fbc5922bc0910c51"`);
        await queryRunner.query(`ALTER TABLE "users_spells" DROP CONSTRAINT "FK_701d35408207bf2a35ae28059d6"`);
        await queryRunner.query(`ALTER TABLE "users_spells" DROP CONSTRAINT "FK_dc44d41cb120300ebea81109b43"`);
        await queryRunner.query(`ALTER TABLE "users_traps" DROP CONSTRAINT "FK_358270df65555479344a3e925f6"`);
        await queryRunner.query(`ALTER TABLE "users_traps" DROP CONSTRAINT "FK_288e756a36e802bc0517c1b8173"`);
        await queryRunner.query(`ALTER TABLE "traps_decks" DROP CONSTRAINT "FK_7795c7d4955b8645475be2fc1a5"`);
        await queryRunner.query(`ALTER TABLE "traps_decks" DROP CONSTRAINT "FK_db8247139f0824dfeaa7b04c660"`);
        await queryRunner.query(`ALTER TABLE "users_monsters" DROP CONSTRAINT "FK_e5439243a02270cd8f7f91de238"`);
        await queryRunner.query(`ALTER TABLE "users_monsters" DROP CONSTRAINT "FK_55bfc8e8211eeb9789ea713aae4"`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" DROP CONSTRAINT "FK_72bbe2f643a62e932f8e724d40d"`);
        await queryRunner.query(`ALTER TABLE "monsters_decks" DROP CONSTRAINT "FK_51b8c484223202d353bb129575e"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "decks"`);
        await queryRunner.query(`DROP TABLE "spells_decks"`);
        await queryRunner.query(`DROP TABLE "spells"`);
        await queryRunner.query(`DROP TABLE "users_spells"`);
        await queryRunner.query(`DROP TABLE "users_cards"`);
        await queryRunner.query(`DROP TABLE "users_traps"`);
        await queryRunner.query(`DROP TABLE "traps"`);
        await queryRunner.query(`DROP TABLE "traps_decks"`);
        await queryRunner.query(`DROP TABLE "users_monsters"`);
        await queryRunner.query(`DROP TABLE "monsters"`);
        await queryRunner.query(`DROP TABLE "monsters_decks"`);
    }

}
