using server.Data;

namespace server.Services
{
    public interface CityService
    {
        public bool createCity(AddCity addCity);
        public dynamic ShowCity();
        public bool DeleteCity(int id);
        public dynamic findCityByIdCoutry(int id);
    }
}
