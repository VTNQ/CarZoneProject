using server.Data;
using server.Models;

namespace server.Services
{
    public class RequestServiceImpl : RequestService
    {
        private DatabaseContext databaseContext;
        public RequestServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<bool> AddRequest(AddRequest addRequest)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Request = new Request
                    {
                        To = addRequest.To,
                        From = addRequest.From,
                        Type = addRequest.Type,
                        CreateDay = DateOnly.FromDateTime(DateTime.Now),
                        Description = addRequest.Description,
                        Status = false,
                    };
                    databaseContext.Requests.Add(Request);
                    await databaseContext.SaveChangesAsync();
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

        public async Task<IEnumerable<dynamic>> ShowRequestSupplier(string fullname)
        {
            return databaseContext.Requests.Where(d => d.Type == false && d.From==fullname).Select(d => new
            {
                id = d.Id,
                To = d.To,

                Creadate = d.CreateDay,
                Decription = d.Description,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowRequestWareHouse()
        {
           return databaseContext.Requests.Where(d => d.Type == true).Select(d => new
           {
               id=d.Id,
               To=d.To,
               Creadate=d.CreateDay,
               Decription=d.Description,
               status=d.Status,
           }).ToList(); 
        }

        public async Task<IEnumerable<dynamic>> ShowSupplier()
        {
            return databaseContext.Supliers.Select(d => new
            {
                id = d.Id,
                Name = d.Name,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowWareHouse()
        {
           return databaseContext.Warehouses.Select(d => new
           {
               id=d.Id,
               Name=d.Name,
           }).ToList(); 
        }

        public async Task<bool> UpdateRequest(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Request = databaseContext.Requests.Find(id);
                    if (Request != null)
                    {
                        Request.Status = true;
                    }
                    await databaseContext.SaveChangesAsync();
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

      
    }
}
