using server.Data;

namespace server.Services
{
    public interface BrandService
    {
        Task<bool> AddBrand(AddBrand addBrand);
        Task<IEnumerable<dynamic>> GetCountry();
        Task<IEnumerable<dynamic>> ShowBrand();
        Task<bool> UpdateBrand(int id,UpdateBrand updateBrand);
        Task<bool> DeleteBrand(int id);
        Task<int> TotalBrand();
    }
}
