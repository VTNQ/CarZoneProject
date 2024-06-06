using server.Data;
using server.Models;

namespace server.Services
{
    public interface OutOrderService
    {
        Task<IEnumerable<dynamic>>  ShowCustomer();
        Task<IEnumerable<dynamic>> ShowCar(int id);
        public dynamic GetWareHouse(int id);
        Task<bool> AddOutOrder(Data.OutOrder outOrder);
        Task<IEnumerable<dynamic>> ShowOutOrder(int id);
        public dynamic ShowAllOutOrder();
        Task<IEnumerable<dynamic>> DetailOutOrder(int id);
        Task<bool> AddInvoice(int id);
        Task<IEnumerable<dynamic>> ShowInvoice(int id);
        Task<bool> AddContract(int id,AddContract addContract);
        Task<IEnumerable<dynamic>> ShowContract(int id);
        Task<int> TotalContract(int id);
        public dynamic ShowAllContract();
        Task UpdateOrderStatus();
        Task<int> TotalOutOrder(int id);
        Task<IEnumerable<dynamic>> GetCountOrder(int id, int datetime);
    }
}
