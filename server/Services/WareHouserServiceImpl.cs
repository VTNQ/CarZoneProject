using server.Data;
using server.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<dynamic>> ShowCarWareHouse(int idShowroom)
        {
            return databaseContext.Cars.Where(d => databaseContext.SubWarehouseShowrooms.Any(m=>m.IdShowroom==idShowroom && m.IdCar==d.Id)).Select(d => new
            {
                id=d.Id,
                Name=d.Name,
                Model=d.IdModelNavigation.Name,
                ColorInSide=d.IdColorInSideNavigation.Name,
                ColorOutSide=d.IdColorOutSideNavigation.Name,
                NumberofSeat=d.NumberOfSeat,
                Version=d.IdVersionNavigation.ReleaseYear,
                Price=d.Price,
                Weight=d.Weight,    
                SpeedAbillity=d.SpeedAbility,
                MaxSpeed=d.MaxSpeed,
                Form=d.IdFormNavigation.Name,
                HeightBetween=d.HeightBetween,
                Condition=d.Condition,
                Drivertrain=d.Drivertrain,
                Fuetype=d.FuelType,
                Engine=d.Engine,
                MotorSize=d.MotorSize,
                Bhp=d.Bhp,
                Picture=databaseContext.Photos.Where(m=>m.IdCar==d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowCar()
        {
            return databaseContext.Cars.Select(d => new
            {
                id = d.Id,
                name = d.Name,
                price = d.Price,
                bhp = d.Bhp,
                MotorSize = d.MotorSize,
                FueType = d.FuelType,
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
                idshowRoom = databaseContext.SubWarehouseShowrooms.Where(m => m.IdCar == d.Id).Select(m => new
                {
                    idshowroomCar=m.IdShowroom,
                }).ToList(),
            }).ToList();
        }

        public dynamic ShowBranch()
        {
            return databaseContext.Brands.Select(d => new
            {
                id = d.Id,
                name = d.Name,
            }).ToList();
        }

        public dynamic ShowModel()
        {
            return databaseContext.Models.OrderByDescending(d => d.Id).Select(d => new
            {
                id = d.Id,
                name = d.Name,
                nameBrand = d.IdBrandNavigation.Name,
                idBrand=d.IdBrand,
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
                DriveTrain = d.Drivertrain,
                Engine = d.Engine,
                Transmission = d.Transmission,
                NumberSeat = d.NumberOfSeat,
                Condition = d.Condition,
                idModel = d.IdModel,
                Branch = d.IdModelNavigation.IdBrandNavigation.Id,
                Mileage = d.Mileage,
                DateAccept = d.DateAccept.Year,
                Model = d.IdModelNavigation.Name,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).FirstOrDefault();
        }

        public dynamic ShowListPicture(int id)
        {
            return databaseContext.Photos.Where(d => d.IdCar == id).Select(d => new
            {
                id = d.Id,
                Link = configuration["ImageUrl"] + d.Link,
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

        public dynamic ShowRoom(int id)
        {
            return databaseContext.Showrooms.Where(d => databaseContext.Warehouses.Any(m => m.Id == id && m.IdCountry == d.IdDistrictNavigation.IdCityNavigation.IdCountry)).Select(d => new
            {
                id = d.Id,
                Name = d.Name,
                District = d.IdDistrictNavigation.Name,
            }).ToList();
        }



        public async Task<bool> CreateShowRoom(CreateCarShowRoom createCarShowRoom)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    foreach (var carID in createCarShowRoom.idCar)
                    {
                        var WareHouseCar = databaseContext.SubWarehouseCars.FirstOrDefault(d => d.IdCar == carID);

                        var SubWareHouseShowRoom = new SubWarehouseShowroom
                        {
                            IdShowroom = createCarShowRoom.IdShowRoom,
                            IdCar = carID,
                        };
                        databaseContext.SubWarehouseShowrooms.Add(SubWareHouseShowRoom);
                        if (WareHouseCar != null)
                        {
                            databaseContext.SubWarehouseCars.Remove(WareHouseCar);
                        }
                    }
                    await databaseContext.SaveChangesAsync();
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

        public async Task<IEnumerable<dynamic>> GetCartoShowRoom(int id)
        {
            return databaseContext.Showrooms.Where(d=>databaseContext.Warehouses.Any(m=>m.IdCountry==d.IdDistrictNavigation.IdCityNavigation.IdCountry && m.Id==id)).OrderByDescending(d=>d.Id).Select(d => new
            {
                id = d.Id,
                Name = d.Name,
                TotalCar = databaseContext.SubWarehouseShowrooms.Where(m => m.IdShowroom == d.Id).Count(),
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> DetailCartoShowRoom(int id)
        {
            return databaseContext.Cars.Where(d => databaseContext.SubWarehouseShowrooms.Any(m => m.IdShowroom == id && m.IdCar==d.Id)).Select(d => new
            {
                id = d.Id,
                TotalCar = databaseContext.SubWarehouseShowrooms.Where(e => e.IdCar == d.Id).Count(),
                Name = d.Name,
                Model = d.IdModelNavigation.Name,
                ColorInSide = d.IdColorInSideNavigation.Name,
                brand=d.IdModelNavigation.IdBrandNavigation.Name,
                ColorOutSide = d.IdColorOutSideNavigation.Name,
                NumberofSeat = d.NumberOfSeat,
                Version = d.IdVersionNavigation.ReleaseYear,
                Price = d.Price,
                Weight = d.Weight,
                SpeedAbillity = d.SpeedAbility,
                Transmission=d.Transmission,
                MaxSpeed = d.MaxSpeed,
                Form = d.IdFormNavigation.Name,
                HeightBetween = d.HeightBetween,
                Condition = d.Condition,
                Drivertrain = d.Drivertrain,
                Fuetype = d.FuelType,
                Engine = d.Engine,
                MotorSize = d.MotorSize,
                Mileage = d.Mileage,
                Bhp = d.Bhp,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> GetWareHouseCar(int id)
        {
            return databaseContext.Warehouses.Where(d=>d.Id==id).Select(d => new
            {
                id = d.Id,
                Name = d.Name,
                TotalCar = databaseContext.SubWarehouseCars.Where(m => m.IdWarehouse == d.Id).Count(),
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> DetailWareHouseCar(int id)
        {
            return databaseContext.Cars.Where(d => databaseContext.SubWarehouseCars.Any(m => m.IdWarehouse == id && d.Id==m.IdCar)).Select(d => new
            {
                id = d.Id,
                TotalCar = databaseContext.SubWarehouseCars.Where(e => e.IdCar == d.Id).Count(),
                Name = d.Name,
                Model = d.IdModelNavigation.Name,
                brand = d.IdModelNavigation.IdBrandNavigation.Name,
                ColorInSide = d.IdColorInSideNavigation.Name,
                ColorOutSide = d.IdColorOutSideNavigation.Name,
                NumberofSeat = d.NumberOfSeat,
                Version = d.IdVersionNavigation.ReleaseYear,
                Price = d.Price,
                Weight = d.Weight,
                SpeedAbillity = d.SpeedAbility,
                MaxSpeed = d.MaxSpeed,
                Form = d.IdFormNavigation.Name,
                HeightBetween = d.HeightBetween,
                Condition = d.Condition,
                Drivertrain = d.Drivertrain,
                Fuetype = d.FuelType,
                Engine = d.Engine,
                MotorSize = d.MotorSize,
                Bhp = d.Bhp,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();
        }


        public bool updateModel(int id, UpdateModel updateModel)
        {
            var model = databaseContext.Models.Find(id);
            if (model != null)
            {
                model.Name = updateModel.Name;
                model.IdBrand = updateModel.IdBrand;
            }
            return databaseContext.SaveChanges() > 0;
        }

        public dynamic findModelByBrand(int idBrand)
        {
            try
            {
                return databaseContext.Models.Where(c => c.IdBrand == idBrand).Select(c => new
                {
                    Id = c.Id,
                    Name = c.Name,
                }).ToList();
            }
            catch
            {
                return false;
            }
        }
            public async Task<IEnumerable<dynamic>> CompareCar(int id)
            {
                return databaseContext.Cars.Where(d => d.Id != id).Select(d => new
                {
                    id = d.Id,
                    TotalCar = databaseContext.SubWarehouseCars.Where(e => e.IdCar == id).Count(),
                    Name = d.Name,
                    Model = d.IdModelNavigation.Name,
                    ColorInSide = d.IdColorInSideNavigation.Name,
                    ColorOutSide = d.IdColorOutSideNavigation.Name,
                    NumberofSeat = d.NumberOfSeat,
                    Version = d.IdVersionNavigation.ReleaseYear,
                    Price = d.Price,
                    Weight = d.Weight,
                    SpeedAbillity = d.SpeedAbility,
                    MaxSpeed = d.MaxSpeed,
                    Form = d.IdFormNavigation.Name,
                    HeightBetween = d.HeightBetween,
                    Condition = d.Condition,
                    Drivertrain = d.Drivertrain,
                    Fuetype = d.FuelType,
                    Engine = d.Engine,
                    MotorSize = d.MotorSize,
                    Bhp = d.Bhp,
                    Mileage = d.Mileage,
                    DateAccept = d.DateAccept.Year,
                    Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                    {
                        PictureLink = configuration["ImageUrl"] + m.Link,
                    }).FirstOrDefault(),
                }).ToList();
            }

            public async Task<IEnumerable<dynamic>> GetCarToWareHouse(int id)
            {
                return databaseContext.Cars.Where(d => databaseContext.SubWarehouseCars.Any(m => m.IdCar == d.Id && m.IdWarehouse==id)).Select(d => new
                {
                    id = d.Id,

                    Name = d.Name,
                    Model = d.IdModelNavigation.Name,
                    ColorInSide = d.IdColorInSideNavigation.Name,
                    ColorOutSide = d.IdColorOutSideNavigation.Name,
                    NumberofSeat = d.NumberOfSeat,
                    Version = d.IdVersionNavigation.ReleaseYear,
                    Price = d.Price,
                    Weight = d.Weight,
                    SpeedAbillity = d.SpeedAbility,
                    MaxSpeed = d.MaxSpeed,
                    Form = d.IdFormNavigation.Name,
                    HeightBetween = d.HeightBetween,
                    Condition = d.Condition,
                    Drivertrain = d.Drivertrain,
                    Fuetype = d.FuelType,
                    Engine = d.Engine,
                    MotorSize = d.MotorSize,
                    Bhp = d.Bhp,
                    Mileage = d.Mileage,
                    DateAccept = d.DateAccept.Year,
                    Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                    {
                        PictureLink = configuration["ImageUrl"] + m.Link,
                    }).FirstOrDefault(),
                }).ToList();

            }

        public async Task<IEnumerable<dynamic>> CarWareHouse(int idshowroom)
        {
            return databaseContext.Cars.Where(d => databaseContext.Showrooms.Any(a => a.Id == idshowroom && databaseContext.SubWarehouseCars.Any(e => e.IdCar == d.Id && a.IdDistrictNavigation.IdCityNavigation.IdCountry == e.IdWarehouseNavigation.IdCountry))).Select(d => new
            {
                id=d.Id,
                Name=d.Name,
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
                Quality=databaseContext.SubWarehouseCars.Where(a=>a.IdCar==d.Id).Count(),
            }).ToList();
        }

        public dynamic GetShowRoom(int id)
        {
            return databaseContext.Showrooms.Where(d=>d.IdDistrict==id).Select(d => new
            {
                id = d.Id,
                Name = d.Name,
                District = d.IdDistrictNavigation.Name,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowWareHouse()
        {
            return databaseContext.Warehouses.Select(d => new
            {
                id = d.Id,
                Name = d.Name,
            }).ToList();
        }
    }
    
        
    
}