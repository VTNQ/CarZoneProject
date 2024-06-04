using server.Data;
using server.Models;

namespace server.Services
{
    public interface AccountService
    {
        Task<Employee> Login(string Email, string password, HttpResponse response);
        Task<dynamic> ShowEmployee(int id);
        Task<bool> UpdateEmployee(int id,EditEmployee editEmployee);
        public bool addAdmin (AddAdmin addAdmin);
        public bool addWarehouse(AddAccountWarehouse addWarehouse);

        public dynamic getAccountWarehouse();
        public dynamic getAdmin();
    }
}
