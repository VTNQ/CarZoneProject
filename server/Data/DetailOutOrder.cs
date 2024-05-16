namespace server.Data
{
    public class DetailOutOrder
    {
        public int IdCar { get; set; }
        public DateOnly DeliveryDate { get; set; }
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
    }
}
