namespace server.Data
{
    public class OutOrder
    {
        public int IdCustomer { get; set; }

        public int IdShowroom { get; set; }

        public int IdEmployee { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalTax { get; set; }
        public string Payment { get; set; } = null!;
    
        public string DeliveryType { get; set; } = null!;
        public List<DetailOutOrder> DetailOutOrders { get; set; }
    }
}
