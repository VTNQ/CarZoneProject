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
          }).ToList();
        }
    }
}
