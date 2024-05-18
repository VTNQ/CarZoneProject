using server.Data;

namespace server.Services
{
    public interface SupplierService
    {
        public dynamic ShowCountry();
        public bool AddSupplier(AddSupplier addSuppplier);
        public dynamic ShowSupplier();
        public bool UpdateSupplier(int id,AddSupplier updateSuppplier);
        public bool DeleteSupplier(int id);
    }
}
