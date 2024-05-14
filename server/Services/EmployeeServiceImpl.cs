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

        public bool CreateEmployee(AddEmployee addEmployee)
        {
            try
            {

                var EmployeeAdd = new Employee
                {
                    FullName = addEmployee.FullName,
                    Email = addEmployee.Email,
                    Address = addEmployee.Address,
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
