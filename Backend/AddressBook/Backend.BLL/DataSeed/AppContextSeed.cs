using Backend.DAL.Data;
using Backend.DAL.Entities;

namespace Backend.BLL.DataSeed
{
    public class AppContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            try
            {
                if (context.Departments != null && !context.Departments.Any())
                {
                    await context.Departments.AddRangeAsync(new List<Department>
                        {
                            new Department { Name = "IT" },
                            new Department {Name = "Software"}
                        });
                    await context.SaveChangesAsync();
                }

                if (context.JobTitles != null && !context.JobTitles.Any())
                {
                    await context.JobTitles.AddRangeAsync(new List<JobTitle>
                        {
                            new JobTitle { Name = "Software Developer" },
                            new JobTitle { Name = "Software Engineer" } }
                    );
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
