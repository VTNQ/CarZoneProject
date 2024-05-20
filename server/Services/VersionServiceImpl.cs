﻿using server.Data;
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
        public bool AddVersion(AddVersion addVersion)
        {
            try
            {
                var Version = new Models.Version
                {
                    ReleaseYear =addVersion.Version
                };
                databaseContext.Versions.Add(Version);
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;   
            }
        }

        public bool DeleteVersion(int id)
        {
            try
            {
                var Version = databaseContext.Versions.Find(id);
                if (Version != null)
                {
                    databaseContext.Versions.Remove(Version);
                }
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowVersion()
        {
            return databaseContext.Versions.Select(d => new
            {
                id=d.Id,
                relaseYear=d.ReleaseYear,
            }).ToList();
        }
    }
}
