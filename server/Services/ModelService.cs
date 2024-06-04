using server.Data;

namespace server.Services
{
    public interface ModelService
    {
        Task<IEnumerable<dynamic>> ShowBrand();
        Task<bool>AddModel(AddModel addModel);
        Task<IEnumerable<dynamic>> ShowModel();
        Task<bool> UpdateModel(int id, AddModel UpdateModel);
        Task<bool> DeleteModel(int id);
        Task<int> TotalModel();
    }
}
