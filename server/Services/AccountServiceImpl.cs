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
    }
}
