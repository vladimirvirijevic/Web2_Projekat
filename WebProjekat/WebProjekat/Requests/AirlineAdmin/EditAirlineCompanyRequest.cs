﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.AirlineAdmin
{
    public class EditAirlineCompanyRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
