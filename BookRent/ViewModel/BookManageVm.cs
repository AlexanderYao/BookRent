using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Input;

namespace BookRent
{
    public class BookManageVm : MyViewModelBase
    {
        private IRepository<Book> _bookRepo;
        protected BookManageVm()
        {
            _bookRepo = new BookRepository();
            Books = new ObservableCollection<Book>();
        }

        public static BookManageVm Create()
        {
            return ViewModelSource.Create(() => new BookManageVm());
        }

        public ObservableCollection<Book> Books { get; set; }

        public virtual Book SelectedBook { get; set; }

        public virtual IMessageBoxService MessageBoxService { get { return null; } }

        public void Query()
        {
            var books = _bookRepo.Query();
            Books.Clear();
            foreach (var item in books)
            {
                Books.Add(item);
            }
        }

        public void Add()
        {
            var book = new Book
            {
                ISBN = string.Empty,
                Name = string.Empty,
                InDate = DateTime.Today,
                Price = 0d
            };

            long rowid = _bookRepo.Add(book);
            bool result = rowid > 0;
            Status = string.Format("新增{0}！", result ? "成功" : "失败");

            if (result)
            {
                Books.Add(book);
                SendMsg(new BookChangedMsg());
            }
        }

        public void Delete()
        {
            if (null == SelectedBook)
            {
                return;
            }

            if (MessageBoxService.Show("确定要删除吗？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            var result = _bookRepo.Delete(SelectedBook);
            Status = string.Format("删除{0}！", result ? "成功" : "失败");
            if (result)
            {
                Books.Remove(SelectedBook);
                SendMsg(new BookChangedMsg());
            }
        }

        public void Update()
        {
            if (null == SelectedBook)
            {
                return;
            }

            var result = _bookRepo.Update(SelectedBook);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                var index = Books.IndexOf(SelectedBook);
                Books[index] = SelectedBook;
                SendMsg(new BookChangedMsg());
            }
        }
    }
}
