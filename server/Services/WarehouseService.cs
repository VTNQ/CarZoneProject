using server.Data;

namespace server.Services
{
    public interface WarehouseService
    {
         public bool addWarehouse(AddWarehouse addwarehouse);
       public dynamic getWarehouse();

        public bool addCarIntoWarehouse(AddCarIntoWarehouse addCarIntoWarehouse);
        public dynamic getCarFromWarehouse(int idWarehouse);
    }
}
