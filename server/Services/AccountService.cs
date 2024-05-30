using server.Data;
using server.Models;

namespace server.Services
{
    public interface AccountService
    {
        public Employee Login(string Email, string password);
        public dynamic ShowEmployee(int id);
        public bool UpdateEmployee(int id,EditEmployee editEmployee);
        public bool addAdmin (AddAdmin addAdmin);
        public bool addWarehouse(AddAccountWarehouse addWarehouse);

        public dynamic getAccountWarehouse();
        public dynamic getAdmin();
    }
}
