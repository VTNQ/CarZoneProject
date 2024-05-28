namespace server.Services;

public interface InVoiceService
{
    public dynamic FindAll();
    public dynamic ShowInvoice(int idEmployee);
    public dynamic DetailOutOrder();
}