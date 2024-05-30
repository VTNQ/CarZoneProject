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
        public dynamic ShowWareHouse()
        {
            return databaseContext.Warehouses.Select(d => new
            {
                id=d.Id,
                Name=d.Name,
            }).ToList();    
        }
        public dynamic ShowCar()
        {
            return databaseContext.Cars.Select(d => new
            {
                id=d.Id,
                name=d.Name,
                Price=d.Price,
            }).ToList();
        }

        public dynamic ShowSupply()
        {
            return databaseContext.Supliers.Select(d => new
            {
                id=d.Id,
                Name=d.Name
            }).ToList();
        }

        public bool AddInOrder(Data.InOrder inOrder)
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
                databaseContext.SaveChanges();
                foreach(var inor in inOrder.DetailInOrders) {
                    var DetailIndorder = new DetailOfInOrder
                    {
                        IdOrder=InOrder.Id,
                        IdCar = inor.IdCar,
                        DeliveryDate = inor.DeliveryDate,
                        Price = inor.Price,
                        Tax = inor.Tax,
                    };
                   databaseContext.DetailOfInOrders.Add(DetailIndorder);
                }
                databaseContext.SaveChanges();
                return true;

            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowInOrder(int id)
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
       
        public dynamic DetailInOrder(int id)
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

        public dynamic ShowOrderWareHouse(int id)
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
            }).ToList() ;
        }

        public async Task<int> TotalInorder(int id)
        {
            return await databaseContext.InOrders.Where(d => d.IdEmployee == id).CountAsync();
        }
    }
}
