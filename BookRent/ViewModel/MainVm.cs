﻿using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Threading;

namespace BookRent
{
    public class MainVm
    {
        private Dispatcher dispatcher;

        protected MainVm()
        {
            dispatcher = Dispatcher.CurrentDispatcher;

            Messenger.Default.Register<string>(this, OnStatus);
            Messenger.Default.Register<NotifyMsg>(this, OnNofity);

            AppId = ConfigurationManager.AppSettings["AppId"];
            AppName = ConfigurationManager.AppSettings["AppName"];
        }

        public static MainVm Create()
        {
            return ViewModelSource.Create(() => new MainVm());
        }

        public virtual string AppId { get; set; }

        public virtual string AppName { get; set; }

        public virtual string Status { get; set; }

        public virtual INotificationService NotifyService { get { return null; } }

        private void OnStatus(string value)
        {
            this.Status = value;
        }

        private void OnNofity(NotifyMsg msg)
        {
            if (null == dispatcher) return;

            dispatcher.BeginInvoke((Action<string>)Notify, msg.Msg);
        }

        private void Notify(string msg)
        {
            //new BitmapImage(new Uri(@"/BookRent;component/Resources/rent.png", UriKind.Relative))
            var notify = NotifyService.CreatePredefinedNotification("到期提醒", null, msg, null);
            notify.ShowAsync();
        }
    }
}
