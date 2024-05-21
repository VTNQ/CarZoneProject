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
           return _dbContext.DetailOfOutOrders.Where(d => d.IdOrder == id).Select(d => new
           {
               id=d.Id,
               Car=d.IdCarNavigation.Name,
               DeliveryDate=d.DeliveryDay,
               Price=d.Price,
               Tax=d.Tax,
           }).ToList();
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
            return _dbContext.Contracts.Where(d => d.IdOrder == id).Select(d => new
            {
                Condition = d.Condition,
                CreateDate = d.CreatedDate,
            }).FirstOrDefault();
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
           return _dbContext.OutOrders.Where(d => d.IdEmployee == id).Select(d => new
           {
               id=d.Id,
               Customer=d.IdCustomerNavigation.FullName,
       
               DateofSale=d.DateOfSale,
               TotalAmount=d.TotalAmount,
               TotalTax=d.TotalTax,
               Payment=d.Payment,
               DeliveryType=d.DeliveryType
           }).ToList();
        }
    }
}
