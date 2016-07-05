using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    [Serializable]
    public class Book : ModelBase
    {
        public string ISBN { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 入库日期
        /// </summary>
        public DateTime InDate { get; set; }
        /// <summary>
        /// 价格
        /// </summary>
        public double Price { get; set; }
        /// <summary>
        /// 拼音首字母
        /// </summary>
        public string Pinyin { get; set; }
        /// <summary>
        /// 购买方式
        /// </summary>
        public string BuyFrom { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 出版社
        /// </summary>
        public string Publisher { get; set; }
        /// <summary>
        /// 作者
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// 入库数量
        /// </summary>
        public int TotalCount { get; set; }

        private int availableCount;
        /// <summary>
        /// 现有数量
        /// </summary>
        public int AvailableCount
        {
            get
            {
                return availableCount;
            }
            set
            {
                if (value < 0 || value > TotalCount)
                {
                    throw new ArgumentOutOfRangeException("AvailableCount");
                }

                availableCount = value;
            }
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
