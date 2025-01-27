using System.ComponentModel.DataAnnotations;

namespace Backend.API.Models
{
    public class CreateAddressBook
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string FullName { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int JobTitleId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int DepartmentId { get; set; }
        public string? MobileNumber { get; set; }
        public DateOnly DOB { get; set; }
        public string Address { get; set; }
        public string? Password { get; set; }
        public string Email { get; set; }
        public IFormFile Photo { get; set; }
    }
}
