using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace server.Services
{
    public class StatisticServiceImpl : StatisticService
    {
        private readonly DatabaseContext databaseContext;

        public StatisticServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public dynamic getAvenueByPrecious()
        {
            return databaseContext.OutOrders
                .GroupBy(order => new
                {
                    Year = order.DateOfSale.Year,
                    Quarter = (order.DateOfSale.Month - 1) / 3 + 1
                })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Quarter = g.Key.Quarter,
                    TotalAmount = g.Sum(order => order.TotalAmount)
                })
                .OrderBy(g => g.Year)
                .ThenBy(g => g.Quarter)
                .ToList();

            
        }

        public dynamic getNewCustomerByPrecious()
        {
            return databaseContext.OutOrders
                .GroupBy(order => new
                {
                    Year = order.DateOfSale.Year,
                    Quarter = (order.DateOfSale.Month - 1) / 3 + 1
                })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Quarter = g.Key.Quarter,
                    NewCustomers = g.Select(order => order.IdCustomer).Distinct().Count()
                })
                .OrderBy(g => g.Year)
                .ThenBy(g => g.Quarter)
                .ToList();
        }


        public dynamic getNewOrderByPrecious()
        {
            return databaseContext.OutOrders.GroupBy(order => new
            {
                Year = order.DateOfSale.Year,
                Quarter = (order.DateOfSale.Month - 1) / 3 + 1
            }).Select(g => new
            {
                Year = g.Key.Year,
                Quarter = g.Key.Quarter,
                TotalOrder = g.Count()
,
            }).OrderBy(g => g.Year).ThenBy(g => g.Quarter).ToList();
        }

        public dynamic getTotalCar()
        {
            int totalCar = databaseContext.Cars.Count();
            return new { TotalCar = totalCar };
        }

    }
}
