using System.ComponentModel.DataAnnotations;

namespace Backend.DAL.Entities
{
    public class JobTitle
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public ICollection<AddressBook> AddressBooks { get; set; } = [];
    }
}
