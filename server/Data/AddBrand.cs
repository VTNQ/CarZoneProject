namespace server.Data
{
    public class AddBrand
    {
        public string Name { get; set; }
        public IFormFile Logo { get; set; }
        public string headquarters { get; set; }
        public int idCountry { get; set; }
    }
}
