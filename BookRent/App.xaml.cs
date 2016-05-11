using DevExpress.Xpf.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Threading;

namespace BookRent
{
    public partial class App : Application
    {
        private PluginManager _pluginManager;

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);            
            this.DispatcherUnhandledException += Current_DispatcherUnhandledException;
            this.Exit += App_Exit;
            _pluginManager = new PluginManager();
            _pluginManager.Init();

            var main = new MainWindow();
            Set(main, "Width");
            Set(main, "Height");
            Set(main, "Top");
            Set(main, "Left");
            main.Show();
        }

        private void Set(MainWindow main, string prop)
        {
            var width = IniFile.Instance.Read(prop);
            if (!string.IsNullOrEmpty(width))
            {
                var value = double.Parse(width);
                main.GetType().GetProperty(prop).SetValue(main, value);
            }
        }

        private void Current_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            LogError(e.Exception);
            DXMessageBox.Show("抱歉哦，遇到问题需要关闭。请联系管理员！", "提示");
            e.Handled = true;
            Shutdown();
            //Application.Current.Shutdown();
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            _pluginManager.Close();
        }

        private void LogError(Exception ex)
        {
            Logger.Error(ex);
        }

        private void OnStartup_UpdateThemeName(object sender, StartupEventArgs e)
        {
            //DevExpress.Xpf.Core.ApplicationThemeHelper.UpdateApplicationThemeName();
        }
    }
}
