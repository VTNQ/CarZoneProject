using server.Data;

namespace server.Services
{
    public interface RequestService
    {
        public bool AddRequest(AddRequest addRequest);
        public dynamic ShowWareHouse();
    }
}
