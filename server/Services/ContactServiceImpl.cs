using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Services
{
    public class ContactServiceImpl : ContactService
    {
        private readonly DatabaseContext _databaseContext;
        public ContactServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public dynamic ShowContact()
        {
          return _databaseContext.Contacts.Select(d => new
          {
              id=d.Id,
              NameCustomer=d.NameCustomer,
              EmailCustomer=d.EmailCustomer,
              Description=d.Description,
          }).OrderByDescending(arg=>arg.id).ToList();
        }

        public async Task<int> TotalContact()
        {
            return await _databaseContext.Contacts.CountAsync();
        }
    }
}
