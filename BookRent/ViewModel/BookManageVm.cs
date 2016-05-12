using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using DevExpress.Xpf.Grid;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;

namespace BookRent
{
    public class BookManageVm : MyViewModelBase
    {
        private IRepository<Book> _bookRepo;
        private object _synRoot;
        protected BookManageVm()
        {
            _synRoot = new object();
            _bookRepo = new BookRepository();
            Books = new ObservableCollection<Book>();

            Messenger.Default.Register<IsbnMsg>(this, IsbnAction.Rep, OnIsbnReply);
        }

        public static BookManageVm Create()
        {
            return ViewModelSource.Create(() => new BookManageVm());
        }

        public ObservableCollection<Book> Books { get; set; }

        public virtual Book SelectedBook { get; set; }

        public void Query()
        {
            var books = _bookRepo.Query();
            Books.Clear();
            foreach (var item in books)
            {
                Books.Add(item);
            }
            Status = string.Format("查询到{0}条记录", books.Count);
        }

        public void Add()
        {
            var book = new Book
            {
                ISBN = string.Empty,
                Name = string.Empty,
                InDate = DateTime.Now,
                Price = 0d,
                Pinyin = string.Empty,
            };

            long rowid = _bookRepo.Add(book);
            bool result = rowid > 0;
            Status = string.Format("新增{0}！", result ? "成功" : "失败");

            if (result)
            {
                Books.Add(book);
                SendMsg(new ItemChangedMsg<Book>(ActionMode.Add, book));
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
                SendMsg(new ItemChangedMsg<Book>(ActionMode.Delete, SelectedBook));
                Books.Remove(SelectedBook);
            }
        }

        public void Update(CellValueChangedEventArgs e)
        {
            if (null == SelectedBook)
            {
                return;
            }

            if (e.Column.FieldName == "Name" && !string.IsNullOrWhiteSpace(SelectedBook.Name))
            {
                SelectedBook.Pinyin = PinyinHelper.GetFirstPYLetter(SelectedBook.Name);
            }

            if (e.Column.FieldName == "ISBN" && !string.IsNullOrWhiteSpace(SelectedBook.ISBN))
            {
                Messenger.Default.Send<IsbnMsg>(new IsbnMsg(SelectedBook), IsbnAction.Req);
            }

            Save(SelectedBook);
        }

        private void Save(Book book)
        {
            var result = _bookRepo.Update(book);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                lock (_synRoot)
                {
                    var index = Books.IndexOf(book);
                    Books[index] = book;
                }
                
                SendMsg(new ItemChangedMsg<Book>(ActionMode.Update, book));
            }
        }

        private void OnIsbnReply(IsbnMsg msg)
        {
            var book = msg.Book;
            var target = Books.FirstOrDefault(e => e.ISBN == book.ISBN);

            if (null == target)
            {
                return;
            }

            target.Name = book.Name;
            target.Price = book.Price;
            target.Pinyin = PinyinHelper.GetFirstPYLetter(target.Name);
            Application.Current.Dispatcher.BeginInvoke((Action<Book>)Save, target);
        }
    }
}
