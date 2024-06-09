using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Services
{
    public class InOrderServiceImpl : InOrderService
    {
        private DatabaseContext databaseContext;
        private IConfiguration configuration;
        public InOrderServiceImpl(DatabaseContext databaseContext, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.configuration = configuration;
        }
        public async Task<IEnumerable<dynamic>> ShowWareHouse()
        {
            return databaseContext.Warehouses.Select(d => new
            {
                id=d.Id,
                Name=d.Name,
            }).ToList();    
        }
        public async Task<IEnumerable<dynamic>> ShowCar()
        {
            return databaseContext.Cars.Select(d => new
            {
                id=d.Id,
                name=d.Name,
                Price=d.Price,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowSupply()
        {
            return databaseContext.Supliers.Select(d => new
            {
                id=d.Id,
                Name=d.Name
            }).ToList();
        }

        public async Task<bool> AddInOrder(Data.InOrder inOrder)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var InOrder = new InOrder
                    {
                        IdWarehouse = inOrder.IdWarehouse,
                        IdEmployee = inOrder.IdEmployee,
                        IdSuplier = inOrder.IdSuplier,
                        DateOfSale = DateOnly.FromDateTime(DateTime.Now),
                        TotalAmount = inOrder.TotalAmount,
                        TotalTax = inOrder.TotalTax,
                        Payment = inOrder.Payment,
                        Status = false,
                    };
                    databaseContext.InOrders.Add(InOrder);
                    await databaseContext.SaveChangesAsync();
                    foreach (var inor in inOrder.DetailInOrders)
                    {
                        for(int i = 0; i < inor.Quantity; i++)
                        {
                            var DetailIndorder = new DetailOfInOrder
                            {
                                IdOrder = InOrder.Id,
                                IdCar = inor.IdCar,
                                DeliveryDate = inor.DeliveryDate,
                                Price = inor.Price,
                                Tax = inor.Tax,
                            };
                            databaseContext.DetailOfInOrders.Add(DetailIndorder);
                        }
                        
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

        public async Task<IEnumerable<dynamic>> ShowInOrder(int id)
        {
            return databaseContext.InOrders.Where(d => d.IdEmployee == id).Select(d => new
            {
                id = d.Id,
                WareHouse = d.IdWarehouseNavigation.Name,
                Supplier = d.IdSuplierNavigation.Name,
                DateofSale = d.DateOfSale,
                TotalAmount = d.TotalAmount,
                ToTalTax = d.TotalTax,
                Payment = d.Payment,
                Status=d.Status
                
            }).ToList();
        }
       
        public async Task<IEnumerable<dynamic>> DetailInOrder(int id)
        {
            return databaseContext.Cars.Where(d => databaseContext.DetailOfInOrders.Any(m=> m.IdOrder == id && m.IdCar==d.Id)).Select(d => new
            {
                id = d.Id,
                Car = d.Name,
               
                Price = d.Price,
                TotalPrice=databaseContext.DetailOfInOrders.Where(m => m.IdOrder == id && m.IdCar == d.Id).Sum(m=>m.Price),
                Tax = databaseContext.DetailOfInOrders.Where(m => m.IdOrder == id && m.IdCar == d.Id).Select(o => new
                {
                    tax=o.Tax,
                }).FirstOrDefault(),
                Quantity= databaseContext.DetailOfInOrders.Where(m => m.IdOrder == id && m.IdCar == d.Id).Count(),
                TotalTax = databaseContext.DetailOfInOrders.Where(m => m.IdOrder == id && m.IdCar == d.Id).Sum(m=>m.Tax),
                Picture = databaseContext.Photos.Where(m => m.IdCar == d.Id && m.Status == 0).Select(m => new
                {
                    PictureLink = configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList(); 
        }

        
        public async Task<IEnumerable<dynamic>> ShowOrderWareHouse(int id)
        {
            return databaseContext.InOrders.Where(d=>d.IdWarehouse==id).Select(d => new
            {
                id = d.Id,
                WareHouse = d.IdWarehouseNavigation.Name,
                Supplier = d.IdSuplierNavigation.Name,
                DateofSale = d.DateOfSale,
                Employee=d.IdEmployeeNavigation.FullName,
                TotalAmount = d.TotalAmount,
                ToTalTax = d.TotalTax,
                Payment = d.Payment,
            }).ToList();
        }

        public async Task<int> TotalInorder(int id)
        {
            return await databaseContext.InOrders.Where(d => d.IdEmployee == id).CountAsync();
        }

        public async Task<int> TotalOrderWareHouse(int id)
        {
            return await databaseContext.InOrders.Where(d => d.IdWarehouse == id).CountAsync();
        }

        public async Task<IEnumerable<dynamic>> GetCountOrder(int id, int datetime)
        {
            return databaseContext.InOrders.Where(p => p.IdWarehouse == id && p.DateOfSale.Month == datetime && p.Status==true).GroupBy(o => o.DateOfSale).Select(g => new
            {
                OrderDate = g.Key,
                OrderCount = g.Count()
            }).OrderBy(x => x.OrderDate)
            .ToList();
        }

        public async Task<IEnumerable<dynamic>> GetCountinOrder(int id, int datetime)
        {
            return databaseContext.InOrders.Where(d => d.DateOfSale.Month == datetime && d.Status == true && databaseContext.Showrooms.Any(m => m.Id == id && m.IdDistrictNavigation.IdCityNavigation.IdCountry == d.IdWarehouseNavigation.IdCountry)).GroupBy(o => o.DateOfSale).Select(d => new
            {
                OrderDate = d.Key,
                OrderCount = d.Count()
            }).OrderBy(x => x.OrderDate).ToList();
        }

        public async Task<bool> ApproveOrder(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Order = databaseContext.InOrders.FirstOrDefault(d=>d.Id==id && d.Status==false);
                    if (Order != null)
                    {
                        Order.Status = true;
                        var Detail=databaseContext.DetailOfInOrders.Where(d=>d.IdOrder==id).ToList();
                        foreach(var d in Detail)
                        {
                            var subwarehouse = new SubWarehouseCar
                            {
                                IdWarehouse = Order.IdWarehouse,
                                IdCar = d.IdCar,
                            };
                            databaseContext.SubWarehouseCars.Add(subwarehouse);
                        }
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
