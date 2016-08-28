using DevExpress.Data;
using DevExpress.Xpf.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Security.Principal;
using System.Threading;
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
            DXSplashScreen.Show<SplashScreen>();
            CheckIsAdmin();
            AppDomain.CurrentDomain.UnhandledException += CurrentDomain_UnhandledException;
            this.DispatcherUnhandledException += Current_DispatcherUnhandledException;
            TaskScheduler.UnobservedTaskException += TaskScheduler_UnobservedTaskException;
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("zh-CN");

            base.OnStartup(e);

            this.Exit += App_Exit;
            _pluginManager = new PluginManager();
            _pluginManager.Init();

            var main = new MainWindow();
            Set(main, "Width");
            Set(main, "Height");
            Set(main, "Top");
            Set(main, "Left");
            main.Topmost = true;
            main.Show();
            DXSplashScreen.Close();
        }

        private bool CheckIsAdmin()
        {
            bool isAdmin;
            try
            {
                WindowsIdentity user = WindowsIdentity.GetCurrent();
                WindowsPrincipal principal = new WindowsPrincipal(user);
                isAdmin = principal.IsInRole(WindowsBuiltInRole.Administrator);
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                isAdmin = false;
            }
            Logger.DebugFormat("Is Admin: {0}", isAdmin ? "Yes" : "No");
            return isAdmin;
        }

        private void TaskScheduler_UnobservedTaskException(object sender, UnobservedTaskExceptionEventArgs e)
        {
            var aggregateEx = e.Exception.Flatten();

            foreach (var ex in aggregateEx.InnerExceptions)
            {
                Logger.Error(ex);
            }

            this.Dispatcher.Invoke(new Action(() =>
            {
                DXMessageBox.Show("抱歉哦，遇到问题需要关闭。请联系管理员！", "提示");
            }));

            Shutdown();
        }

        private void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            var ex = e.ExceptionObject as Exception;
            if (null != ex)
            {
                Logger.Error(ex);
            }
            else
            {
                Logger.Error(e.ExceptionObject.ToString());
            }

            DXMessageBox.Show("抱歉哦，遇到问题需要关闭。请联系管理员！", "提示");
            Shutdown();
        }

        private void Current_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            Logger.Error(e.Exception);
            DXMessageBox.Show("抱歉哦，遇到问题需要关闭。请联系管理员！", "提示");
            e.Handled = true;
            Shutdown();
        }

        private void Set(MainWindow main, string prop)
        {
            var width = IniFile.Instance.Read(prop);
            if (!string.IsNullOrEmpty(width))
            {
                var value = double.Parse(width);
                main.GetType().GetProperty(prop).SetValue(main, value, null);
            }
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            _pluginManager.Close();
        }
    }
}
