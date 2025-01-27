using System.ComponentModel.DataAnnotations;

namespace Backend.BLL.Models
{
    public class RegisterModel
    {
        [StringLength(128)]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(16, MinimumLength = 8, ErrorMessage = "Password length must be between 8 to 16 characters")]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]+$", ErrorMessage = "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, 1 digit and length 8 characters")]
        public string Password { get; set; }
        [Compare("Password")]
        public string RePassword { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

    }
}
