using server.Data;

namespace server.Services
{
    public interface InOrderService
    {
        public dynamic ShowCar();
        public dynamic ShowWareHouse();
        public dynamic ShowSupply();
        public dynamic ShowInOrder(int id);
        public bool AddInOrder(InOrder inOrder);
        public dynamic DetailInOrder(int id);
         Task UpdateOrderStatus();
        public dynamic ShowOrderWareHouse(int id);
    }
}
