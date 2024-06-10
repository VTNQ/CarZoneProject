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

        public async Task<dynamic> showShowroom()
        {
            try
            {
                var showrooms = await databaseContext.Showrooms.OrderByDescending(d=>d.Id)
                    .Select(d => new
                    {
                        Id = d.Id,
                        Name = d.Name,
                        NameDistrict = d.IdDistrictNavigation.Name 
                    })
                    .ToListAsync(); 
                return showrooms;
            }
            catch (Exception ex)
            {
                return new List<dynamic>(); 
            }
        }

        public bool updateShowroom(int id, UpdateShowroom updateShowroom)
        {
            var showroom = databaseContext.Showrooms.Find(id);
            if(showroom != null)
            {
                showroom.Name = updateShowroom.Name;
            }
            return databaseContext.SaveChanges() > 0;
        }
    }
}
