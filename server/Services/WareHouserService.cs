using server.Data;

namespace server.Services
{
    public interface WareHouserService
    {
        public dynamic ShowCarWareHouse(int idShowroom);
        Task<IEnumerable<dynamic>> ShowCar();
        Task<IEnumerable<dynamic>> DetailCartoShowRoom(int id);
        public dynamic ShowBranch();
        public dynamic ShowRoom();
        public dynamic ShowModel();
        public dynamic DetailCar(int id);
        public dynamic ShowListPicture(int id);
        public bool SendMessage(SendMessage message);
        public dynamic ShowLatestCar();
       Task<bool> CreateShowRoom(CreateCarShowRoom createCarShowRoom);
        Task<IEnumerable<dynamic>> GetCartoShowRoom();
        Task<IEnumerable<dynamic>> GetWareHouseCar();
        Task<IEnumerable<dynamic>> DetailWareHouseCar(int id);
     
    }
}
