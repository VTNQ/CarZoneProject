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
        public bool AddColor(AddColor addColor)
        {
            try
            {
                var color = new Color
                {
                    Name = addColor.Name,
                };
                _databaseContext.Colors.Add(color);
                return _databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteColor(int id)
        {
            try
            {
                var Color=_databaseContext.Colors.Find(id);
                if(Color != null)
                {
                    _databaseContext.Colors.Remove(Color);
                }
                return _databaseContext.SaveChanges()>0;
            }catch
            {
                return false ;
            }
        }

        public dynamic ShowColor()
        {
            return _databaseContext.Colors.Select(d => new
            {
                id=d.Id,
                name=d.Name,
            }).ToList();
        }

        public async Task<int> TotalColor()
        {
            return await _databaseContext.Colors.CountAsync();
        }

        public bool UpdateColor(int id, AddColor UpdateColor)
        {
            try
            {
                var Color = _databaseContext.Colors.Find(id);
                if (Color != null)
                {
                    Color.Name = UpdateColor.Name;
                }
                return _databaseContext.SaveChanges()>0;    
            }
            catch
            {
                return false;
            }
        }
    }
}
