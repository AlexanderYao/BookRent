﻿using System;
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
    public class Person : IIdentity
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
        /// <summary>
        /// 联系方式
        /// </summary>
        public string PhoneNo { get; set; }
        /// <summary>
        /// 拼音首字母
        /// </summary>
        public string Pinyin { get; set; }

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
            return null == Name ? Id.GetHashCode() : Name.GetHashCode();
        }

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
