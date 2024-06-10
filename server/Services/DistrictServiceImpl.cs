using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class DistrictServiceImpl : DistrictService
    {
        private DatabaseContext databaseContext;
        public DistrictServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool createDistrict(AddDistrict addDistrict)
        {
            try
            {
                var district = new District
                {
                    Name = addDistrict.Name,
                    IdCity = addDistrict.IdCity,
                };
                databaseContext.Districts.Add(district);
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public bool deleteDistrict(int id)
        {
            try
            {
                var district = databaseContext.Districts.FirstOrDefault(c=>c.Id == id);
                if(district != null)
                {
                    district.IsDelete = true;
                    return databaseContext.SaveChanges() > 0;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public dynamic findDistrictByCity(int cityId)
        {
            try
            {
                return databaseContext.Districts.Where(c => c.IdCity == cityId).Select(d => new
                {
                    Id = d.Id,
                    Name = d.Name,
                }).ToList();
            }
            catch
            {
                return false;
            }
        }

        public dynamic showDistrict()
        {
            try
            {
                return databaseContext.Districts
                    .Include(d => d.IdCityNavigation).OrderByDescending(d=>d.Id) 
                    .Where(d => !d.IsDelete.HasValue || !d.IsDelete.Value)  
                    .Select(d => new
                    {
                        Id = d.Id,
                        Name = d.Name,
                        
                        NameCity = d.IdCityNavigation.Name,
                        NameCountry = d.IdCityNavigation.IdCountryNavigation.Name
                    })
                    .ToList();
            }
            
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

    }
}
