using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookRent
{
    public class ModelBase : IIdentity
    {
        public long Id { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as IIdentity;
            if (null == other)
            {
                return false;
            }

            return other.Id == this.Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
