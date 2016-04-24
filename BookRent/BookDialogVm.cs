using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookRent
{
    public class BookDialogVm : MyViewModelBase
    {
        public BookDialogVm()
        {

        }

        private Book _book;
        public Book Book
        {
            get { return _book; }
            set { base.SetProperty(ref _book, value); }
        }

    }
}
