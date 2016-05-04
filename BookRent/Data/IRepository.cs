using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public interface IRepository<T>
    {
        IList<T> Query();
        long Add(T item);
        bool Delete(T item);
        bool Update(T item);
    }
}
