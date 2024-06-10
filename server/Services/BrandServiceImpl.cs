using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper;
using server.Models;

namespace server.Services
{
    public class BrandServiceImpl : BrandService
    {
        private Models.DatabaseContext databaseContext;
        private IWebHostEnvironment webHostEnvironment;
        private IConfiguration configuration;
        public BrandServiceImpl(Models.DatabaseContext databaseContext,IWebHostEnvironment webHostEnvironment,IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }
        public async Task<bool> AddBrand(AddBrand addBrand)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var FileName = FileHelper.GenerateFileName(addBrand.Logo.FileName);
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "images", FileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        addBrand.Logo.CopyTo(fileStream);
                    }
                    var brand = new Brand
                    {
                        Name = addBrand.Name,
                        Logo = FileName,
                        Headquarters = addBrand.headquarters,
                        IdCountry = addBrand.idCountry,
                    };
                    databaseContext.Brands.Add(brand);
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
        public void DeletePhoto(string photo)
        {
            try
            {
                string path = Path.Combine(webHostEnvironment.WebRootPath, "images", photo);
                if (File.Exists(path))
                {
                    File.Delete(path);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file '{photo}': {ex.Message}");
            }
        }
        public async Task<bool> DeleteBrand(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Brand = databaseContext.Brands.Find(id);
                    if (Brand != null)
                    {
                        DeletePhoto(Brand.Logo);
                        databaseContext.Brands.Remove(Brand);
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

        public async Task<IEnumerable<dynamic>> GetCountry()
        {
           return databaseContext.Countries.Select(d => new
           {
               id=d.Id,
               Name=d.Name,
           }).ToList();
        }

        public async Task<IEnumerable<dynamic>> ShowBrand()
        {
           return databaseContext.Brands.OrderByDescending(d => d.Id).Select(d => new
           {
               id=d.Id,
               Name=d.Name,
               Logo= configuration["ImageUrl"] + d.Logo,
               Country=d.IdCountryNavigation.Name,
               HeadQuaters=d.Headquarters,
               idCountry=d.IdCountry,
               CarCount = d.Models.SelectMany(model => model.Cars).Count(),

           }).ToList() ;
        }

        public async Task<bool> UpdateBrand(int id, UpdateBrand updateBrand)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Brand = databaseContext.Brands.Find(id);
                    if (Brand != null)
                    {
                        Brand.Name = updateBrand.Name;
                        Brand.Headquarters = updateBrand.headquarters;
                        Brand.IdCountry = updateBrand.idCountry;
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

        public async Task<int> TotalBrand()
        {
            return await databaseContext.Brands.CountAsync();
        }
    }
}
