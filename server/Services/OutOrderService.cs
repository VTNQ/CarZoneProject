using server.Data;
using server.Models;

namespace server.Services
{
    public interface OutOrderService
    {
        public dynamic ShowCustomer();
        public dynamic ShowCar();
        public bool AddOutOrder(Data.OutOrder outOrder);
        public dynamic ShowOutOrder(int id);
        public dynamic DetailOutOrder(int id);
        public bool AddInvoice(int id);
        public dynamic ShowInvoice(int id);
        public bool AddContract(int id,AddContract addContract);
        public dynamic ShowContract(int id);
        Task UpdateOrderStatus();
    }
}
