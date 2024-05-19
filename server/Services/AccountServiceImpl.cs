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
        public Employee Login(string Email, string password)
        {
            try
            {
                var EmployeeLogin = _dbContext.Employees.FirstOrDefault(d => d.Email == Email );
                if(EmployeeLogin != null && BCrypt.Net.BCrypt.Verify(password,EmployeeLogin.Password))
                {
                    var user = new Employee
                    {
                        Id = EmployeeLogin.Id,
                        FullName = EmployeeLogin.FullName,
                        Email = EmployeeLogin.Email,
                        Role = EmployeeLogin.Role,
                        IdentityCode = EmployeeLogin.IdentityCode,
                        IdShowroom = EmployeeLogin.IdShowroom,

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
                var Employee = _dbContext.Employees.Find(id);
                if (Employee != null)
                {
                    Employee.FullName = editEmployee.FullName;
                    Employee.Email = editEmployee.Email;
                    Employee.Address = editEmployee.Address;
                    Employee.Phone = editEmployee.Phone;
                    Employee.IdentityCode = editEmployee.IdentityCode;
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
