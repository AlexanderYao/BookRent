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
        private IDialogService _dialogService { get { return GetService<IDialogService>(); } }
        private BookRepository _bookRepo;

        public MainVm()
        {
            _bookRepo = new BookRepository();

            Books = new ObservableCollection<Book>();
            QueryBookCmd = new DelegateCommand(QueryBook);
            AddBookCmd = new DelegateCommand(AddBook);
            DelBookCmd = new DelegateCommand(DelBook);
            UpdateBookCmd = new DelegateCommand(UpdateBook);
        }

        public ObservableCollection<Book> Books { get; set; }

        private string _status;
        public string Status
        {
            get { return _status; }
            set { base.SetProperty(ref _status, value); }
        }

        private Book _selectedBook;
        public Book SelectedBook
        {
            get { return _selectedBook; }
            set { base.SetProperty(ref _selectedBook, value); }
        }

        public ICommand QueryBookCmd { get; private set; }
        public ICommand AddBookCmd { get; private set; }
        public ICommand DelBookCmd { get; private set; }
        public ICommand UpdateBookCmd { get; private set; }

        private void QueryBook()
        {
            var books = _bookRepo.Query();
            Books.Clear();
            foreach (var item in books)
            {
                Books.Add(item);
            }
        }

        private void AddBook()
        {
            var vm = new BookDialogVm();
            vm.Book = new Book { InDate = DateTime.Today };
            Action<CancelEventArgs> addMethod = x =>
            {
                var result = _bookRepo.Add(vm.Book);
                Status = string.Format("新增{0}！", result ? "成功" : "失败");

                if (result)
                {
                    Books.Add(vm.Book);
                }
            };
            AddOrUpdate(addMethod, vm);
        }

        private void DelBook()
        {
            if (null == SelectedBook)
            {
                return;
            }

            var result = _bookRepo.Delete(SelectedBook);
            Status = string.Format("删除{0}！", result ? "成功" : "失败");
            if (result)
            {
                Books.Remove(SelectedBook);
            }
        }

        private void UpdateBook()
        {
            if (null == SelectedBook)
            {
                return;
            }

            var vm = new BookDialogVm();
            vm.Book = SelectedBook.Clone();
            Action<CancelEventArgs> updateMethod = x =>
            {
                var result = _bookRepo.Update(vm.Book);
                Status = string.Format("更新{0}！", result ? "成功" : "失败");

                if (result)
                {
                    var index = Books.IndexOf(vm.Book);
                    Books[index] = vm.Book;
                }
            };
            AddOrUpdate(updateMethod, vm);
        }

        private void AddOrUpdate(Action<CancelEventArgs> saveMethod, BookDialogVm vm)
        {
            var saveCmd = new UICommand()
            {
                Caption = "保存",
                IsCancel = false,
                IsDefault = true,
                Command = new DelegateCommand<CancelEventArgs>(saveMethod),
            };

            var cancelCmd = new UICommand()
            {
                Id = MessageBoxResult.Cancel,
                Caption = "取消",
                IsCancel = true,
                IsDefault = false,
            };

            _dialogService.ShowDialog(new[] { saveCmd, cancelCmd }, "新增 或 编辑", vm);
        }
    }
}
