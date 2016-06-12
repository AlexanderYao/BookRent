using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    /// <summary>
    /// 初始化所有插件的加载+是否启用
    /// </summary>
    class PluginManager
    {
        private List<IPlugin> _list;

        public PluginManager()
        {
            _list = new List<IPlugin> { 
                new AutoBackupPlugin(), 
                new NotifyPlugin(),
                new IsbnPlugin(),
            };
        }

        public void Init()
        {
            _list.ForEach(SetIsOn);
            _list.Where(e => e.IsOn == true).Foreach(e => e.Init());
        }

        private void SetIsOn(IPlugin item)
        {
            var key = item.GetType().Name;
            var str = ConfigurationManager.AppSettings[key];
            bool result;
            bool isSuccess = bool.TryParse(str, out result);

            if (!isSuccess)
            { // 默认不启用
                result = false;
            }

            item.IsOn = result;
        }

        public void Close()
        {
            _list.Where(e => e.IsOn == true).Foreach(e => e.Init());
        }
    }
}
