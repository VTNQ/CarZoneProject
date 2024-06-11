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

        public dynamic getAvenueByMonth()
        {
            return databaseContext.OutOrders.GroupBy(order => new
            {
                Month = order.DateOfSale.Month

            }).Select(order => new
            {
                Month = order.Key.Month,
                TotalAmount = order.Sum(x => x.TotalAmount)
            }).OrderBy(x => x.Month).ToList();
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
                .OrderByDescending(g => g.Quarter)
                .ThenBy(g => g.Year)
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
                .OrderByDescending(g => g.Year)
                .ThenByDescending(g => g.Quarter)
                .ToList();
        }public dynamic getNewCustomerByMonth()
        {
            return databaseContext.OutOrders
                .GroupBy(order => new
                {
                    Month = order.DateOfSale.Month,
                    Year = order.DateOfSale.Year,
                    
                })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    NewCustomers = g.Select(order => order.IdCustomer).Distinct().Count()
                })
                .OrderBy(g => g.Year)
                .ThenBy(g => g.Month)
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
            }).OrderByDescending(g => g.Year).ThenByDescending(g => g.Quarter).ToList();
        }

        public dynamic getTotalCar()
        {
            int totalCar = databaseContext.Cars.Count();
            return new { TotalCar = totalCar };
        }
        public dynamic getDataBrand()
        {
            var totalCars = databaseContext.Cars.Count();

            var brandData = databaseContext.Brands.Select(brand => new
            {
                BrandName = brand.Name,
                CarCount = brand.Models.SelectMany(model => model.Cars).Count(),
                Percentage = (double)brand.Models.SelectMany(model => model.Cars).Count() / totalCars * 100
            }).ToList();

            return brandData;
        }

        public dynamic getAvenueEachShowroom()
        {
            var showroom = databaseContext.Showrooms.Select(showroom => new
            {
                nameShowroom = showroom.Name,
                AvenueShowroom = showroom.OutOrders.Sum(c => c.TotalAmount)
            }).ToList();
            return showroom;
        }
        public dynamic getTopSellCar()
        {
            var car = databaseContext.Cars.Select(car => new
            {
                nameCar = car.Name,
                price = car.Price,
                Brand = car.IdModelNavigation.IdBrandNavigation.Name,
                
                totalCar = car.DetailOfOutOrders.Count()
            }).OrderByDescending(car=>car.totalCar).ToList();
            return car;
        }
        

        public dynamic getAvenueByCountry()
            {
            var totalAmount1 = databaseContext.OutOrders.Sum(c => c.TotalAmount);
                var avenueByCountry = databaseContext.OutOrders
                    .GroupBy(avenue => avenue.IdShowroomNavigation.IdDistrictNavigation.IdCityNavigation.IdCountryNavigation.Name)
                    .Select(group => new
                    {
                        CountryName = group.Key,
                        TotalAvenue = group.Sum(c => c.TotalAmount),
                        Percentage = Math.Round((double)group.Sum(c => c.TotalAmount) / (double)totalAmount1 * 100, 2)

                    })
                    .ToList();

                return avenueByCountry;
            }
        public dynamic getHighestAvenueCountry()
        {
            var totalAmount1 = databaseContext.OutOrders.Sum(c => c.TotalAmount);
            var avenueByCountry = databaseContext.OutOrders
                .GroupBy(avenue => avenue.IdShowroomNavigation.IdDistrictNavigation.IdCityNavigation.IdCountryNavigation.Name)
                .Select(group => new
                {
                    CountryName = group.Key,
                    TotalAvenue = group.Sum(c => c.TotalAmount),

                }).OrderByDescending(group=>group.TotalAvenue)
                .FirstOrDefault();

            return avenueByCountry;
        }


    }
}
