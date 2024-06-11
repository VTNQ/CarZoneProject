using server.Data;

namespace server.Services
{
    public interface WareHouserService
    {
        Task<IEnumerable<dynamic>> ShowCarWareHouse(int idShowroom);
        Task<IEnumerable<dynamic>> CarWareHouse(int idshowroom);
        Task<IEnumerable<dynamic>> ShowCar();
        Task<IEnumerable<dynamic>> DetailCartoShowRoom(int id);
        Task<IEnumerable<dynamic>> ShowWareHouse();
        public dynamic ShowBranch();
        public dynamic ShowRoom(int id);
        public dynamic GetShowRoom(int id);
        public dynamic ShowModel();
        public dynamic findModelByBrand(int idBrand);
        public dynamic DetailCar(int id);
        public dynamic ShowListPicture(int id);
        public bool SendMessage(SendMessage message);
        public bool updateModel(int id, UpdateModel updateModel);
        public dynamic ShowLatestCar();
       Task<bool> CreateShowRoom(CreateCarShowRoom createCarShowRoom);
        Task<IEnumerable<dynamic>> GetCartoShowRoom(int id);
        Task<IEnumerable<dynamic>> GetWareHouseCar(int id);
        Task<IEnumerable<dynamic>> DetailWareHouseCar(int id);
        Task<IEnumerable<dynamic>> CompareCar(int id);
        Task<IEnumerable<dynamic>> GetCarToWareHouse(int id);
       
     
    }
}
