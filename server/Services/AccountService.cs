using server.Data;
using server.Models;

namespace server.Services
{
    public interface AccountService
    {
        public Employee Login(string Email, string password);
        public dynamic ShowEmployee(int id);
        public bool UpdateEmployee(int id,EditEmployee editEmployee);
    }
}
