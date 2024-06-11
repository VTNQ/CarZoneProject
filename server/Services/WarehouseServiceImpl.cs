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
        public bool addCarIntoWarehouse(AddCarIntoWarehouse addCarIntoWarehouse)
        {
            try
            {
                for(int i = 0; i < addCarIntoWarehouse.Quantity; i++)
                {
                    var subWarehouse = new SubWarehouseCar
                    {
                        IdWarehouse = addCarIntoWarehouse.IdWarehouse,
                        IdCar = addCarIntoWarehouse.IdCar,
                    };
                    databaseContext.SubWarehouseCars.Add(subWarehouse);
                }
                
                return databaseContext.SaveChanges()>0;
            }catch { return false; }
        }
        public dynamic getCarFromWarehouse(int idWarehouse)
        {
            return databaseContext.SubWarehouseCars
                .Where(c => c.IdWarehouse == idWarehouse)
                .GroupBy(c => new { c.IdCar, c.IdCarNavigation.Name })
                .Select(g => new
                {
                    
                    NameCar = g.Key.Name,
                    Quantity = g.Count()
                }).ToList();
        }




        public dynamic getWarehouse()
        {
            return databaseContext.Warehouses.OrderByDescending(d => d.Id).Select(c=>new
            {
                Id = c.Id,
                Name = c.Name,
                IdCountry = c.IdCountry,
                CountryName = c.IdCountryNavigation.Name
            }).ToList();
        }
    }
}
