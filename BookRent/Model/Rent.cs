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
    public class Rent : ModelBase
    {
        public Person Person { get; set; }
        public Book Book { get; set; }
        /// <summary>
        /// 借出日期
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// 归还日期，DateTime.MinDate时表示未归还
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// 借出数量
        /// </summary>
        public int Count { get; set; }
    }
}
