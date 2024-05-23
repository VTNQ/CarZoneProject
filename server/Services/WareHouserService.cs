using server.Data;

namespace server.Services
{
    public interface WareHouserService
    {
        public dynamic ShowCarWareHouse(int idShowroom);
        public dynamic ShowCar();
        public dynamic ShowBranch();
        public dynamic ShowModel();
        public dynamic DetailCar(int id);
        public dynamic ShowListPicture(int id);
        public bool SendMessage(SendMessage message);
        public dynamic ShowLatestCar();
    }
}
