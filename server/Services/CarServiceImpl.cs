using server.Data;
using server.Models;

namespace server.Services
{
    public class CarServiceImpl : CarService
    {
        private DatabaseContext databaseContext;
        public CarServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool addCar(AddCar addCar)
        {
            if(databaseContext.Cars.Any(c=>c.Name == addCar.Name))
            {
                return false;
            }
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
                Height  = addCar.Height,
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
            return databaseContext.SaveChanges()>0;
        }

        public bool deleteCar(int carId)
        {
            throw new NotImplementedException();
        }

        public dynamic showCar()
        {
            return databaseContext.Cars.Select(c => new
            {
                Name = c.Name,
                IdModel = c.IdModel,
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
                IdVersion = c.IdVersion,
                IdForm = c.IdForm,
                Price = c.Price,
                FuelConsumption = c.FuelConsumption,
                Weight = c.Weight,
                SpeedAbility = c.SpeedAbility,
                MaxSpeed = c.MaxSpeed,
                OffRoad = c.OffRoad,
                DateAccept = c.DateAccept,
                HeightBetween = c.HeightBetween,

            }).ToList();
        }

        public bool updateCar(int id, UpdateCar updateCar)
        {
            throw new NotImplementedException();
        }
    }
}
