using server.Data;

namespace server.Services
{
    public interface RequestService
    {
        Task<bool> AddRequest(AddRequest addRequest);
        Task<IEnumerable<dynamic>> GetShowRoom(int id);
        Task<IEnumerable<dynamic>> ShowRequestWareHouse(int id);
        Task<IEnumerable<dynamic>> ShowSupplier();
        Task<IEnumerable<dynamic>> ShowRequestShowRoom(int id);
        Task<IEnumerable<dynamic>> ShowRequestSupplier(string fullname);
        bool UpdateRequest(int id);
        Task<IEnumerable<dynamic>>ShowDistrict(int id);
    }
}
