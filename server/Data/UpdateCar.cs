namespace server.Data
{
    public class UpdateCar
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
        public int IdColorInSide { get; set; }
        public float Length { get; set; }
        public float Height { get; set; }
        public float Width { get; set; }
        public int NumberOfSeat { get; set; }
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
        public DateTime DateAccept { get; set; }
        public float HeightBetween { get; set; }
    }
}
