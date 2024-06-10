using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Services;

public class InVoiceServiceImpl:InVoiceService
{
    private DatabaseContext DatabaseContext;

    public InVoiceServiceImpl(DatabaseContext databaseContext)
    {
        DatabaseContext = databaseContext;
    }

    public dynamic DetailOutOrder()
    {
       return DatabaseContext.DetailOfOutOrders.Select(d => new
       {
           deliveryDate=d.DeliveryDay,
           price=d.Price,
           car=d.IdCarNavigation.Name,
           idOrder=d.IdOrder,
           Tax=d.Tax,
       }).ToList();
    }

    public dynamic FindAll()
    {
        try
        {
            return DatabaseContext.InVoices.Select(iv => new
            {
                iv.Id,
                iv.IdOrder,
                iv.CreateDate
            }).ToList() ;
        }
        catch (Exception e)
        {
            return "Not Data";
        }
    }

    public dynamic ShowInvoice(int idEmployee)
    {
        return DatabaseContext.InVoices.OrderByDescending(d=>d.Id).Where(d => d.IdOrderNavigation.IdShowroom == idEmployee
        ).Select(d => new
        {
            idorder=d.IdOrder,
            CreateDate=d.CreateDate,
        }).OrderByDescending(arg=>arg.CreateDate).ToList();
    }

    public async Task<int> TotalInvoice(int idshowroom)
    {
        return await DatabaseContext.InVoices.Where(d => d.IdOrderNavigation.IdShowroom == idshowroom).CountAsync();
    }
}