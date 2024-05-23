using server.Data;

namespace server.Services
{
    public interface VersionService
    {
        public bool AddVersion(AddVersion addVersion);
        public dynamic ShowVersion();
        public bool DeleteVersion(int id);
    }
}
