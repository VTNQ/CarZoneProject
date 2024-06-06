namespace server.Data
{
    public class AddRequest
    {
     
        public string To { get; set; } = null!;
        public string From { get; set; } = null!;
        public bool Type { get; set; }
        public string? Description { get; set; }
    }
}
