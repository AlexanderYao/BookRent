﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    [Serializable]
    public class Book
    {
        public long Id { get; set; }
        public string ISBN { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 入库日期
        /// </summary>
        public DateTime InDate { get; set; }
        public double Price { get; set; }
        /// <summary>
        /// 入库方式
        /// </summary>
        //public InMode InMode { get; set; }

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
    }

    public enum InMode
    {
        手工 = 0,
        自动 = 1
    }
}