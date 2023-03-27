import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigrations1679880438088 implements MigrationInterface {
  name = 'BaseMigrations1679880438088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_type_enum" AS ENUM('MAGIC', 'TRAP')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" "public"."users_type_enum" NOT NULL DEFAULT 'MAGIC', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_ap" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
  }
}
