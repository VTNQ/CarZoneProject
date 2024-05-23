using server.Data;

namespace server.Services
{
    public interface FormService
    {
        public bool AddForm(AddForm addForm);
        public dynamic ShowForm();
        public bool UpdateForm(int id,AddForm UpdateForm);
        public bool DeleteForm(int id);
    }
}
