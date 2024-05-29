using server.Data;
using server.Models;
using System.Data.SqlTypes;

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
                var employeeLogin = _dbContext.Employees.FirstOrDefault(d => d.Email == email);

                Console.WriteLine(employeeLogin);
                
                return null;
            }
            catch (SqlNullValueException ex)
            {
                // Log the SqlNullValueException details for debugging
                Console.WriteLine($"SqlNullValueException: {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                // Log the general exception details for debugging
                Console.WriteLine($"Exception: {ex.Message}");
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
