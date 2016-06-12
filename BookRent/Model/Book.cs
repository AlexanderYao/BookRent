using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    [Serializable]
    public class Book : IIdentity
    {
        public long Id { get; set; }
        public string ISBN { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 入库日期
        /// </summary>
        public DateTime InDate { get; set; }
        public double Price { get; set; }
        public string Pinyin { get; set; }
        /// <summary>
        /// 购买方式
        /// </summary>
        public string BuyFrom { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as Book;
            if (null == other)
            {
                return false;
            }

            return other.ISBN == this.ISBN;
        }

        public override int GetHashCode()
        {
            return null == ISBN ? base.GetHashCode() : ISBN.GetHashCode();
        }

        public override string ToString()
        {
            return string.Format("{0} {1}", Pinyin, Name);
        }
    }

    public enum IsbnAction
    {
        Request = 0,
        Response = 1
    }
}
