using System.ComponentModel.DataAnnotations;

namespace Backend.BLL.Models
{
    public class DepartmentModel
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
    }
}
