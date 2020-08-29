using WebProjekat.Requests.Admin;

namespace WebProjekat.Models
{
    public class BonusInfo
    {
        public int Id { get; set; }
        public int FlightBonus { get; set; }
        public int RentacarBonus { get; set; }

        public BonusInfo() { }

        public BonusInfo(ChangeBonusInfoRequest bonusInfo)
        {
            FlightBonus = bonusInfo.FlightBonus;
            RentacarBonus = bonusInfo.RentacarBonus;
        }
    }
}
