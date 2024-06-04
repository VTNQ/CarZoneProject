using server.Data;

namespace server.Services
{
    public interface CustomerService
    {
        Task<bool> AddCustomer(AddCustomer addCustomer);
        Task<IEnumerable<dynamic>> ShowCustomer();
        Task<bool> UpdateCustomer(int id,UpdateCustomer updateCustomer);
        Task<int> TotalCustomer();
    }
}
