namespace WebProjekat.Requests.Rentacar
{
    public class CreateRentacarCompanyRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int AdminId { get; set; }
    }
}
