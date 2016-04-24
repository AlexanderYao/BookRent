using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace BookRent
{
    public class MainVm : MyViewModelBase
    {
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
            var dialog = new BookDialog();
            var result = dialog.ShowDialog();
            if (result.HasValue && result.Value)
            {
                Status = "新增成功！";
            }
        }

        private void DelBook()
        {

        }

        private void UpdateBook()
        {

        }
    }
}
