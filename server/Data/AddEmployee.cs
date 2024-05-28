namespace server.Data
{
    public class AddEmployee
    {
       
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
       
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string IdentityCode { get; set; } = null!;

        public int IdShowroom { get; set; }
    }
}
