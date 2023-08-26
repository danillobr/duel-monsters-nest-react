import { MigrationInterface, QueryRunner } from "typeorm";

export class MappingUserCards1693087585462 implements MigrationInterface {
    name = 'MappingUserCards1693087585462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spells" DROP CONSTRAINT "FK_184597f444d25b3b2c9b86e28ea"`);
        await queryRunner.query(`ALTER TABLE "traps" DROP CONSTRAINT "FK_fe454bc9ff76ca661d6f3666e08"`);
        await queryRunner.query(`ALTER TABLE "monsters" DROP CONSTRAINT "FK_1b3a26f635a9e0f37aa4e719b85"`);
        await queryRunner.query(`CREATE TABLE "users_spells_spells" ("usersId" uuid NOT NULL, "spellsId" uuid NOT NULL, CONSTRAINT "PK_3818fb1349fc89f4d200f6566e7" PRIMARY KEY ("usersId", "spellsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ad4b8de8cae78eb9490024f7c1" ON "users_spells_spells" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_352db28e5bc557bc5f52886187" ON "users_spells_spells" ("spellsId") `);
        await queryRunner.query(`CREATE TABLE "users_traps_traps" ("usersId" uuid NOT NULL, "trapsId" uuid NOT NULL, CONSTRAINT "PK_0084f17c98e81d2d61956f0ce4e" PRIMARY KEY ("usersId", "trapsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bd0474b1d07bb049083da34a7" ON "users_traps_traps" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_701779d1dedf6e6ddb411096bf" ON "users_traps_traps" ("trapsId") `);
        await queryRunner.query(`CREATE TABLE "users_monsters_monsters" ("usersId" uuid NOT NULL, "monstersId" uuid NOT NULL, CONSTRAINT "PK_2baa71098268784045b5f4ed169" PRIMARY KEY ("usersId", "monstersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3edece2e9db588a94ca5a17fea" ON "users_monsters_monsters" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_341328b22ba1e3f11d33d49d3f" ON "users_monsters_monsters" ("monstersId") `);
        await queryRunner.query(`ALTER TABLE "spells" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "traps" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "monsters" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users_spells_spells" ADD CONSTRAINT "FK_ad4b8de8cae78eb9490024f7c1d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_spells_spells" ADD CONSTRAINT "FK_352db28e5bc557bc5f528861872" FOREIGN KEY ("spellsId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_traps_traps" ADD CONSTRAINT "FK_8bd0474b1d07bb049083da34a77" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_traps_traps" ADD CONSTRAINT "FK_701779d1dedf6e6ddb411096bf2" FOREIGN KEY ("trapsId") REFERENCES "traps"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_monsters_monsters" ADD CONSTRAINT "FK_3edece2e9db588a94ca5a17feab" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_monsters_monsters" ADD CONSTRAINT "FK_341328b22ba1e3f11d33d49d3f9" FOREIGN KEY ("monstersId") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_monsters_monsters" DROP CONSTRAINT "FK_341328b22ba1e3f11d33d49d3f9"`);
        await queryRunner.query(`ALTER TABLE "users_monsters_monsters" DROP CONSTRAINT "FK_3edece2e9db588a94ca5a17feab"`);
        await queryRunner.query(`ALTER TABLE "users_traps_traps" DROP CONSTRAINT "FK_701779d1dedf6e6ddb411096bf2"`);
        await queryRunner.query(`ALTER TABLE "users_traps_traps" DROP CONSTRAINT "FK_8bd0474b1d07bb049083da34a77"`);
        await queryRunner.query(`ALTER TABLE "users_spells_spells" DROP CONSTRAINT "FK_352db28e5bc557bc5f528861872"`);
        await queryRunner.query(`ALTER TABLE "users_spells_spells" DROP CONSTRAINT "FK_ad4b8de8cae78eb9490024f7c1d"`);
        await queryRunner.query(`ALTER TABLE "monsters" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "traps" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "spells" ADD "userId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_341328b22ba1e3f11d33d49d3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3edece2e9db588a94ca5a17fea"`);
        await queryRunner.query(`DROP TABLE "users_monsters_monsters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_701779d1dedf6e6ddb411096bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bd0474b1d07bb049083da34a7"`);
        await queryRunner.query(`DROP TABLE "users_traps_traps"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_352db28e5bc557bc5f52886187"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad4b8de8cae78eb9490024f7c1"`);
        await queryRunner.query(`DROP TABLE "users_spells_spells"`);
        await queryRunner.query(`ALTER TABLE "monsters" ADD CONSTRAINT "FK_1b3a26f635a9e0f37aa4e719b85" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "traps" ADD CONSTRAINT "FK_fe454bc9ff76ca661d6f3666e08" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spells" ADD CONSTRAINT "FK_184597f444d25b3b2c9b86e28ea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
