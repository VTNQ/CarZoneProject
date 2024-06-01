using server.Data;

namespace server.Services
{
    public interface EmployeeService
    {
        Task<bool> CreateEmployee(AddEmployee addEmployee);
        Task<IEnumerable<dynamic>> GetEmployee(int idShowRoom);
        public bool UpdateEmployee(int id,UpdateEmployee updateEmployee);
        public bool ResetPasswordEmployee(int id);
        public dynamic FindByID(int id);
        Task<IEnumerable<dynamic>> ShowContract(int id);
       Task<int> CountEmployee(string role);
    }
}
