using System;

namespace BookRent
{
    /// <summary>
    /// 所有实体类的基类
    /// </summary>
    public interface IIdentity
    {
        /// <summary>
        /// 主键
        /// </summary>
        long Id { get; set; }
    }
}
