using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BookRent
{
    /// <summary>
    /// 插件：自动备份
    /// </summary>
    class AutoBackupPlugin : IPlugin
    {
        private Timer _timer;

        public bool IsOn { get; set; }

        /// <summary>
        /// 备份目录
        /// </summary>
        public string BackupDir { get; set; }

        public void Init()
        {
            BackupDir = IniFile.Instance.Read("BackupDir");
            if (!Directory.Exists(BackupDir))
            { // 默认放C盘根目录
                BackupDir = "C:\\";
            }

            var str = IniFile.Instance.Read("BackupTime");
            TimeSpan result;
            bool canParse = TimeSpan.TryParse(str, out result);

            if (!canParse)
            { // 默认取5分钟
                result = TimeSpan.FromMinutes(5d);
            }

            _timer = new Timer(DoWork, null, result, result);
        }

        public void Close()
        {
            if (null != _timer)
            {
                _timer.Dispose();
            }
        }

        private void DoWork(object state)
        {
            var dbPath = ConfigurationManager.AppSettings["DefaultDbPath"];
            if (!File.Exists(dbPath))
            {
                return;
            }

            var dest = Path.Combine(BackupDir, "BookRent.db");
            File.Copy(dbPath, dest, true);
        }
    }
}
