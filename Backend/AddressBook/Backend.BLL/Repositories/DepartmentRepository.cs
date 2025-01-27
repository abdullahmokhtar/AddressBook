using Backend.BLL.Interfaces;
using Backend.DAL.Data;
using Backend.DAL.Entities;

namespace Backend.BLL.Repositories
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
