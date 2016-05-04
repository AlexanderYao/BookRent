using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class Cache
    {
        private static Dictionary<long, Book> Books = new Dictionary<long, Book>();
        private static Dictionary<long, Person> Persons = new Dictionary<long, Person>();
        private static Dictionary<Type, Dictionary<long, object>> dic = new Dictionary<Type, Dictionary<long, object>>();

        public static T Get<T>(long id)
        {
            var key = typeof(T);

            if (!dic.ContainsKey(key))
            {
                dic[key] = new Dictionary<long, object>();
                return default(T);
            }
            else
            {
                if (dic[key].ContainsKey(id)) return (T)dic[key][id];
                else return default(T);
            }
        }

        public static void Set<T>(long id, T t)
        {
            var key = typeof(T);

            if (!dic.ContainsKey(key))
            {
                dic[key] = new Dictionary<long, object>();
            }

            dic[key][id] = t;
        }

        public static void Remove<T>(long id)
        {
            var key = typeof(T);

            if (!dic.ContainsKey(key))
            {
                return;
            }
            else
            {
                dic[key].Remove(id);

                if (dic[key].Count == 0) dic.Remove(key);
            }
        }

        //public static Book GetBook(long id)
        //{
        //    if (Books.ContainsKey(id)) return Books[id];
        //    else return null;
        //}

        //public static void SetBook(long id, Book item)
        //{
        //    Books[id] = item;
        //}

        //public static void RemoveBook(long id)
        //{
        //    Books.Remove(id);
        //}

        //public static Person GetPerson(long id)
        //{
        //    if (Persons.ContainsKey(id)) return Persons[id];
        //    else return null;
        //}

        //public static void SetPerson(long id, Person item)
        //{
        //    Persons[id] = item;
        //}

        //public static void RemovePerson(long id)
        //{
        //    Persons.Remove(id);
        //}
    }
}
