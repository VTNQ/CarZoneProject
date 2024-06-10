using server.Data;
using server.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

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
        public async Task<bool> CreateEmployee(AddEmployee addEmployee)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    string Password = GenerateRandomString(8);

                    var EmployeeAdd = new Employee
                    {
                        FullName = addEmployee.FullName,
                        Email = addEmployee.Email,
                        Address = addEmployee.Address,
                        Password = BCrypt.Net.BCrypt.HashPassword(Password),
                        Phone = addEmployee.Phone,
                        Role = "Employee",
                        IdentityCode = addEmployee.IdentityCode,
                        IdShowroom = addEmployee.IdShowroom,
                    };
                    SendEmail(addEmployee.Email, "Create Account", $"FullName :{addEmployee.FullName}\n Password:{Password}");
                    databaseContext.Employees.Add(EmployeeAdd);
                    await databaseContext.SaveChangesAsync();
                    await traction.CommitAsync();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
                
        }
    
        public async Task<IEnumerable<dynamic>> GetEmployee(int idShowRoom)
        {
            return databaseContext.Employees.Where(d => d.IdShowroom == idShowRoom && d.Role== "Employee").OrderByDescending(d=>d.Id).Select(d => new
            {
                id=d.Id,
                FullName=d.FullName,
                Email=d.Email,
                Address=d.Address,
                Phone=d.Phone,
                IdentityCode=d.IdentityCode,

            }).ToList();
        }

        public bool UpdateEmployee(int id, UpdateEmployee updateEmployee)
        {
            try
            {
                var Employee = databaseContext.Employees.Find(id);
                if (Employee != null)
                {
                    Employee.FullName = updateEmployee.FullName;
                    Employee.Email = updateEmployee.Email;
                    Employee.Address = updateEmployee.Address;
                    Employee.Phone = updateEmployee.Phone;
                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
         
        }
        private void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.gmail.com"))
            {
                client.Port = 587;
                client.Credentials = new NetworkCredential("tranp6648@gmail.com", "czvy qzyc vpes whkj");
                client.EnableSsl = true;
                var message = new MailMessage
                {
                    From = new MailAddress("tranp6648@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                message.To.Add(to);
                client.Send(message);
            }
        }

        public bool ResetPasswordEmployee(int id)
        {
            try
            {
                var Employee=databaseContext.Employees.Find(id);
                string Pass = GenerateRandomString(8);
                if (Employee != null)
                {
                    
                    Employee.Password = BCrypt.Net.BCrypt.HashPassword(Pass);
                    SendEmail(Employee.Email, "Reset Information", $"FullName :{Employee.FullName}\n Password:{Pass}");
                }
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic FindByID(int id)
        {
            try
            {
                return databaseContext.Employees.Where(d=>d.Id==id).Select(d=>new
                {
                    idshowroom=d.IdShowroom
                }).First();
            }
            catch (Exception e)
            {
                return "Not Exist";
            }
        }
        public async Task<IEnumerable<dynamic>> ShowContract(int id)
        {
            var contracts=databaseContext.Contracts.Where(d => d.IdOrderNavigation.IdEmployee == id).Select(d => new
            {
                Condition = d.Condition,
                CreateDate = d.CreatedDate,
            }).FirstOrDefault();
            if (contracts != null)
            {
                return new List<dynamic> { contracts};
            }
            else
            {
                return new List<dynamic> { new {Message="No Data"}};
            }
            
        }

        public async Task<int> CountEmployee(string role)
        {
            return await databaseContext.Employees.Where(d => d.Role == "Employee").CountAsync();
        }
    }
}
