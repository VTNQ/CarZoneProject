using server.Data;

namespace server.Services
{
    public interface BrandService
    {
        public bool AddBrand(AddBrand addBrand);
        public dynamic GetCountry();
        public dynamic ShowBrand();
        public bool UpdateBrand(int id,UpdateBrand updateBrand);
        public bool DeleteBrand(int id);
    }
}
