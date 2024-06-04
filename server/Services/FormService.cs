using server.Data;

namespace server.Services
{
    public interface FormService
    {
        Task<bool> AddForm(AddForm addForm);
        Task<IEnumerable<dynamic>> ShowForm();
        Task<bool> UpdateForm(int id,AddForm UpdateForm);
        Task<bool> DeleteForm(int id);
        Task<int> TotalForm();
    }
}
