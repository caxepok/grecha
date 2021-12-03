using Microsoft.EntityFrameworkCore.Migrations;

namespace Grecha.Server.Migrations
{
    public partial class Update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Line",
                table: "Carts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quality",
                table: "Carts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QualityLevel",
                table: "Carts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Line",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Quality",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "QualityLevel",
                table: "Carts");
        }
    }
}
