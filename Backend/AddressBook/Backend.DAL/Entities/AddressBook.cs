using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.DAL.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class AddressBook
    {
        public int Id { get; set; }
        [StringLength(500)]
        public string FullName { get; set; } = string.Empty;
        public int JobTitleId { get; set; }
        public int DepartmentId { get; set; }
        [StringLength(50)]
        public string MobileNumber { get; set; } = string.Empty;
        public DateOnly DOB { get; set; }
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Photo { get; set; } = string.Empty;

        public Department Department { get; set; } = null!;
        public JobTitle JobTitle { get; set; } = null!;
    }
}
