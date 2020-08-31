using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Models
{
    public class DiscountedCar
    {
        public Car Car { get; set; }
        public CarDiscount Discount { get; set; }

        public DiscountedCar() { }
        public DiscountedCar(Car car, CarDiscount discount)
        {
            Car = car;
            Discount = discount;
        }

    }


}
