using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Text;

namespace BookRent
{
    class ConfigUtil
    {
        public static T Parse<T>(string appSettingKey, T defaultValue = default(T))
        {
            T result = defaultValue;
            var str = ConfigurationManager.AppSettings[appSettingKey];

            try
            {
                MethodInfo method = typeof(T).GetMethod("Parse", BindingFlags.Static | BindingFlags.Public, null, new Type[] { typeof(string) }, null);
                result = (T)method.Invoke(null, new object[] { str });
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }

            return result;
        }

        public static bool ConfirmUpdate
        {
            get
            {
                return Parse<Boolean>("修改是否弹确认框", false);
            }
        }
    }
}
