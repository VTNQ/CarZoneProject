using server.Data;

namespace server.Services
{
    public interface CustomerService
    {
        public bool AddCustomer(AddCustomer addCustomer);
        public dynamic ShowCustomer();
        public bool UpdateCustomer(int id,UpdateCustomer updateCustomer);
    }
}
