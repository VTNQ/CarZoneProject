using server.Data;

namespace server.Services
{
    public interface SupplierService
    {
        Task<IEnumerable<dynamic>> ShowCountry();
        Task<bool> AddSupplier(AddSupplier addSuppplier);
        Task<IEnumerable<dynamic>> ShowSupplier();
        Task<bool> UpdateSupplier(int id,AddSupplier updateSuppplier);
        Task<bool> DeleteSupplier(int id);
        Task<int> TotalSupplier();
    }
}
