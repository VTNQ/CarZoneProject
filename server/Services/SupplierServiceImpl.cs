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

        public async Task<bool> AddSupplier(AddSupplier addSuppplier)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
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
                    await _databaseContext.SaveChangesAsync();
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

        public async Task<bool> DeleteSupplier(int id)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Supplier = _databaseContext.Supliers.Find(id);
                    if (Supplier != null)
                    {
                        _databaseContext.Supliers.Remove(Supplier);
                    }
                    await _databaseContext.SaveChangesAsync();
                    await traction.CommitAsync();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
                
        }

        public async Task<IEnumerable<dynamic>> ShowCountry()
        {
            return _databaseContext.Countries.Select(d => new
            {
                Id=d.Id,
                Name=d.Name,
            }).ToList();    
        }

        public async Task<IEnumerable<dynamic>> ShowSupplier()
        {
            return _databaseContext.Supliers.OrderByDescending(d=>d.Id).Select(d => new
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

        public async Task<bool> UpdateSupplier(int id, AddSupplier updateSuppplier)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {

                try
                {
                    var Supplier = _databaseContext.Supliers.Find(id);
                    if (Supplier != null)
                    {
                        Supplier.Name = updateSuppplier.Name;
                        Supplier.Type = updateSuppplier.Type;
                        Supplier.IdCountry = updateSuppplier.IdCountry;
                        Supplier.Email = updateSuppplier.Email;
                    }
                    await _databaseContext.SaveChangesAsync();
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
