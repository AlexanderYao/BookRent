using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    /// <summary>
    /// 借阅
    /// </summary>
    [Serializable]
    public class Rent
    {
        public long ID { get; set; }
        public string UserName { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public Book Book { get; set; }
    }
}
