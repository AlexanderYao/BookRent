using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class Logger
    {
        private static ILog log;

        static Logger()
        {
            log = LogManager.GetLogger("BookRent");
        }

        public static void Debug(string msg)
        {
            log.Debug(msg);
        }

        public static void Debug(Exception ex)
        {
            log.Debug(ExceptionDetail(ex));
        }

        public static void DebugFormat(string format, params object[] args)
        {
            log.DebugFormat(format, args);
        }

        public static void Error(string msg)
        {
            log.Error(msg);
        }

        public static void Error(Exception ex)
        {
            log.Error(ExceptionDetail(ex));
        }

        public static void ErrorFormat(string format, params object[] args)
        {
            log.ErrorFormat(format, args);
        }

        private static string ExceptionDetail(Exception ex)
        {
            var sb = new StringBuilder();
            GetExceptionDetail(sb, ex, 0);
            return sb.ToString();
        }

        private static void GetExceptionDetail(StringBuilder sb, Exception ex, int level)
        {
            sb.AppendFormat("[level-{0}] Exception: {1} \n", level, ex.Message);
            sb.AppendFormat("StackTrace: {0} \n", ex.StackTrace);

            if (null != ex.InnerException)
            {
                GetExceptionDetail(sb, ex.InnerException, level + 1);
            }
        }
    }
}
