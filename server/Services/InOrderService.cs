using server.Data;

namespace server.Services
{
    public interface InOrderService
    {
        public dynamic ShowCar();
        public dynamic ShowWareHouse();
        public dynamic ShowSupply();
        public bool AddInOrder(InOrder inOrder);
    }
}
