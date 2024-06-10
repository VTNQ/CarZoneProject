using server.Data;
using server.Models;

namespace server.Services
{
    public class CityServiceImpl : CityService
    {
        private DatabaseContext databaseContext;
        public CityServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool createCity(AddCity addCity)
        {
            try
            {
                var city = new City
                {
                    Name = addCity.Name,    
                    IdCountry = addCity.IdCountry,
                };
                databaseContext.Cities.Add(city);
                return databaseContext.SaveChanges()>0;
            }catch 
            {
                return false;
            }
        }

        public bool DeleteCity(int id)
        {
            try
            {
                var city = databaseContext.Cities.FirstOrDefault(x => x.Id == id);
                if(city != null)
                {
                    city.IsDelete = true;
                    return databaseContext.SaveChanges() > 0;
                }
                return false;
            }catch (Exception ex)
            {
                return false;
            }
        }

        public dynamic findCityByIdCoutry(int id)
        {
            try
            {
                return databaseContext.Cities.Where(c=>c.IdCountry == id).Select(c =>new
                {
                    Id = c.Id,
                    Name = c.Name,
                    
                }).ToList();
                
            }catch (Exception ex)
            {
                return false;
            }
        }

        public dynamic ShowCity()
        {
            return databaseContext.Cities.OrderByDescending(d=>d.Id).Where(c => c.IsDelete.HasValue && !c.IsDelete.Value)
                                  .Select(c => new
                                  {
                                      Id = c.Id,
                                      Name = c.Name,
                                      IdCountry =c.IdCountry,
                                      NameCountry = c.IdCountryNavigation.Name,
                                  })
                                  .ToList();
        }
    }
}
