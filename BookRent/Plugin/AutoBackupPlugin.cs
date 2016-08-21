using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
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

        public string BackupDir
        {
            get
            {
                var str = ConfigurationManager.AppSettings["备份目录"];
                
                if (!Directory.Exists(str) || !IsFolderWritable(str))
                { // 默认放My Documents
                    str = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                }

                return str;
            }
        }

        private bool IsFolderWritable(string str)
        {
            try
            {
                using (FileStream fs = File.Create(
                    Path.Combine(str, Path.GetRandomFileName()),
                    1, FileOptions.DeleteOnClose)) { }
                return true;
            }
            catch (Exception ex)
            {
                Logger.Debug(ex);
                return false;
            }
        }

        public void Init()
        {
            TimeSpan result = ConfigUtil.Parse<TimeSpan>("备份间隔", TimeSpan.FromMinutes(5d));
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
