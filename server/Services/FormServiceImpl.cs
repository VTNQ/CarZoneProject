using server.Data;
using server.Models;

namespace server.Services
{
    public class FormServiceImpl : FormService
    {
        private readonly DatabaseContext databaseContext;
        public FormServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool AddForm(AddForm addForm)
        {
            try
            {
                var Form = new Form
                {
                    Name = addForm.Name,
                };
                databaseContext.Forms.Add(Form);
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteForm(int id)
        {
            try
            {
                var Form=databaseContext.Forms.Find(id);
                if(Form!=null)
                {
                    databaseContext.Forms.Remove(Form);
                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowForm()
        {
            return databaseContext.Forms.Select(d => new
            {
                id=d.Id,
                name=d.Name,
            }).ToList();
        }

        public bool UpdateForm(int id,AddForm UpdateForm)
        {
            try
            {
                var Form=databaseContext.Forms.Find(id);
                if(Form != null)
                {
                    Form.Name = UpdateForm.Name;
                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
