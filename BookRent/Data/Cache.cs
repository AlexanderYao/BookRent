using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class Cache
    {
        private static Dictionary<Type, Dictionary<long, object>> dic = new Dictionary<Type, Dictionary<long, object>>();
        private static Dictionary<Type, bool> dicBool = new Dictionary<Type, bool>();

        public static bool HasSetList<T>()
        {
            var key = typeof(T);
            return dicBool.ContainsKey(key) && dicBool[key];
        }

        public static void SetList<T>(IList<T> list) where T : IIdentity
        {
            foreach (var item in list)
            {
                Set<T>(item);
            }
            dicBool[typeof(T)] = true;
        }

        public static IList<T> GetList<T>()
        {
            var key = typeof(T);
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            else
            {
                var result = new List<T>();
                var tmp = dic[key].Values;
                foreach (var item in tmp)
                {
                    result.Add((T)item);
                }
                return result;
            }
        }

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

        public static void Set<T>(T t) where T : IIdentity
        {
            var key = typeof(T);

            if (!dic.ContainsKey(key))
            {
                dic[key] = new Dictionary<long, object>();
            }

            var id = (t as IIdentity).Id;
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
    }
}
