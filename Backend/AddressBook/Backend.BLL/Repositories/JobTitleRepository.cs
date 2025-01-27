using Backend.BLL.Interfaces;
using Backend.DAL.Data;
using Backend.DAL.Entities;

namespace Backend.BLL.Repositories
{
    public class JobTitleRepository : Repository<JobTitle>, IJobTitleRepository
    {
        public JobTitleRepository(ApplicationDbContext context) : base(context) { }
    }
}
