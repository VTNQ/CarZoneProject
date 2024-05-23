using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class ShowroomServiceImpl : ShowroomService
    {
        private DatabaseContext databaseContext;
        public ShowroomServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool createShowroom(AddShowroom addShowroom)
        {
            try
            {
                var showroom = new Showroom
                {
                    Name = addShowroom.Name,
                    IdDistrict = addShowroom.IdDistrict,
                };
                databaseContext.Showrooms.Add(showroom);
                return databaseContext.SaveChanges()>0;
            }

            catch
            {
                return false;
            }
        }

        public dynamic showShowroom()
        {
            try
            {
                return databaseContext.Showrooms
                    
                    .Select(d => new
                    {
                        Id = d.Id,
                        Name = d.Name,

                        IdDistrict = d.IdDistrictNavigation.Name
                    })
                    .ToList();
            }

            catch (Exception ex)
            {
                
                return false;
            }
        }
    }
}
