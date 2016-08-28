
namespace BookRent
{
    /// <summary>
    /// 所有插件的接口
    /// </summary>
    interface IPlugin
    {
        /// <summary>
        /// 是否启用
        /// </summary>
        bool IsOn { get; set; }
        /// <summary>
        /// 初始化
        /// </summary>
        void Init();
        /// <summary>
        /// 关闭
        /// </summary>
        void Close();
    }
}
