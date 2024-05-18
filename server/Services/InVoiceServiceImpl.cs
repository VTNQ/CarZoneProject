using server.Models;

namespace server.Services;

public class InVoiceServiceImpl:InVoiceService
{
    private DatabaseContext DatabaseContext;

    public InVoiceServiceImpl(DatabaseContext databaseContext)
    {
        DatabaseContext = databaseContext;
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
}