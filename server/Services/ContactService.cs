using server.Data;

namespace server.Services
{
    public interface ContactService
    {
        public dynamic ShowContact();
        Task<int> TotalContact();
        Task<bool>AddContact(AddContact contact);
    }
}
