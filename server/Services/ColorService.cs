using server.Data;

namespace server.Services
{
    public interface ColorService
    {
        public bool AddColor(AddColor addColor);
        public dynamic ShowColor();
        public bool UpdateColor(int id, AddColor UpdateColor);
        public bool DeleteColor(int id);
        Task<int> TotalColor();
    }
}
