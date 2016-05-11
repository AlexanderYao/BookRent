using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    class PluginManager
    {
        private List<IPlugin> _list;

        public PluginManager()
        {
            _list = new List<IPlugin> { 
                new AutoBackupPlugin(), 
                new IsbnPlugin() 
            };
        }

        public void Init()
        {
            foreach (var item in _list)
            {
                item.Init();
            }
        }

        public void Close()
        {
            foreach (var item in _list)
            {
                item.Close();
            }
        }
    }
}
