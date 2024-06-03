using server.Data;
using server.Models;
using System.Net.Mail;
using System.Net;
using System;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;


namespace server.Services
{
    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext _dbContext;
        public AccountServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public string GenerateRandomString(int length)
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
            Random random = new Random();
            char[] StringChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(chars.Length);
                StringChars[i] = chars[randomIndex];
            }
            return new string(StringChars);
        }
        public bool addAdmin(AddAdmin addAdmin)
        {
            if(_dbContext.Employees.Any(c=>c.Email == addAdmin.Email && c.IdentityCode == addAdmin.IdentityCode)) {
                return false;
            }
            string Password = GenerateRandomString(8);
            var admin = new Employee()
            {
                FullName = addAdmin.FullName,
                Email = addAdmin.Email,
                IdentityCode = addAdmin.IdentityCode,
                Address = addAdmin.Address,
                Phone = addAdmin.Phone,
                Role = "Admin",
                Password = BCrypt.Net.BCrypt.HashPassword(Password),
                IdShowroom = addAdmin.IdShowroom,
            };
            SendEmail(addAdmin.Email, "Reset Information", $"FullName :{addAdmin.FullName}\n Password:{Password}");
            _dbContext.Employees.Add(admin);
            return _dbContext.SaveChanges()>0;
        }public bool addWarehouse(AddAccountWarehouse addWarehouse)
        {
            if(_dbContext.Employees.Any(c=>c.Email == addWarehouse.Email && c.IdentityCode == addWarehouse.IdentityCode)) {
                return false;
            }
            string Password = GenerateRandomString(8);
            var admin = new Employee()
            {
                FullName = addWarehouse.FullName,
                Email = addWarehouse.Email,
                IdentityCode = addWarehouse.IdentityCode,
                Address = addWarehouse.Address,
                Phone = addWarehouse.Phone,
                Role = "WareHouse",
                Password = BCrypt.Net.BCrypt.HashPassword(Password),
                IdWarehouse = addWarehouse.IdWarehouse,
            };
            //SendEmail(addAdmin.Email, "Reset Information", $"FullName :{addAdmin.FullName}\n Password:{Password}");
            _dbContext.Employees.Add(admin);
            return _dbContext.SaveChanges()>0;
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

        public dynamic getAdmin()
        {
            return _dbContext.Employees.Where(d=>d.Role == "Admin").Select(c => new
            {
                Email = c.Email,
                IdentityCode = c.IdentityCode,
                FullName =c.FullName,
                Address = c.Address,
                Phone = c.Phone,
                NameShowroom = _dbContext.Showrooms.Where(d=>d.Id == c.IdShowroom).Select(e => new
                {
                    NameShowroom = e.Name
                }).FirstOrDefault(),
            }).ToList();
        }public dynamic getAccountWarehouse()
        {
            return _dbContext.Employees.Where(d => d.Role == "WareHouse").Select(c => new
            {
                Email = c.Email,
                IdentityCode = c.IdentityCode,
                FullName =c.FullName,
                Address = c.Address,
                Phone = c.Phone,
                NameWarehouse = _dbContext.Warehouses.Where(d => d.Id == c.IdWarehouse).Select(e => new
                {
                    NameWarehouse = e.Name
                }).FirstOrDefault(),
                NameCountry = _dbContext.Countries.Where(d=>d.Id == c.IdWarehouse).Select(e => new
                {
                    NameCountry = e.Name
                }).FirstOrDefault(),
            }).ToList();
        }

        public async Task<Employee> Login(string email, string password,HttpResponse response)
        {
            try
            {
                var employeeLogin = await _dbContext.Employees.FirstOrDefaultAsync(d => d.Email == email);

                if (employeeLogin != null && BCrypt.Net.BCrypt.Verify(password, employeeLogin.Password))
                {
                    var user = new Employee
                    {
                        Id = employeeLogin.Id,
                        FullName = employeeLogin.FullName,
                        Email = employeeLogin.Email,
                        Role = employeeLogin.Role,
                        IdentityCode = employeeLogin.IdentityCode,
                        IdShowroom = employeeLogin.IdShowroom,
                        IdWarehouse = employeeLogin.IdWarehouse,

                    };
                    var userData = JsonConvert.SerializeObject(user);
                    response.Cookies.Append("UserSession", userData, new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(15),
                        HttpOnly = true,
                        Secure = true
                    });
                    return user;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        public async Task<dynamic> ShowEmployee(int id)
        {
            return await _dbContext.Employees.Where(d => d.Id == id).Select(d => new
            {
                FullName = d.FullName,
                Email = d.Email,
                Address = d.Address,
                Phone = d.Phone,
                IdentityCode = d.IdentityCode,

            }).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateEmployee(int id, EditEmployee editEmployee)
        {
            using (var traction = await _dbContext.Database.BeginTransactionAsync())
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
                    await _dbContext.SaveChangesAsync();
                    await traction.CommitAsync();
                    return true;

                }
                catch
                {
                    await traction.RollbackAsync();
                    return false;
                }
            }
              
        }
    }
}
