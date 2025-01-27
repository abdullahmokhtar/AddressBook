using Backend.BLL.Models;
using Backend.DAL.Entities;

namespace Backend.BLL.Interfaces
{
    public interface IAddressBookRepository : IRepository<AddressBook>
    {
        Task<bool> IsEmailExist(string email);
        Task<AddressBook?> FindByEmailAsync(string email);
        Task<IEnumerable<AddressBookModel>> GetAllAddressBooks(string? searchKey, string? searchDate);
    }
}
