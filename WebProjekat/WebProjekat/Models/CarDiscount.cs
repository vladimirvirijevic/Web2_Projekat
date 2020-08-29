using WebProjekat.Requests.RentacarAdmin;

namespace WebProjekat.Models
{
    public class CarDiscount
    {
        public int Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public double Percent { get; set; }
        public virtual Car Car { get; set; }

        public CarDiscount() { }
        public CarDiscount(AddDiscountRequest discountRequest)
        {
            StartDate = discountRequest.StartDate;
            EndDate = discountRequest.EndDate;
            Percent = discountRequest.Percent;
        }
    }
}
