using server.Models;

namespace server.Services
{
    public interface AccountService
    {
        public Employee Login(string Email, string password);
    }
}
