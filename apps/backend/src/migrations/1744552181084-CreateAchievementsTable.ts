import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAchievementsTable1744552181084
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "achievements",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "int",
          },
          {
            name: "name",
            type: "varchar",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("achievements");
  }
}
