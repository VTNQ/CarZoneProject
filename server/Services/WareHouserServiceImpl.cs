﻿using server.Context;
using server.Models;

namespace server.Services
{
    public class WareHouserServiceImpl : WareHouserService
    {
        private server.Models.DatabaseContext databaseContext;
        private IConfiguration configuration;
        public WareHouserServiceImpl(server.Models.DatabaseContext databaseContext, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.configuration = configuration;
        }
        public dynamic ShowCarWareHouse(int idShowroom)
        {
            return databaseContext.SubWarehouseShowrooms.Where(d => d.IdShowroom == idShowroom).Select(d => new
            {
                id=d.IdCarNavigation.Id,
                Name=d.IdCarNavigation.Name,
                Model=d.IdCarNavigation.IdModelNavigation.Name,
                ColorInSide=d.IdCarNavigation.IdColorInSideNavigation.Name,
                ColorOutSide=d.IdCarNavigation.IdColorOutSideNavigation.Name,
                NumberofSeat=d.IdCarNavigation.NumberOfSeat,
                Version=d.IdCarNavigation.IdVersionNavigation.ReleaseYear,
                Price=d.IdCarNavigation.Price,
                Weight=d.IdCarNavigation.Weight,    
                SpeedAbillity=d.IdCarNavigation.SpeedAbility,
                MaxSpeed=d.IdCarNavigation.MaxSpeed,
                Form=d.IdCarNavigation.IdFormNavigation.Name,
                HeightBetween=d.IdCarNavigation.HeightBetween,
                Picture=databaseContext.Photos.Where(m=>m.IdCar==d.IdCarNavigation.Id && m.Status == 0).Select(m => new
                {
                    PictureLink= configuration["ImageUrl"] + m.Link,
                }).FirstOrDefault(),
            }).ToList();    
        }

        public dynamic ShowCar()
        {
            return databaseContext.Cars.Select(d => new
            {
                id=d.Id,
                name=d.Name,
                price=d.Price,
                Mileage=d.Mileage,
                
            }).ToList();
        }
    }
}
