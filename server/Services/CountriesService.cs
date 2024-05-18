using server.Data;

namespace server.Services
{
    public interface CountriesService
    {
        public bool createCountries(AddCountries addCountries);
        public dynamic ShowCountries();
        public bool UpdateCountries(int id, UpdateCountry updateCountry);
        public bool DeleteCountries(int id);
    }
}
