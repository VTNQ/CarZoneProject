using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Diagnostics.Contracts;

namespace server.Services
{
    public class OutOrderServiceImpl : OutOrderService
    {
        private readonly DatabaseContext _dbContext;
        private IConfiguration configuration;
        public OutOrderServiceImpl(DatabaseContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            this.configuration = configuration;
        }

        public async Task<bool> AddContract(int id,AddContract addContract)
        {
            using (var traction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Contract = new Models.Contract
                    {
                        Condition = addContract.Name,
                        CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                        IdOrder = id,
                    };
                    _dbContext.Contracts.Add(Contract);
                    await _dbContext.SaveChangesAsync();
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

        public async Task<bool> AddInvoice(int id)
        {
            using (var traction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var invoice = new InVoice
                    {
                        IdOrder = id,
                        CreateDate = DateOnly.FromDateTime(DateTime.Now)
                    };
                    _dbContext.InVoices.Add(invoice);
                    await _dbContext.SaveChangesAsync();
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

        public async Task<bool> AddOutOrder(Data.OutOrder outOrder)
        {

            using (var traction = await _dbContext.Database.BeginTransactionAsync())
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
                   await _dbContext.SaveChangesAsync();
                    foreach (var outOrd in outOrder.DetailOutOrders)
                    {
                        var showRoomCar=_dbContext.SubWarehouseShowrooms.FirstOrDefault(d=>d.IdCar==outOrd.IdCar && d.IdShowroom==outOrder.IdShowroom);

                        var DetailOutOrder = new DetailOfOutOrder
                        {
                            IdCar = outOrd.IdCar,
                            DeliveryDay = outOrd.DeliveryDate,
                            Price = outOrd.Price,
                            Tax = outOrd.Tax,
                            IdOrder = OutOrder.Id
                        };
                        _dbContext.DetailOfOutOrders.Add(DetailOutOrder);
                        if (showRoomCar != null)
                        {
                            _dbContext.SubWarehouseShowrooms.Remove(showRoomCar);
                        }
                    }

                    await _dbContext.SaveChangesAsync();
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

        public async Task<IEnumerable<dynamic>> DetailOutOrder(int id)
        {
           return _dbContext.DetailOfOutOrders.Where(d=>d.IdOrder==id).Select(d => new
           {
               id=d.Id,
               Car=d.IdCarNavigation.Name,
               idorder=d.IdOrderNavigation.Id,
               DeliveryDate=d.DeliveryDay,
               Price=d.Price,
               Tax=d.Tax,
               Picture = _dbContext.Photos.Where(m => m.IdCar == d.IdCar && m.Status == 0).Select(m => new
               {
                   PictureLink = configuration["ImageUrl"] + m.Link,
               }).FirstOrDefault(),

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

        public async Task<IEnumerable<dynamic>> ShowCar(int id)
        {
            return _dbContext.Cars.Where(d=>_dbContext.SubWarehouseShowrooms.Any(m=>m.IdShowroom==id && m.IdCar==d.Id)).Select(d => new
            {
                Id=d.Id,
                Name=d.Name,
                Price=d.Price,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowContract(int id)
        {
            var contracts=_dbContext.Contracts.Where(d => d.IdOrder == id).Select(d => new
            {
                Condition = d.Condition,
                CreateDate = d.CreatedDate,
            }).FirstOrDefault();
            if (contracts != null)
            {
                return new List<dynamic> { contracts };
            }
            else
            {
                return new List<dynamic> { new { Message = "No Data" } };
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

        public async Task<IEnumerable<dynamic>> ShowCustomer()
        {
           return _dbContext.Customers.Select(d => new
           {
               Id=d.Id,
               FullName=d.FullName,
           }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowInvoice(int id)
        {
            var invoice = _dbContext.InVoices
                .Where(d => d.IdOrder == id)
                .Select(d => new
                {
                    DateCreate = d.CreateDate,
                })
                .FirstOrDefault();

            if (invoice != null)
            {
                return new List<dynamic> { invoice };
            }
            else
            {
                return Enumerable.Empty<dynamic>();
            }
        }

        public async Task<IEnumerable<dynamic>> ShowOutOrder(int id)
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

        public async Task<int> TotalOutOrder(int id)
        {
            return await _dbContext.OutOrders.Where(d => d.IdEmployee == id).CountAsync();
        }

        public async Task<IEnumerable<dynamic>> GetCountOrder(int id, int datetime)
        {
            return _dbContext.OutOrders.Where(p=>p.IdEmployee==id && p.DateOfSale.Month == datetime && p.Status==true).GroupBy(o => o.DateOfSale).Select(g => new
            {
                OrderDate = g.Key,
                OrderCount = g.Count()
            }).OrderBy(x => x.OrderDate)
            .ToList();
        }

        public async Task<int> TotalContract(int id)
        {
            return await _dbContext.Contracts.Where(d=>d.IdOrderNavigation.IdEmployee==id).CountAsync();
        }

        public dynamic GetWareHouse(int id)
        {
            return _dbContext.Warehouses.Where(d => _dbContext.Showrooms.Any(m => m.Id == id && m.IdDistrictNavigation.IdCityNavigation.IdCountry == d.IdCountry)).Select(d => new
            {
                id = d.Id,
            }).FirstOrDefault();
        }
    }
}
