namespace server.Data
{
    public class DetailInOrder
    {
        public int IdCar { get; set; }
        public DateOnly DeliveryDate { get; set; }
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public int Quantity { get; set; }
    }
}
