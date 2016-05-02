using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    /// <summary>
    /// 会员
    /// </summary>
    [Serializable]
    public class Person
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Sex Sex { get; set; }
        /// <summary>
        /// 开始日期
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// 到期日期
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// 会费
        /// </summary>
        public double Fee { get; set; }
        /// <summary>
        /// 押金
        /// </summary>
        public double Deposit { get; set; }
        public string PhoneNo { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as Person;
            if (null == other)
            {
                return false;
            }

            return other.Id == this.Id;
        }

        public override int GetHashCode()
        {
            return null == Id ? base.GetHashCode() : Id.GetHashCode();
        }
    }

    public enum Sex
    {
        男 = 0,
        女 = 1
    }
}
