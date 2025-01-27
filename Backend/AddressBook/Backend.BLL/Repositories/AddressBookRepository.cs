using Backend.BLL.Interfaces;
using Backend.BLL.Models;
using Backend.DAL.Data;
using Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Backend.BLL.Repositories
{
    public class AddressBookRepository : Repository<AddressBook>, IAddressBookRepository
    {
        private readonly ApplicationDbContext _context;

        public AddressBookRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Task<AddressBook?> FindByEmailAsync(string email)
        {
            return _context.AddressBooks.FirstOrDefaultAsync(x => x.Email == email.Trim().ToLower());
        }

        public async Task<IEnumerable<AddressBookModel>> GetAllAddressBooks(string? searchKey, string? searchDate)
        {
            var query = (from q in _context.AddressBooks.AsNoTracking()
                         let today = DateOnly.FromDateTime(DateTime.Now)
                         select new AddressBookModel
                         {
                             Id = q.Id,
                             FullName = q.FullName,
                             Email = q.Email,
                             Address = q.Address,
                             MobileNumber = q.MobileNumber,
                             Photo = q.Photo,
                             DOB = q.DOB,
                             Department = q.Department.Name,
                             JobTitle = q.JobTitle.Name,
                             Age = today.Year - q.DOB.Year,
                             DepartmentId = q.DepartmentId,
                             JobTitleId = q.JobTitleId
                         });
            if (!string.IsNullOrWhiteSpace(searchKey))
            {
                query = query.Where(query => query.FullName.Contains(searchKey) || query.Email.Contains(searchKey) || query.Address.Contains(searchKey) || query.MobileNumber.Contains(searchKey) || query.Department.Contains(searchKey) || query.JobTitle.Contains(searchKey));
            }

            if (!string.IsNullOrWhiteSpace(searchDate) && DateOnly.TryParseExact(searchDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
            {
                query = query.Where(query => query.DOB >= parsedDate);
            }

            return await query.ToListAsync();
        }

        public Task<bool> IsEmailExist(string email)
        {
            return _context.AddressBooks.AnyAsync(x => x.Email == email.Trim().ToLower());
        }
    }
}
