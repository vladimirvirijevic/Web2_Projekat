namespace WebProjekat.Requests.RentacarAdmin
{
    public class CreateCarRequest
    {
        public int BranchId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int Seats { get; set; }
        public string Type { get; set; }
        public string AvailableFrom { get; set; }
        public string AvailableUntil { get; set; }
        public string PickupLocation { get; set; }
        public string DropoffLocation { get; set; }
    }
}
