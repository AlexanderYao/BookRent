using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public abstract class MyViewModelBase : ViewModelBase, INotifyPropertyChanged
    {
        protected new void SetProperty<T>(ref T storage, T value, [CallerMemberName] string propName = null)
        {
            if (object.Equals(storage, value)) return;
            storage = value;
            this.RaisePropertyChanged(propName);
        }
    }
}
