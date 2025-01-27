using System.ComponentModel.DataAnnotations;

namespace Backend.BLL.Models
{
    public class AddressBookModel
    {
        public int Id { get; set; }
        [StringLength(500)]
        public string FullName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public int JobTitleId { get; set; }
        public string Department { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string MobileNumber { get; set; } = string.Empty;
        public DateOnly DOB { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
