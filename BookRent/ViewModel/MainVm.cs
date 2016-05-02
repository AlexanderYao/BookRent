using DevExpress.Mvvm;
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
    public class MainVm : MyViewModelBase
    {
        public MainVm()
        {
        }

        private string _status;
        public string Status
        {
            get { return _status; }
            set { base.SetProperty(ref _status, value); }
        }
    }
}
