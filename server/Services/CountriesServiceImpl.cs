using server.Data;
using server.Models;

namespace server.Services
{
    public class CountriesServiceImpl : CountriesService
    {
        private DatabaseContext databaseContext;
        public CountriesServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool createCountries(AddCountries addCountries)
        {
            try
            {
                var countries = new Country
                {
                    Name = addCountries.Name,
                };
                databaseContext.Countries.Add(countries);
                return databaseContext.SaveChanges() > 0;

            }
            catch
            {
                return false;
            }
        }

        public bool DeleteCountries(int id)
        {
            try
            {
                var country = databaseContext.Countries.FirstOrDefault(c => c.Id == id);
                if (country != null)
                {
                    country.IsDelete = true;
                    return databaseContext.SaveChanges() > 0;

                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public dynamic ShowCountries()
        {
            return databaseContext.Countries.OrderByDescending(d=>d.Id)
                                  .Where(c => c.IsDelete.HasValue && !c.IsDelete.Value)  
                                  .Select(c => new
                                  {
                                      Id = c.Id,
                                      Name = c.Name
                                      
                                  })
                                  .ToList();
        }


        public bool UpdateCountries(int id, UpdateCountry updateCountry)
        {
            try
            {
                var Country = databaseContext.Countries.Find(id);
                if (Country != null)
                {                  
                    Country.Name = updateCountry.Name;             
                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
