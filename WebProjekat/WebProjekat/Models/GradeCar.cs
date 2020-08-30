using WebProjekat.Requests.CarReservation;

namespace WebProjekat.Models
{
    public class GradeCar
    {
        public int Id { get; set; }
        public double Grade { get; set; }

        public virtual Car Car { get; set; }
        public virtual User Users { get; set; }

        public GradeCar() { }
        public GradeCar(GradeCarRequest gradeCarRequest)
        {
            Grade = gradeCarRequest.Grade;
        }
    }
}
