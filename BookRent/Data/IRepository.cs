using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    /// <summary>
    /// 所有数据仓库的接口
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T>
    {
        /// <summary>
        /// 查询所有
        /// </summary>
        /// <returns></returns>
        IList<T> Query();
        /// <summary>
        /// 查询所有，并根据条件筛选
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        IList<T> Query(Func<T, bool> condition);
        /// <summary>
        /// 添加项，返回主键
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        long Add(T item);
        /// <summary>
        /// 删除项，返回是否成功
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        bool Delete(T item);
        /// <summary>
        /// 更新项，返回是否成功
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        bool Update(T item);
    }
}
