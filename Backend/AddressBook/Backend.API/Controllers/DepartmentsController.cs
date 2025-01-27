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
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentsController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _departmentRepository.GetAllAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _departmentRepository.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(DepartmentModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = new Department
            {
                Name = model.Name
            };

            await _departmentRepository.AddAsync(department);
            if (await _departmentRepository.SaveChangesAsync() > 1)
            {
                return CreatedAtAction(nameof(GetById), new { id = department.Id }, department);
            }
            return Ok(department);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(int id, DepartmentModel model)
        {
            if (!ModelState.IsValid || id != model.Id)
                return BadRequest(ModelState);
            var department = await _departmentRepository.GetByIdAsync(id);
            if (department is null)
                return NotFound($"There is no department with this id {id}");
            department.Name = model.Name;
            _departmentRepository.Update(department);
            if (await _departmentRepository.SaveChangesAsync() > 0)
            {
                return Ok(model);
            }
            return BadRequest("Something went wrong please try again");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);
            if (department is null)
                return NotFound($"There is no department with this id {id}");
            _departmentRepository.Delete(department);
            if (await _departmentRepository.SaveChangesAsync() > 0)
            {
                return Ok(department);
            }
            return BadRequest("Something went wrong please try again");
        }
    }
}
