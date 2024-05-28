using Microsoft.AspNetCore.Routing.Constraints;
using System.Diagnostics;
using System.Security;

namespace server.Data
{
    public class AddCar
    {
        public string Name { get; set; }
        public int IdModel { get; set; }
        public string Condition { get; set; }
        public string Engine { get; set; }
        public string Drivertrain { get; set; }
        public string FuelType { get; set; }
        public string MotorSize { get; set; }
        public string Bhp { get; set; }
        public int IdColorOutSide { get; set; }
        public int IdColorInSide { get; set ; }
        public float Length { get; set; }
        public float Height { get; set; }
        public float Width { get; set; }
        public byte NumberOfSeat {  get; set; }
        public float Mileage { get; set; }
        public string Transmission { get; set; }

        public int IdVersion { get; set; }
        public int IdForm { get; set; }
        public decimal Price { get; set; }
        public string FuelConsumption { get; set; }
        public float Weight { get; set; }
        public float SpeedAbility { get; set; }
        public float MaxSpeed { get; set; }
        public bool OffRoad { get; set; }
        public DateOnly DateAccept {  get; set; }
        public float HeightBetween {  get; set; }
        public IFormFile MainPhoto { get; set; }
        public List<IFormFile> SubPhotos { get; set; } = new List<IFormFile>();
    }
}
