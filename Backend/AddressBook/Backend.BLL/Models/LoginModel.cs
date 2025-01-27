using System.ComponentModel.DataAnnotations;

namespace Backend.BLL.Models
{
    public class LoginModel
    {
        [StringLength(128)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
