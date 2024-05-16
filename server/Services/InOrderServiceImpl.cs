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
                return databaseContext.SaveChanges()>0;
              
            }
            catch
            {
                return false;
            }
        }
    }
}
