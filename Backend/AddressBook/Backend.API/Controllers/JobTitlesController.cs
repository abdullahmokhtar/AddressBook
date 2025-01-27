using Backend.BLL.Interfaces;
using Backend.BLL.Models;
using Backend.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitlesController : ControllerBase
    {
        private readonly IJobTitleRepository _jobTitleRepository;

        public JobTitlesController(IJobTitleRepository jobTitleRepository)
        {
            _jobTitleRepository = jobTitleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _jobTitleRepository.GetAllAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _jobTitleRepository.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(JobTitleModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobTitle = new JobTitle
            {
                Name = model.Name
            };

            await _jobTitleRepository.AddAsync(jobTitle);
            if (await _jobTitleRepository.SaveChangesAsync() > 1)
            {
                return CreatedAtAction(nameof(GetById), new { id = jobTitle.Id }, jobTitle);
            }
            return Ok(jobTitle);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(int id, JobTitleModel model)
        {
            if (!ModelState.IsValid || id != model.Id)
                return BadRequest(ModelState);
            var jobTitle = await _jobTitleRepository.GetByIdAsync(id);
            if (jobTitle is null)
                return NotFound($"There is no jobTitle with this id {id}");
            jobTitle.Name = model.Name;
            _jobTitleRepository.Update(jobTitle);
            if (await _jobTitleRepository.SaveChangesAsync() > 0)
            {
                return Ok(model);
            }
            return BadRequest("Something went wrong please try again");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var jobTitle = await _jobTitleRepository.GetByIdAsync(id);
            if (jobTitle is null)
                return NotFound($"There is no jobTitle with this id {id}");
            _jobTitleRepository.Delete(jobTitle);
            if (await _jobTitleRepository.SaveChangesAsync() > 0)
            {
                return Ok(jobTitle);
            }
            return BadRequest("Something went wrong please try again");
        }
    }
}
