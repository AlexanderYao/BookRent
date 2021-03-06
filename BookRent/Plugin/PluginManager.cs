﻿using System;
using System.Collections.Generic;
using System.Linq;

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
            bool result = ConfigUtil.Parse<Boolean>(key, false);
            item.IsOn = result;
        }

        public void Close()
        {
            _list.Where(e => e.IsOn == true).Foreach(e => e.Close());
        }
    }
}
