﻿using System;
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
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            Application.Current.DispatcherUnhandledException += Current_DispatcherUnhandledException;

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
