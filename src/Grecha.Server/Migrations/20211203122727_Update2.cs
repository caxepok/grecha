using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Grecha.Server.Migrations
{
    public partial class Update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Supplier",
                table: "Carts");

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Measures",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "SupplierId",
                table: "Carts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_SupplierId",
                table: "Carts",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Supplier_SupplierId",
                table: "Carts",
                column: "SupplierId",
                principalTable: "Supplier",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Supplier_SupplierId",
                table: "Carts");

            migrationBuilder.DropTable(
                name: "Supplier");

            migrationBuilder.DropIndex(
                name: "IX_Carts_SupplierId",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Measures");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Carts");

            migrationBuilder.AddColumn<string>(
                name: "Supplier",
                table: "Carts",
                type: "text",
                nullable: true);
        }
    }
}
