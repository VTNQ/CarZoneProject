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
        public bool AddRequest(AddRequest addRequest)
        {
            try
            {
                var Request = new Request
                {
                    To = addRequest.To,
                    From = addRequest.From,
                    Type=addRequest.Type,
                    CreateDay=DateOnly.FromDateTime(DateTime.Now),
                };
                databaseContext.Requests.Add(Request);
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowRequestWareHouse()
        {
           return databaseContext.Requests.Where(d => d.Type == true).Select(d => new
           {
               To=d.To,
               From=d.From,
               Creadate=d.CreateDay
           }).ToList(); 
        }

        public dynamic ShowWareHouse()
        {
           return databaseContext.Warehouses.Select(d => new
           {
               id=d.Id,
               Name=d.Name,
           }).ToList(); 
        }
    }
}
