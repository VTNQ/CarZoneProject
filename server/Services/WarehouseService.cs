using server.Data;

namespace server.Services
{
    public interface WarehouseService
    {
         public bool addWarehouse(AddWarehouse addwarehouse);
       public dynamic getWarehouse();
    }
}
