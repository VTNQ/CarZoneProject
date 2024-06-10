using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System;

namespace server.Services
{
    public class FormServiceImpl : FormService
    {
        private readonly DatabaseContext databaseContext;
        public FormServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public async Task<bool> AddForm(AddForm addForm)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Form = new Form
                    {
                        Name = addForm.Name,
                    };
                    databaseContext.Forms.Add(Form);
                    await databaseContext.SaveChangesAsync();
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

        public async Task<bool> DeleteForm(int id)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Form = databaseContext.Forms.Find(id);
                    if (Form != null)
                    {
                        databaseContext.Forms.Remove(Form);
                    }
                    await databaseContext.SaveChangesAsync();
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

        public async Task<IEnumerable<dynamic>> ShowForm()
        {
            return databaseContext.Forms.OrderByDescending(d => d.Id).Select(d => new
            {
                id=d.Id,
                name=d.Name,
            }).ToList();
        }

        public async Task<int> TotalForm()
        {
            return await databaseContext.Forms.CountAsync();
        }

        public async Task<bool> UpdateForm(int id,AddForm UpdateForm)
        {
            using (var traction = await databaseContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var Form = databaseContext.Forms.Find(id);
                    if (Form != null)
                    {
                        Form.Name = UpdateForm.Name;
                    }
                    await databaseContext.SaveChangesAsync();
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
