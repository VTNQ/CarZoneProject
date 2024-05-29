using server.Data;

namespace server.Services
{
    public interface CarService
    {
        public bool addCar(AddCar addCar);
        public dynamic showCar();
        public bool updateCar(int id, UpdateCar updateCar);
        public bool deleteCar(int carId);

        public dynamic findCarById(int carId);
    }
}
