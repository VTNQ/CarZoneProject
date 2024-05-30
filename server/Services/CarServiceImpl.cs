using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper;
using server.Models;

namespace server.Services
{
    public class CarServiceImpl : CarService
    {
        private IWebHostEnvironment env;
        private DatabaseContext databaseContext;
        private IConfiguration configuration;
        public CarServiceImpl(IWebHostEnvironment env, DatabaseContext databaseContext, IConfiguration configuration)
        {
            this.env = env;
            this.databaseContext = databaseContext;
            this.configuration = configuration;
        }

        public bool addCar([FromForm] AddCar addCar)
        {
            using var transaction = databaseContext.Database.BeginTransaction();
            try
            {
                var car = new Car()
                {

                    Name = addCar.Name,
                    IdModel = addCar.IdModel,
                    Condition = addCar.Condition,
                    Engine = addCar.Engine,
                    Drivertrain = addCar.Drivertrain,
                    FuelType = addCar.FuelType,
                    MotorSize = addCar.MotorSize,
                    Bhp = addCar.Bhp,
                    IdColorOutSide = addCar.IdColorOutSide,
                    IdColorInSide = addCar.IdColorInSide,
                    Length = addCar.Length,
                    Height = addCar.Height,
                    Width = addCar.Width,
                    NumberOfSeat = addCar.NumberOfSeat,
                    Mileage = addCar.Mileage,
                    Transmission = addCar.Transmission,
                    IdVersion = addCar.IdVersion,
                    IdForm = addCar.IdForm,
                    Price = addCar.Price,
                    FuelConsumption = addCar.FuelConsumption,
                    Weight = addCar.Weight,
                    SpeedAbility = addCar.SpeedAbility,
                    MaxSpeed = addCar.MaxSpeed,
                    OffRoad = addCar.OffRoad,
                    DateAccept = DateOnly.FromDateTime(DateTime.Now),
                    HeightBetween = addCar.HeightBetween,
                };

                databaseContext.Cars.Add(car);
                databaseContext.SaveChanges();

                // Save Main Photo
                var mainPhotoFileName = FileHelper.GenerateFileName(addCar.MainPhoto.FileName);
                var mainPhotoPath = Path.Combine(env.WebRootPath, "images", mainPhotoFileName);
                using (var fileStream = new FileStream(mainPhotoPath, FileMode.Create))
                {
                    addCar.MainPhoto.CopyTo(fileStream);
                }

                var mainPhoto = new Photo()
                {
                    Link = mainPhotoFileName,
                    Status = 0,
                    IdCar = car.Id
                };

                databaseContext.Photos.Add(mainPhoto);

                // Save Sub Photos
                if (addCar.SubPhotos != null && addCar.SubPhotos.Count > 0)
                {
                    foreach (var subPhoto in addCar.SubPhotos)
                    {
                        var subPhotoFileName = FileHelper.GenerateFileName(subPhoto.FileName);
                        var subPhotoPath = Path.Combine(env.WebRootPath, "images", subPhotoFileName);
                        using (var fileStream = new FileStream(subPhotoPath, FileMode.Create))
                        {
                            subPhoto.CopyTo(fileStream);
                        }

                        var photo = new Photo()
                        {
                            Link = subPhotoFileName,
                            Status = 1,
                            IdCar = car.Id
                        };
                        databaseContext.Photos.Add(photo);
                    }
                }

                databaseContext.SaveChanges();
                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                // Log exception for debugging
                Console.WriteLine($"Error: {ex.Message}, Inner Exception: {ex.InnerException?.Message}");
                throw; // Rethrow the exception to be caught by the global exception handler
            }
        }
        public void DeletePhoto(string photo)
        {
            try
            {
                string path = Path.Combine(env.WebRootPath, "images", photo);
                if (File.Exists(path))
                {
                    File.Delete(path);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file '{photo}': {ex.Message}");
            }
        }
        public async Task<bool> deleteCar(int carId)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Car = databaseContext.Cars.Find(carId);
                    var Photo=databaseContext.Photos.Where(d=>d.IdCar == carId).ToList();
                    if (Car != null)
                    {
                        if (Photo.Any())
                        {
                           foreach(var photo in Photo)
                            {
                                DeletePhoto(photo.Link);
                            }
                            databaseContext.Photos.RemoveRange(Photo);
                        }
                        databaseContext.Cars.Remove(Car);
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

        public dynamic findCarById(int carId)
        {
            return databaseContext.Cars.Where(c=>c.Id == carId).Select(c => new
            {
                Name = c.Name,
                NameModel = c.IdModelNavigation.Name,
                Condition = c.Condition,
                Engine = c.Engine,
                Drivertrain = c.Drivertrain,
                FuelType = c.FuelType,
                MotorSize = c.MotorSize,
                Bhp = c.Bhp,
                IdColorOutSide = c.IdColorOutSideNavigation.Name,
                IdColorInSide = c.IdColorInSideNavigation.Name,
                Length = c.Length,
                Height = c.Height,
                Width = c.Width,
                NumberOfSeat = c.NumberOfSeat,
                Mileage = c.Mileage,
                Transmission = c.Transmission,
                NameVersion = c.IdVersionNavigation.ReleaseYear,
                NameForm = c.IdFormNavigation.Name,
                NameBrand = c.IdModelNavigation.IdBrandNavigation.Name,
                Price = c.Price,
                FuelConsumption = c.FuelConsumption,
                Weight = c.Weight,
                SpeedAbility = c.SpeedAbility,
                MaxSpeed = c.MaxSpeed,
                OffRoad = c.OffRoad,
                DateAccept = c.DateAccept,
                HeightBetween = c.HeightBetween,
                MainPhoto = databaseContext.Photos
                        .Where(p => p.IdCar == c.Id && p.Status == 0)
                        .Select(p => new
                        {
                            Link = configuration["ImageUrl"] + p.Link
                        }).FirstOrDefault(),
                SubPhotos = databaseContext.Photos
                        .Where(p => p.IdCar == c.Id && p.Status != 0)
                        .Select(p => new
                        {
                            Link = configuration["ImageUrl"] + p.Link
                        }).ToList(),
            }).ToList();
        }

        public dynamic showCar()
        {
            return databaseContext.Cars.Select(c => new
            {
                id=c.Id,
                Name = c.Name,
                NameModel = c.IdModelNavigation.Name,
                Condition = c.Condition,
                Engine = c.Engine,
                Drivertrain = c.Drivertrain,
                FuelType = c.FuelType,
                MotorSize = c.MotorSize,
                Bhp = c.Bhp,
                IdColorOutSide = c.IdColorOutSide,
                IdColorInSide = c.IdColorInSide,
                Length = c.Length,
                Height = c.Height,
                Width = c.Width,
                NumberOfSeat = c.NumberOfSeat,
                Mileage = c.Mileage,
                Transmission = c.Transmission,
                NameVersion = c.IdVersionNavigation.ReleaseYear,
                NameForm = c.IdFormNavigation.Name,
                NameBrand = c.IdModelNavigation.IdBrandNavigation.Name,
                Price = c.Price,
                FuelConsumption = c.FuelConsumption,
                Weight = c.Weight,
                SpeedAbility = c.SpeedAbility,
                MaxSpeed = c.MaxSpeed,
                OffRoad = c.OffRoad,
                DateAccept = c.DateAccept,
                HeightBetween = c.HeightBetween,
                MainPhoto = databaseContext.Photos
                        .Where(p => p.IdCar == c.Id && p.Status == 0)
                        .Select(p => new
                        {
                            Link = configuration["ImageUrl"] + p.Link
                        }).FirstOrDefault(),
                SubPhotos =databaseContext.Photos
                        .Where(p=>p.IdCar == c.Id && p.Status ==1)
                        .Select(p=> new
                        {
                            Link = configuration["ImageUrl"] + p.Link
                        }).ToList(),
            }).ToList();
        }

        public async Task<bool> updateCar(int id, UpdateCar updateCar)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Car = databaseContext.Cars.Find(id);
                    if(Car != null)
                    {
                        Car.Name=updateCar.Name;
                        Car.Price=updateCar.Price;
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

        public async Task<int> TotalCar(int id)
        {
            return await databaseContext.Cars.Where(d => databaseContext.SubWarehouseShowrooms.Any(m => m.IdShowroom == id && d.Id == m.IdCar)).CountAsync();
        }
    }
}
