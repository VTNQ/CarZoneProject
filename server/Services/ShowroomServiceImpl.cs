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
                // Asynchronously executing the query and converting it to List
                var showrooms = await databaseContext.Showrooms
                    .Select(d => new
                    {
                        Id = d.Id,
                        Name = d.Name,
                        NameDistrict = d.IdDistrictNavigation.Name // Ensure IdDistrictNavigation is included in the query
                    })
                    .ToListAsync(); // Using ToListAsync for asynchronous operation
                return showrooms;
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                // Return an empty list if there is an exception
                return new List<dynamic>(); // Ensuring the return type is consistent
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
