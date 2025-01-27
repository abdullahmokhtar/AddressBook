﻿using Backend.API.Services;
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
    public class AddressBooksController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IAddressBookRepository _addressBookRepository;
        private readonly IWebHostEnvironment _environment;

        public AddressBooksController(IAuthService authService, IAddressBookRepository addressBookRepository, IWebHostEnvironment environment)
        {
            _authService = authService;
            _addressBookRepository = addressBookRepository;
            _environment = environment;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync(LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string? searchKey, string? searchDate)
        {
            return Ok(await _addressBookRepository.GetAllAddressBooks(searchKey, searchDate));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _addressBookRepository.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAddressBookModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addressBook = new AddressBook
            {
                FullName = model.FullName,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                DOB = model.DOB,
                Email = model.Email,
                JobTitleId = model.JobTitleId,
                MobileNumber = model.MobileNumber ?? string.Empty,
                Password = model.Password ?? string.Empty,
            };

            await _addressBookRepository.AddAsync(addressBook);
            if (await _addressBookRepository.SaveChangesAsync() > 0)
            {
                return CreatedAtAction(nameof(GetById), new { id = addressBook.Id }, addressBook);
            }
            return Ok(addressBook);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(int id, CreateAddressBookModel model)
        {
            if (!ModelState.IsValid || id != model.Id)
                return BadRequest(ModelState);
            var addressBook = await _addressBookRepository.GetByIdAsync(id);
            if (addressBook is null)
                return NotFound($"There is no addressBook with this id {id}");
            addressBook.FullName = model.FullName;
            addressBook.JobTitleId = model.JobTitleId;
            addressBook.DepartmentId = model.DepartmentId;
            addressBook.MobileNumber = model.MobileNumber ?? string.Empty;
            addressBook.DOB = model.DOB;
            addressBook.Address = model.Address;
            addressBook.Email = model.Email;

            _addressBookRepository.Update(addressBook);
            if (await _addressBookRepository.SaveChangesAsync() > 0)
            {
                return Ok(model);
            }
            return BadRequest("Something went wrong please try again");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var addressBook = await _addressBookRepository.GetByIdAsync(id);
            if (addressBook is null)
                return NotFound($"There is no addressBook with this id {id}");
            _addressBookRepository.Delete(addressBook);
            if (await _addressBookRepository.SaveChangesAsync() > 0)
            {
                return Ok(addressBook);
            }
            return BadRequest("Something went wrong please try again");
        }
    }
}
