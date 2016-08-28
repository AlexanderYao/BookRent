using System;

namespace BookRent
{
    /// <summary>
    /// 会员
    /// </summary>
    [Serializable]
    public class Person : ModelBase
    {
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
        /// <summary>
        /// 联系方式
        /// </summary>
        public string PhoneNo { get; set; }
        /// <summary>
        /// 拼音首字母
        /// </summary>
        public string Pinyin { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string Contacter { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        public override string ToString()
        {
            return string.Format("{0} {1}", Pinyin, Name);
        }
    }

    public enum Sex
    {
        男 = 0,
        女 = 1
    }
}
