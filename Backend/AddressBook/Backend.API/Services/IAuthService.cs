using Backend.BLL.Models;
using Backend.DAL.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.API.Services
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
        Task<AuthModel> LoginAsync(LoginModel model);
        JwtSecurityToken GenerateToken(AddressBook addressBook);
    }
}
