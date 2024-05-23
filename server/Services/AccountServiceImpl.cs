using server.Data;
using server.Models;

namespace server.Services
{
    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext _dbContext;
        public AccountServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Employee Login(string email, string password)
        {
            try
            {
                var employeeLogin = _dbContext.Employees.FirstOrDefault(d => d.Email == email );
                if(employeeLogin != null && BCrypt.Net.BCrypt.Verify(password,employeeLogin.Password))
                {
                    var user = new Employee
                    {
                        Id = employeeLogin.Id,
                        FullName = employeeLogin.FullName,
                        Email = employeeLogin.Email,
                        Role = employeeLogin.Role,
                        IdentityCode = employeeLogin.IdentityCode,
                        IdShowroom = employeeLogin.IdShowroom,

                    };
                    return user;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        public dynamic ShowEmployee(int id)
        {
            return _dbContext.Employees.Where(d => d.Id == id).Select(d => new
            {
                FullName = d.FullName,
                Email = d.Email,
                Address = d.Address,
                Phone = d.Phone,
                IdentityCode = d.IdentityCode,

            }).FirstOrDefault();
        }

        public bool UpdateEmployee(int id, EditEmployee editEmployee)
        {
            try
            {
                var employee = _dbContext.Employees.Find(id);
                if (employee != null)
                {
                    employee.FullName = editEmployee.FullName;
                    employee.Email = editEmployee.Email;
                    employee.Address = editEmployee.Address;
                    employee.Phone = editEmployee.Phone;
                    employee.IdentityCode = editEmployee.IdentityCode;
                }
                return _dbContext.SaveChanges()>0;

            }
            catch
            {
                return false;
            }
        }
    }
}
