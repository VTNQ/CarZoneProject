using server.Data;

namespace server.Services
{
    public interface ColorService
    {
        Task<bool> AddColor(AddColor addColor);
        Task<IEnumerable<dynamic>> ShowColor();
        Task<bool> UpdateColor(int id, AddColor UpdateColor);
        Task<bool> DeleteColor(int id);
        Task<int> TotalColor();
    }
}
