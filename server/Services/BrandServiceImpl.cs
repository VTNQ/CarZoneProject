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

        public dynamic ShowBrand()
        {
           return databaseContext.Brands.Select(d => new
           {
               id=d.Id,
               Name=d.Name,
               Logo= configuration["ImageUrl"] + d.Logo,
               Country=d.IdCountryNavigation.Name,
               HeadQuaters=d.Headquarters,
               idCountry=d.IdCountry,
           }).ToList() ;
        }

        public bool UpdateBrand(int id, UpdateBrand updateBrand)
        {
            try
            {
                var Brand = databaseContext.Brands.Find(id);
                if(Brand !=null) { 
                Brand.Name= updateBrand.Name;
                Brand.Headquarters=updateBrand.headquarters;
                Brand.IdCountry=updateBrand.idCountry;
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
