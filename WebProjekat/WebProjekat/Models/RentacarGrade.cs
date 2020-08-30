using WebProjekat.Requests.CarReservation;

namespace WebProjekat.Models
{
    public class RentacarGrade
    {
        public int Id { get; set; }
        public double Grade { get; set; }

        public virtual RentacarCompany Company { get; set; }
        public virtual User User { get; set; }

        public RentacarGrade() { }
        public RentacarGrade(GradeRentacarRequest gradeRentacarRequest)
        {
            Grade = gradeRentacarRequest.Grade;
        }
    }
}
