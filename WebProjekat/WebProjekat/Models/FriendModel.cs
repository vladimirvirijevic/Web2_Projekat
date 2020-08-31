using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProjekat.Models
{
    public class FriendModel
    {
        public int Id{ get; set; }
        public string FriendFirstName { get; set; }
        public string FriendLastName { get; set; }
        public bool DaLiJePrihvacen { get; set; }
        public virtual User KoJeRezervisao { get; set; }
        public virtual User KoJePrihvatio { get; set; }
    }
}
