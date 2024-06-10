using server.Data;

namespace server.Services
{
    public interface VersionService
    {
       bool AddVersion(AddVersion addVersion);
        Task<IEnumerable<dynamic>> ShowVersion();
        bool DeleteVersion(int id);
        Task<int> TotalVersion();
    }
}
