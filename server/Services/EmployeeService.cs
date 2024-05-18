using server.Data;

namespace server.Services
{
    public interface EmployeeService
    {
        public bool CreateEmployee(AddEmployee addEmployee);
        public dynamic GetEmployee(int idShowRoom);
        public bool UpdateEmployee(int id,UpdateEmployee updateEmployee);
        public bool ResetPasswordEmployee(int id);
        public dynamic FindByID(int id);
    }
}
