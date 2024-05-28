using Microsoft.AspNetCore.Mvc;

namespace server.Data
{
    public class UpdateShowroom 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdDistrict { get; set; }
    }
}
