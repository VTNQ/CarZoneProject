namespace server.Data
{
    public class InOrder
    {
        public int IdWarehouse { get; set; }

        public int IdEmployee { get; set; }

        public int IdShowroom { get; set; }


        public decimal TotalAmount { get; set; }
        public decimal TotalTax { get; set; }
      


        public List<DetailInOrder>DetailInOrders { get; set; }
    }
}
