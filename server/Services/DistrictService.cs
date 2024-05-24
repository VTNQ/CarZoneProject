using Microsoft.Identity.Client;
using server.Data;

namespace server.Services
{
    public interface DistrictService
    {
        public bool createDistrict(AddDistrict addDistrict);
        public dynamic showDistrict();

        public bool deleteDistrict(int id);
        public dynamic findDistrictByCity (int cityId);
        
    }
}
