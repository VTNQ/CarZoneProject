using server.Data;

namespace server.Services
{
    public interface InOrderService
    {
        Task<IEnumerable<dynamic>> ShowCar();
        Task<IEnumerable<dynamic>> ShowWareHouse();
        Task<IEnumerable<dynamic>> ShowSupply();
        Task<IEnumerable<dynamic>> ShowInOrder(int id);
        Task<bool> AddInOrder(InOrder inOrder);
        Task<IEnumerable<dynamic>> DetailInOrder(int id);
         Task UpdateOrderStatus();
        Task<IEnumerable<dynamic>> ShowOrderWareHouse(int id);
        Task<int> TotalInorder(int id);
        Task<int> TotalOrderWareHouse(int id);
        Task<IEnumerable<dynamic>> GetCountOrder(int id, int datetime);
        Task<IEnumerable<dynamic>> GetCountinOrder(int id, int datetime);
    }
}
