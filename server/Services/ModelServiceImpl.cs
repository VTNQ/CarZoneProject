
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System;

namespace server.Services
{
    public class ModelServiceImpl : ModelService
    {
        private readonly DatabaseContext databaseContext;
        public ModelServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<bool> AddModel(AddModel addModel)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Model = new Model
                    {
                        Name = addModel.Name,
                        IdBrand = addModel.IdBrand,
                    };
                    databaseContext.Models.Add(Model);
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

        public async Task<bool> DeleteModel(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Model=databaseContext.Models.Find(id);
                    if(Model != null)
                    {
                        databaseContext.Models.Remove(Model);
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

        public async Task<IEnumerable<dynamic>> ShowBrand()
        {
            return databaseContext.Brands.Select(d => new
            {
                id = d.Id,
                name = d.Name,
            }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowModel()
        {
            return databaseContext.Models.OrderByDescending(d => d.Id).Select(d => new
            {
                Id = d.Id,
                name = d.Name,
                idBrand = d.IdBrand,
                Brand = d.IdBrandNavigation.Name,
            }).ToList();
        }

        public async Task<int> TotalModel()
        {
            return await databaseContext.Models.CountAsync();
        }

        public async Task<bool> UpdateModel(int id, AddModel UpdateModel)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Model = databaseContext.Models.Find(id);
                    if (Model != null)
                    {
                        Model.Name = UpdateModel.Name;
                        Model.IdBrand=UpdateModel.IdBrand;
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
