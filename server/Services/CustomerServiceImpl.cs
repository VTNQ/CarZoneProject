using Microsoft.AspNetCore.Hosting;
using server.Data;
using server.Helper;
using server.Models;

namespace server.Services
{
    public class CustomerServiceImpl : CustomerService
    {
        private IWebHostEnvironment env;
        private DatabaseContext DatabaseContext;
        private IConfiguration configuration;
        public CustomerServiceImpl(IWebHostEnvironment env,DatabaseContext databaseContext,IConfiguration configuration)
        {
            this.env = env;
            DatabaseContext = databaseContext;
            this.configuration = configuration;
        }
        public bool AddCustomer(AddCustomer addCustomer)
        {
            try
            {
                var FileName = FileHelper.GenerateFileName(addCustomer.Sign.FileName);
                var path = Path.Combine(env.WebRootPath, "images", FileName);
                using(var fileStream=new FileStream(path,FileMode.Create))
                {
                    addCustomer.Sign.CopyTo(fileStream);
                }
                var Customer = new Customer
                {
                    FullName = addCustomer.FullName,
                    Address = addCustomer.Address,
                    Dob = addCustomer.Dob,
                    Phone = addCustomer.Phone,
                    Email = addCustomer.Email,
                    IndentityCode = addCustomer.IndentityCode,
                    Sign = FileName,
                };
                DatabaseContext.Customers.Add(Customer);
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;   
            }
        }

        public dynamic ShowCustomer()
        {
            return DatabaseContext.Customers.Select(d => new
            {
                Id=d.Id,
                FullName=d.FullName,
                Address=d.Address,
                Dob=d.Dob,
                Phone=d.Phone,
                Email=d.Email,
                IndentityCode=d.IndentityCode,
                Sign= configuration["ImageUrl"]+d.Sign,
            }).ToList();
        }

        public bool UpdateCustomer(int id,UpdateCustomer updateCustomer)
        {
            try
            {
                var Customer = DatabaseContext.Customers.Find(id);
                if(Customer !=null)
                {
                    Customer.Address = updateCustomer.Address;
                    Customer.FullName = updateCustomer.FullName;
                    Customer.Dob = updateCustomer.Dob;
                    Customer.Phone = updateCustomer.Phone;
                    Customer.Email = updateCustomer.Email;
                }
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
