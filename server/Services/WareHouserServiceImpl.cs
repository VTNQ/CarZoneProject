using server.Data;
using server.Models;
using System.Net.Mail;
using System.Net;

namespace server.Services
{
    public class WareHouserServiceImpl : WareHouserService
    {
        private server.Models.DatabaseContext databaseContext;
        private IConfiguration configuration;
        public WareHouserServiceImpl(server.Models.DatabaseContext databaseContext, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.configuration = configuration;
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

        public dynamic ShowCarWareHouse(int idShowroom)
        {
            return databaseContext.SubWarehouseShowrooms.Where(d => d.IdShowroom == idShowroom).Select(d => new
            {
                id=d.IdCarNavigation.Id,
                Name=d.IdCarNavigation.Name,
                Model=d.IdCarNavigation.IdModelNavigation.Name,
                ColorInSide=d.IdCarNavigation.IdColorInSideNavigation.Name,
                ColorOutSide=d.IdCarNavigation.IdColorOutSideNavigation.Name,
                NumberofSeat=d.IdCarNavigation.NumberOfSeat,
                Version=d.IdCarNavigation.IdVersionNavigation.ReleaseYear,
                Price=d.IdCarNavigation.Price,
                Weight=d.IdCarNavigation.Weight,    
                SpeedAbillity=d.IdCarNavigation.SpeedAbility,
                MaxSpeed=d.IdCarNavigation.MaxSpeed,
                Form=d.IdCarNavigation.IdFormNavigation.Name,
                HeightBetween=d.IdCarNavigation.HeightBetween,
                Picture=databaseContext.Photos.Where(m=>m.IdCar==d.IdCarNavigation.Id && m.Status == 0).Select(m => new
                {
                    PictureLink= configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();    
        }

        public dynamic ShowCar()
        {
            return databaseContext.Cars.Select(d => new
            {
                id=d.Id,
                name=d.Name,
                price=d.Price,
                bhp=d.Bhp,
                MotorSize=d.MotorSize,
                FueType=d.FuelType,
                Engine=d.Engine,
                Transmission=d.Transmission,
                NumberSeat=d.NumberOfSeat,
                Condition=d.Condition,
                idModel=d.IdModel,
                Branch=d.IdModelNavigation.IdBrandNavigation.Id,
                Mileage=d.Mileage,
                DateAccept=d.DateAccept.Year,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();
        }

        public dynamic ShowBranch()
        {
           return databaseContext.Brands.Select(d => new
           {
               id=d.Id,
               name=d.Name,
           }).ToList();
        }

        public dynamic ShowModel()
        {
            return databaseContext.Models.Select(d => new
            {
                id = d.Id,
                name = d.Name,
            }).ToList();
        }

        public dynamic DetailCar(int id)
        {
            return databaseContext.Cars.Where(d => d.Id == id).Select(d => new
            {
                id = d.Id,
                name = d.Name,
                price = d.Price,
                bhp = d.Bhp,
                MotorSize = d.MotorSize,
                FueType = d.FuelType,
                DriveTrain=d.Drivertrain,
                Engine = d.Engine,
                Transmission = d.Transmission,
                NumberSeat = d.NumberOfSeat,
                Condition = d.Condition,
                idModel = d.IdModel,
                Branch = d.IdModelNavigation.IdBrandNavigation.Id,
                Mileage = d.Mileage,
                DateAccept = d.DateAccept.Year,
                Model=d.IdModelNavigation.Name,
            }).FirstOrDefault();
        }

        public dynamic ShowListPicture(int id)
        {
            return databaseContext.Photos.Where(d => d.IdCar == id).Select(d => new
            {
                id = d.Id,
                Link = configuration["ImageUrl"]+d.Link,
            }).ToList();
        }

        public bool SendMessage(SendMessage message)
        {
            try
            {
                SendEmail(message.Email, "Send Information", $"Name:{message.Name} \n Car:{message.Car} \n Message:{message.Message}");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowLatestCar()
        {
            return databaseContext.Cars.OrderByDescending(d => d.Id).Select(d => new
            {
                id = d.Id,
                name = d.Name,
                price = d.Price,
                bhp = d.Bhp,
                MotorSize = d.MotorSize,
                FueType = d.FuelType,
                DriveTrain = d.Drivertrain,
                Engine = d.Engine,
                Transmission = d.Transmission,
                NumberSeat = d.NumberOfSeat,
                Condition = d.Condition,
                idModel = d.IdModel,
                Branch = d.IdModelNavigation.IdBrandNavigation.Id,
                Mileage = d.Mileage,
                DateAccept = d.DateAccept.Year,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
                Model = d.IdModelNavigation.Name,
            }).Take(3).ToList();
        }
    }
}
