using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.User
{
    public class EditUser
    {
        public int Id { get; set; }
        public string firstName{get;set;}
        public string lastName { get; set; }
        public string city { get; set; }
        public string phone { get; set; }
    }
}
