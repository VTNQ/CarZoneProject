using server.Data;

namespace server.Services
{
    public interface RequestService
    {
        Task<bool> AddRequest(AddRequest addRequest);
        Task<IEnumerable<dynamic>> ShowWareHouse();
        Task<IEnumerable<dynamic>> ShowRequestWareHouse();
        Task<IEnumerable<dynamic>> ShowSupplier();
        Task<IEnumerable<dynamic>> ShowRequestSupplier(string fullname);
        Task<bool> UpdateRequest(int id);
    }
}
