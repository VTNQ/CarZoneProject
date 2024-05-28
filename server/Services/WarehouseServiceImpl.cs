using Microsoft.AspNetCore.Http.HttpResults;
using server.Data;
using server.Models;

namespace server.Services
{
    public class WarehouseServiceImpl : WarehouseService
    {
        private DatabaseContext databaseContext;
        public WarehouseServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public bool addWarehouse(AddWarehouse addWarehouse)
        {
            try
            {
                var warehouse = new Warehouse
                {
                    Name = addWarehouse.Name,
                    IdCountry = addWarehouse.IdCountry,
                };
                databaseContext.Warehouses.Add(warehouse);
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        

        public dynamic getWarehouse()
        {
            return databaseContext.Warehouses.Select(c=>new
            {
                Name = c.Name,
                IdCountry = c.IdCountry,
                CountryName = c.IdCountryNavigation.Name
            }).ToList();
        }
    }
}
