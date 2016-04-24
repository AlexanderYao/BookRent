using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class Book
    {
        public string ISBN { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public DateTime PubDate { get; set; }

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
}
