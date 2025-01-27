using Backend.BLL.Interfaces;
using Backend.BLL.Models;
using Backend.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAddressBookRepository _addressBookRepository;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<AddressBook> _passwordHasher;
        private readonly SymmetricSecurityKey _key;

        public AuthService(IAddressBookRepository addressBookRepository, IConfiguration configuration, IPasswordHasher<AddressBook> passwordHasher)
        {
            _addressBookRepository = addressBookRepository;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]));
        }
        public async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            if (await _addressBookRepository.IsEmailExist(model.Email))
                return new AuthModel { Message = "Email is already registered!" };

            var addressBook = new AddressBook
            {
                Address = "",
                DepartmentId = 1,
                JobTitleId = 1,
                FullName = "",
                DOB = new DateOnly(2025, 10, 1),
                MobileNumber = "",
                Photo = "",

                Email = model.Email,
            };

            var hashedPassword = _passwordHasher.HashPassword(addressBook, model.Password);
            addressBook.Password = hashedPassword;

            await _addressBookRepository.AddAsync(addressBook);

            if (await _addressBookRepository.SaveChangesAsync() == 0)
                return new AuthModel { Message = "Something went wrong please try again" };

            var jwtScuirtyToken = GenerateToken(addressBook);

            return new AuthModel
            {
                UserName = addressBook.FullName,
                Email = addressBook.Email,
                ExpiresOn = jwtScuirtyToken.ValidTo,
                IsAuthenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtScuirtyToken)
            };
        }

        public JwtSecurityToken GenerateToken(AddressBook addressBook)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, addressBook.Email),
                new Claim(ClaimTypes.GivenName, addressBook.FullName),
                new Claim(ClaimTypes.NameIdentifier, addressBook.Id.ToString())
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: _configuration["Token:Issuer"],
                audience: _configuration["Token:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(Convert.ToInt32(_configuration["Token:DurationInDays"])),
                signingCredentials: creds
            );
        }

        public async Task<AuthModel> LoginAsync(LoginModel model)
        {
            var authModel = new AuthModel();

            var user = await _addressBookRepository.FindByEmailAsync(model.Email);

            if (user is null || _passwordHasher.VerifyHashedPassword(user, user.Password, model.Password) == PasswordVerificationResult.Failed)
            {
                authModel.Message = "Email or password is incorrect";
                return authModel;
            }
            var jwtScuirtyToken = GenerateToken(user);

            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtScuirtyToken);
            authModel.Email = user.Email;
            authModel.UserName = user.FullName;
            authModel.ExpiresOn = jwtScuirtyToken.ValidTo;

            return authModel;
        }
    }
}
