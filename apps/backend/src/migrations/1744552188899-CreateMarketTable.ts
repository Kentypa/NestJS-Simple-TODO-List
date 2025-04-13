import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMarketTable1744552188899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "market",
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
    await queryRunner.dropTable("market");
  }
}
