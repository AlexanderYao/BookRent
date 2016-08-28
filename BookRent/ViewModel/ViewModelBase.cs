using DevExpress.Mvvm;
using System;
using System.Windows;

namespace BookRent
{
    /// <summary>
    /// 提供发送消息等基本功能
    /// </summary>
    public abstract class MyViewModelBase
    {
        /// <summary>
        /// 状态栏
        /// </summary>
        public virtual string Status
        {
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    return;
                }

                Messenger.Default.Send(value);
            }
        }

        /// <summary>
        /// 发送消息
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="isAsync"></param>
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

        /// <summary>
        /// 弹出框
        /// </summary>
        public virtual IMessageBoxService MessageBoxService { get { return null; } }
    }
}
