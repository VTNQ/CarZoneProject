namespace server.Services
{
    public interface ContactService
    {
        public dynamic ShowContact();
        Task<int> TotalContact();
    }
}
