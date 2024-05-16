namespace server.Data
{
    public class UpdateCustomer
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateOnly Dob { get; set; }
    }
}
