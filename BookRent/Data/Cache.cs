using System;
using System.Collections.Generic;

namespace BookRent
{
    /// <summary>
    /// 缓存，只应在Data\*Repository中使用，
    /// </summary>
    class Cache
    {
        private static Dictionary<Type, Dictionary<long, object>> dic = new Dictionary<Type, Dictionary<long, object>>();
        private static Dictionary<Type, bool> dicBool = new Dictionary<Type, bool>();

        /// <summary>
        /// 是否查询过整张表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        internal static bool HasSetList<T>()
        {
            var key = typeof(T);
            return dicBool.ContainsKey(key) && dicBool[key];
        }

        /// <summary>
        /// 将整张表放入缓存
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        internal static void SetList<T>(IList<T> list) where T : IIdentity
        {
            foreach (var item in list)
            {
                Set<T>(item);
            }
            dicBool[typeof(T)] = true;
        }

        /// <summary>
        /// 读取整张表，若不存在返回空
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        internal static IList<T> GetList<T>()
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

        /// <summary>
        /// 根据类型T+主键id查找缓存
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        internal static T Get<T>(long id)
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

        /// <summary>
        /// 根据类型T+主键id设置缓存
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        internal static void Set<T>(T t) where T : IIdentity
        {
            var key = typeof(T);

            if (!dic.ContainsKey(key))
            {
                dic[key] = new Dictionary<long, object>();
            }

            var id = (t as IIdentity).Id;
            dic[key][id] = t;
        }

        /// <summary>
        /// 根据类型T+主键id移除缓存
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        internal static void Remove<T>(long id)
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
