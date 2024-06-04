using server.Data;

namespace server.Services
{
    public interface CarService
    {
        public bool addCar(AddCar addCar);
        public dynamic showCar();
        Task<bool> updateCar(int id, UpdateCar updateCar);
        Task<bool> deleteCar(int carId);

        public dynamic findCarById(int carId);
        Task<int> TotalCar(int id);
    }
}
