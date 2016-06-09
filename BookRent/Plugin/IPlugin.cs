using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    interface IPlugin
    {
        bool IsOn { get; set; }
        void Init();
        void Close();
    }
}
