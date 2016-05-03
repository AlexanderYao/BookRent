using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace BookRent
{
    public class MainVm
    {
        protected MainVm()
        {
            Messenger.Default.Register<string>(this, OnStatus);
        }

        public static MainVm Create()
        {
            return ViewModelSource.Create(() => new MainVm());
        }

        public virtual string Status { get; set; }

        private void OnStatus(string value)
        {
            this.Status = value;
        }
    }
}
