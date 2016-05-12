using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace BookRent
{
    /// <summary>
    /// 提供发送消息等基本功能
    /// </summary>
    public abstract class MyViewModelBase
    {
        public virtual string Status
        {
            set
            {
                if (null == value) return;
                Messenger.Default.Send(value);
            }
        }

        public virtual void SendMsg<T>(T t, bool isAsync = false)
        {
            if (!isAsync)
            {
                Messenger.Default.Send<T>(t);
            }
            else
            {
                Action<T> action = Messenger.Default.Send<T>;
                Application.Current.Dispatcher.BeginInvoke(action, t);
            }
        }

        public virtual IMessageBoxService MessageBoxService { get { return null; } }
    }
}
