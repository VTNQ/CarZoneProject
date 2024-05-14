using server.Data;
using server.Models;

namespace server.Services
{
    public class EmployeeServiceImpl : EmployeeService
    {
        private DatabaseContext databaseContext;
        public EmployeeServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public string GenerateRandomString(int length)
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
            Random random= new Random();
            char[]StringChars=new char[length];
            for(int i = 0; i < length; i++)
            {
                int randomIndex=random.Next(chars.Length);
                StringChars[i] = chars[randomIndex];
            }
            return new string(StringChars);
        }
        public bool CreateEmployee(AddEmployee addEmployee)
        {
            try
            {

                var EmployeeAdd = new Employee
                {
                    FullName = addEmployee.FullName,
                    Email = addEmployee.Email,
                    Address = addEmployee.Address,
                    Password=GenerateRandomString(8),
                    Phone = addEmployee.Phone,
                    IdentityCode = addEmployee.IdentityCode,
                    IdShowroom = addEmployee.IdShowroom,
                };
                databaseContext.Employees.Add(EmployeeAdd);
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }
    
    }
}
