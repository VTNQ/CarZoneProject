using server.Controllers;

namespace server.Services
{
    public interface BrandService
    {
        public bool AddBrand(AddBrand addBrand);
        public dynamic GetCountry();
    }
}
