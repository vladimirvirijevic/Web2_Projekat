using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Requests.Friend
{
    public class AddFriendRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int UserId { get; set; }//ko ce da prihvati

    }
}
