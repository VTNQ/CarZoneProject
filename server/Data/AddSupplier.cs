namespace server.Data
{
    public class AddSupplier
    {
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;

        public int IdCountry { get; set; }
        public string Email { get; set; } = null!;
    }
}
