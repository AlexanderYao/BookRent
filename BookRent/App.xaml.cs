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
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            Application.Current.DispatcherUnhandledException += Current_DispatcherUnhandledException;

            var main = new MainWindow();
            Set(main, "width");
            Set(main, "height");
            Set(main, "top");
            Set(main, "left");
            main.Show();
        }

        private void Set(MainWindow main, string prop)
        {
            var width = IniFile.Instance.Read(prop);
            if (!string.IsNullOrEmpty(width)) main.Width = double.Parse(width);
        }

        private void Current_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            //ILog log = BookRentApp.Current.GetService<ILog>();
            //log.Error(e.Exception);

            LogError(e.Exception);
            e.Handled = true;
        }

        private void LogError(Exception ex)
        {
            MessageBox.Show(ex.ToString());
        }
    }
}
