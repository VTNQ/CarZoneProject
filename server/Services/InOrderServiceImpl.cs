using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Services
{
    public class InOrderServiceImpl : InOrderService
    {
        private DatabaseContext databaseContext;
        public InOrderServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
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
            }).ToList();
        }
       
        public async Task<IEnumerable<dynamic>> DetailInOrder(int id)
        {
            return databaseContext.DetailOfInOrders.Where(d => d.IdOrder == id).Select(d => new
            {
                id = d.Id,
                Car = d.IdCarNavigation.Name,
                DeleveryDate = d.DeliveryDate,
                Price = d.Price,
                Tax = d.Tax,
            }).ToList(); 
        }

        public async Task UpdateOrderStatus()
        {
            var Orders = await databaseContext.InOrders.ToListAsync();
            foreach(var order in Orders)
            {
                var details=await databaseContext.DetailOfInOrders.Where(d=>d.IdOrder==order.Id && d.DeliveryDate<=DateOnly.FromDateTime(DateTime.Today)).ToListAsync();
                if (details.Any())
                {
                    order.Status = true;
                }
            }
            await databaseContext.SaveChangesAsync();
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
            return databaseContext.InOrders.Where(p => p.IdWarehouse == id && p.DateOfSale.Month == datetime).GroupBy(o => o.DateOfSale).Select(g => new
            {
                OrderDate = g.Key,
                OrderCount = g.Count()
            }).OrderBy(x => x.OrderDate)
            .ToList();
        }
    }
}
