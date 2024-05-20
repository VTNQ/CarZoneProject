using server.Context;
using server.Controllers;
using server.Helper;
using server.Models;

namespace server.Services
{
    public class BrandServiceImpl : BrandService
    {
        private Models.DatabaseContext databaseContext;
        private IWebHostEnvironment webHostEnvironment;
        public BrandServiceImpl(Models.DatabaseContext databaseContext,IWebHostEnvironment webHostEnvironment)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
        }
        public bool AddBrand(AddBrand addBrand)
        {
            try
            {
              var FileName=FileHelper.GenerateFileName(addBrand.Logo.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", FileName);
                using(var fileStream=new FileStream(path, FileMode.Create))
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
                return databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCountry()
        {
           return databaseContext.Countries.Select(d => new
           {
               id=d.Id,
               Name=d.Name,
           }).ToList();
        }
    }
}
