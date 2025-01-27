using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDepartmentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTitles_Departments_DepartmentId",
                schema: "AddressBook",
                table: "JobTitles");

            migrationBuilder.DropIndex(
                name: "IX_JobTitles_DepartmentId",
                schema: "AddressBook",
                table: "JobTitles");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                schema: "AddressBook",
                table: "JobTitles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                schema: "AddressBook",
                table: "JobTitles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobTitles_DepartmentId",
                schema: "AddressBook",
                table: "JobTitles",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTitles_Departments_DepartmentId",
                schema: "AddressBook",
                table: "JobTitles",
                column: "DepartmentId",
                principalSchema: "AddressBook",
                principalTable: "Departments",
                principalColumn: "Id");
        }
    }
}
