using Microsoft.EntityFrameworkCore;
using server.Data;
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

        public async Task<bool> AddContact(AddContact contact)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Contact = new Contact
                    {
                        NameCustomer = contact.NameCustomer,
                        EmailCustomer = contact.EmailCustomer,
                        Description = contact.Description,
                    };
                   _databaseContext.Contacts.Add(Contact);
                    await traction.CommitAsync();
                    return true;
                }
                catch
                {
                    await traction.RollbackAsync();
                    return false;
                }
            }
        }

        public dynamic ShowContact()
        {
          return _databaseContext.Contacts.OrderByDescending(d => d.Id).Select(d => new
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
