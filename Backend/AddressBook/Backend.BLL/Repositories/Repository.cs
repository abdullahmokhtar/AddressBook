using Backend.BLL.Interfaces;
using Backend.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.BLL.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _db;
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
            _db = context.Set<T>();
        }
        public async Task AddAsync(T entity)
               => await _db.AddAsync(entity);

        public async Task<IEnumerable<T>> GetAllAsync(params string[] includeProperties)
        {
            var query = _db.AsNoTracking();
            query = includeProperties.Aggregate(query,
               (current, includeProperty) => current.Include(includeProperty));
            return await query.ToListAsync();
        }
        public async Task<T?> GetByIdAsync(int id)
            => await _db.FindAsync(id);

        public void Update(T entity)
            => _db.Update(entity);
        public void Delete(T entity)
            => _db.Remove(entity);

        public Task<int> SaveChangesAsync() => _context.SaveChangesAsync();
    }
}
