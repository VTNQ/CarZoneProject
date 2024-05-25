﻿using server.Data;
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
                    Description=addRequest.Description,
                    Status=false,
                };
                databaseContext.Requests.Add(Request);
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowRequestSupplier(string fullname)
        {
            return databaseContext.Requests.Where(d => d.Type == false && d.From==fullname).Select(d => new
            {
                id = d.Id,
                To = d.To,

                Creadate = d.CreateDay,
                Decription = d.Description,
            }).ToList();
        }

        public dynamic ShowRequestWareHouse()
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

        public dynamic ShowSupplier()
        {
            return databaseContext.Supliers.Select(d => new
            {
                id = d.Id,
                Name = d.Name,
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

        public bool UpdateRequest(int id)
        {
            try
            {
                var Request=databaseContext.Requests.Find(id);
                if (Request != null)
                {
                    Request.Status=true;
                }
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }
    }
}
