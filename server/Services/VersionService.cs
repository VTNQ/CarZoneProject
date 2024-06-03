using server.Data;

namespace server.Services
{
    public interface VersionService
    {
        Task<bool> AddVersion(AddVersion addVersion);
        Task<IEnumerable<dynamic>> ShowVersion();
        Task<bool> DeleteVersion(int id);
        Task<int> TotalVersion();
    }
}
