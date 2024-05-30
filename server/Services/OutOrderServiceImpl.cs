using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class OutOrderServiceImpl:OutOrderService
    {
        private readonly DatabaseContext _dbContext;
        public OutOrderServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool AddContract(int id,AddContract addContract)
        {
            try
            {
                var Contract = new Contract
                {
                    Condition = addContract.Name,
                    CreatedDate=DateOnly.FromDateTime(DateTime.Now),
                    IdOrder = id,
                };
                _dbContext.Contracts.Add(Contract);
                return _dbContext.SaveChanges()>0;
            }
            catch
            {
                return false;   
            }
        }

        public bool AddInvoice(int id)
        {
            try
            {
                var invoice = new InVoice
                {
                    IdOrder = id,
                    CreateDate = DateOnly.FromDateTime(DateTime.Now)
                };
                _dbContext.InVoices.Add(invoice);
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool AddOutOrder(Data.OutOrder outOrder)
        {
            try
            {
                var OutOrder = new Models.OutOrder
                {
                    IdCustomer = outOrder.IdCustomer,
                    IdEmployee = outOrder.IdEmployee,
                    IdShowroom = outOrder.IdShowroom,
                    DateOfSale = DateOnly.FromDateTime(DateTime.Now),
                    TotalAmount = outOrder.TotalAmount,
                    TotalTax = outOrder.TotalTax,
                    Payment = outOrder.Payment,
                    Status = false,
                    DeliveryType = outOrder.DeliveryType,
                };
                _dbContext.OutOrders.Add(OutOrder);
                _dbContext.SaveChanges();
                foreach(var outOrd in outOrder.DetailOutOrders)
                {
                    var DetailOutOrder = new DetailOfOutOrder
                    {
                        IdCar = outOrd.IdCar,
                        DeliveryDay = outOrd.DeliveryDate,
                        Price = outOrd.Price,
                        Tax = outOrd.Tax,
                        IdOrder= OutOrder.Id
                    };
                  _dbContext.DetailOfOutOrders.Add(DetailOutOrder);
                }

                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic DetailOutOrder(int id)
        {
           return _dbContext.DetailOfOutOrders.Where(d=>d.IdOrder==id).Select(d => new
           {
               id=d.Id,
               Car=d.IdCarNavigation.Name,
               idorder=d.IdOrderNavigation.Id,
               DeliveryDate=d.DeliveryDay,
               Price=d.Price,
               Tax=d.Tax,

           }).ToList();
        }

        public dynamic ShowAllOutOrder()
        {
            return _dbContext.OutOrders.Select(d => new
            {
                id = d.Id,
                Customer = d.IdCustomerNavigation.FullName,

                DateofSale = d.DateOfSale,
                TotalAmount = d.TotalAmount,
                TotalTax = d.TotalTax,
                Payment = d.Payment,
                DeliveryType = d.DeliveryType,
                idOrder = _dbContext.Contracts.Where(m => m.IdOrder == d.Id).Select(m => new
                {
                    idorder = m.IdOrder,
                }).FirstOrDefault(),
            }).OrderByDescending(arg => arg.id).ToList();
        }

        public dynamic ShowCar()
        {
            return _dbContext.Cars.Select(d => new
            {
                Id=d.Id,
                Name=d.Name,
                Price=d.Price,
            }).ToList();
        }

        public dynamic ShowContract(int id)
        {
            var contracts=_dbContext.Contracts.Where(d => d.IdOrder == id).Select(d => new
            {
                Condition = d.Condition,
                CreateDate = d.CreatedDate,
            }).FirstOrDefault();
            if (contracts != null)
            {
                return contracts;
            }
            else
            {
                return "Not Data";
            }
            
        }
        public dynamic ShowAllContract()
        {
            var contracts=_dbContext.Contracts.Select(d => new
            {
                Condition = d.Condition,
                CreateDate = d.CreatedDate,
            }).FirstOrDefault();
            if (contracts != null)
            {
                return contracts;
            }
            else
            {
                return "Not Data";
            }
            
        }

        public dynamic ShowCustomer()
        {
           return _dbContext.Customers.Select(d => new
           {
               Id=d.Id,
               FullName=d.FullName,
           }).ToList();
        }

        public dynamic ShowInvoice(int id)
        {
            return _dbContext.InVoices.Where(d => d.IdOrder == id).Select(d => new
            {
                DateCreate = d.CreateDate,
            }).FirstOrDefault();
        }

        public dynamic ShowOutOrder(int id)
        {
           return _dbContext.OutOrders.OrderByDescending(d=>d.Id).Where(d => d.IdEmployee == id).Select(d => new
           {
               id=d.Id,
               Customer=d.IdCustomerNavigation.FullName,
       
               DateofSale=d.DateOfSale,
               TotalAmount=d.TotalAmount,
               TotalTax=d.TotalTax,
               Payment=d.Payment,
               DeliveryType=d.DeliveryType,
               idOrder = _dbContext.Contracts.Where(m=>m.IdOrder==d.Id).Select(m => new
               {
                   idorder=m.IdOrder,
               }).FirstOrDefault(),
           }).OrderByDescending(arg => arg.id).ToList();
        }
        

        public async Task UpdateOrderStatus()
        {
            var Orders = await _dbContext.OutOrders.ToListAsync();
            foreach(var order in Orders)
            {
                var details= await _dbContext.DetailOfOutOrders.Where(d=> d.IdOrder == order.Id && d.DeliveryDay <= DateOnly.FromDateTime(DateTime.Today)).ToListAsync();
                if (details.Any())
                {
                    if (order.Status == false)
                    {
                        order.Status = true;
                        var invoice = new InVoice
                        {
                            IdOrder = order.Id,
                            CreateDate = DateOnly.FromDateTime(DateTime.Today),
                        };
                        _dbContext.InVoices.Add(invoice);
                    }
                   
                       
                }
            }
           await _dbContext.SaveChangesAsync();
        }
    }
}
