using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace BookRent
{
    class Configs
    {
        public static bool ConfirmUpdate
        {
            get
            {
                var str = ConfigurationManager.AppSettings["ConfirmUpdate"];
                bool result;
                bool isSuccess = bool.TryParse(str, out result);

                if (!isSuccess)
                { // 默认弹确认框
                    result = true;
                }

                return result;
            }
        }
    }
}
