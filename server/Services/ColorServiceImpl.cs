using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class ColorServiceImpl : ColorService
    {
        private readonly DatabaseContext _databaseContext;
        public ColorServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext; 
        }
        public async Task<bool> AddColor(AddColor addColor)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var color = new Color
                    {
                        Name = addColor.Name,
                    };
                    _databaseContext.Colors.Add(color);
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

        public async Task<bool> DeleteColor(int id)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Color = _databaseContext.Colors.Find(id);
                    if (Color != null)
                    {
                        _databaseContext.Colors.Remove(Color);
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

        public async Task<IEnumerable<dynamic>> ShowColor()
        {
            return _databaseContext.Colors.OrderByDescending(d => d.Id).Select(d => new
            {
                id=d.Id,
                name=d.Name,
            }).ToList();
        }

        public async Task<int> TotalColor()
        {
            return await _databaseContext.Colors.CountAsync();
        }

        public async Task<bool> UpdateColor(int id, AddColor UpdateColor)
        {
            using (var traction = await _databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Color = _databaseContext.Colors.Find(id);
                    if (Color != null)
                    {
                        Color.Name = UpdateColor.Name;
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
