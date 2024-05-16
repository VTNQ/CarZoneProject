namespace server.Data
{
    public class AddCustomer
    {
        public string FullName { get; set; } = null!;
        public DateOnly Dob { get; set; }
        public string Phone { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string IndentityCode { get; set; } = null!;
        public IFormFile Sign { get; set; } = null!;
    }
}
