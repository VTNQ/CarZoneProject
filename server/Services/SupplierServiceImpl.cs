using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class SupplierServiceImpl : SupplierService
    {
        private readonly DatabaseContext _databaseContext;
        public SupplierServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public bool AddSupplier(AddSupplier addSuppplier)
        {
            try
            {
                var Supplier = new Suplier
                {
                    Name = addSuppplier.Name,
                    Type = addSuppplier.Type,
                    IdCountry = addSuppplier.IdCountry,
                    Email = addSuppplier.Email,
                };
                _databaseContext.Supliers.Add(Supplier);
                return _databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteSupplier(int id)
        {
            try
            {
                var Supplier = _databaseContext.Supliers.Find(id);
                if (Supplier != null)
                {
                    _databaseContext.Supliers.Remove(Supplier);
                }
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowCountry()
        {
            return _databaseContext.Countries.Select(d => new
            {
                Id=d.Id,
                Name=d.Name,
            }).ToList();    
        }

        public dynamic ShowSupplier()
        {
            return _databaseContext.Supliers.Select(d => new
            {
                Id = d.Id,
                Name = d.Name,
                Type = d.Type,
                Country = d.IdCountryNavigation.Name,
                IdCountry = d.IdCountry,
                Email=d.Email,
            }).ToList(); 
        }

        public async Task<int> TotalSupplier()
        {
            return await _databaseContext.Supliers.CountAsync();
        }

        public bool UpdateSupplier(int id, AddSupplier updateSuppplier)
        {
            try
            {
                var Supplier = _databaseContext.Supliers.Find(id);
                if (Supplier != null)
                {
                    Supplier.Name = updateSuppplier.Name;
                    Supplier.Type = updateSuppplier.Type;
                    Supplier.IdCountry= updateSuppplier.IdCountry;
                    Supplier.Email = updateSuppplier.Email;
                }
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
