namespace WebProjekat.Requests.Rentacar
{
    public class SearchRentacarServiceRequest
    {
        public string Location { get; set; }
        public string Name { get; set; }
        public string PickupDate { get; set; }
        public string DropoffDate { get; set; }
    }
}
