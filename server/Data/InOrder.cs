namespace server.Data
{
    public class InOrder
    {
        public int IdWarehouse { get; set; }

        public int IdEmployee { get; set; }

        public int IdSuplier { get; set; }


        public decimal TotalAmount { get; set; }
        public decimal TotalTax { get; set; }
        public string Payment { get; set; } = null!;


        public List<DetailInOrder>DetailInOrders { get; set; }
    }
}
