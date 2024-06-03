using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class VersionServiceImpl : VersionService
    {
        private DatabaseContext databaseContext;
        public VersionServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public async Task<bool> AddVersion(AddVersion addVersion)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Version = new Models.Version
                    {
                        ReleaseYear = addVersion.Version
                    };
                    databaseContext.Versions.Add(Version);
                    await databaseContext.SaveChangesAsync();
                    await traction.CommitAsync();
                    return true;
                }
                catch
                {
                    await traction.RollbackAsync();
                    return false;
                }
            }
                
        }

        public async Task<bool> DeleteVersion(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Version = databaseContext.Versions.Find(id);
                    if (Version != null)
                    {
                        databaseContext.Versions.Remove(Version);
                    }
                    await databaseContext.SaveChangesAsync();
                    await traction.CommitAsync();
                    return true;
                }
                catch
                {
                    await traction.RollbackAsync();
                    return false;
                }
            }
                
        }

        public async Task<IEnumerable<dynamic>> ShowVersion()
        {
            return databaseContext.Versions.Select(d => new
            {
                id=d.Id,
                relaseYear=d.ReleaseYear,
            }).ToList();
        }

        public async Task<int> TotalVersion()
        {
            return await databaseContext.Versions.CountAsync();
        }
    }
}
