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
    public class RentManageVm : MyViewModelBase
    {
        private IRepository<Rent> _repo;
        private IRepository<Person> _repoPerson;
        private IRepository<Book> _repoBook;

        protected RentManageVm()
        {
            _repo = new RentRepository();
            _repoPerson = new PersonRepository();
            _repoBook = new BookRepository();

            Rents = new ObservableCollection<Rent>();
            Persons = new ObservableCollection<Person>(_repoPerson.Query());
            Books = new ObservableCollection<Book>(_repoBook.Query());
            ToBeRentBooks = new ObservableCollection<Book>();

            Messenger.Default.Register<ItemChangedMsg<Person>>(this, OnPersonChanged);
            Messenger.Default.Register<ItemChangedMsg<Book>>(this, OnBookChanged);
        }

        public static RentManageVm Create()
        {
            return ViewModelSource.Create(() => new RentManageVm());
        }

        public ObservableCollection<Person> Persons { get; private set; }
        public ObservableCollection<Book> Books { get; private set; }
        public ObservableCollection<Book> ToBeRentBooks { get; private set; }
        public ObservableCollection<Rent> Rents { get; private set; }

        public virtual Person CurrentPerson { get; set; }
        public virtual Book CurrentBook { get; set; }
        public virtual Book ToBeRentBook { get; set; }
        public virtual Rent CurrentRent { get; set; }

        public virtual IMessageBoxService MessageBoxService { get { return null; } }

        public void AddBook()
        {
            if (null == CurrentBook || ToBeRentBooks.Contains(CurrentBook))
            {
                return;
            }

            if (_repo.Query(e => e.Book == CurrentBook && e.EndDate == DateTime.MinValue).Count > 0)
            {
                MessageBoxService.Show("这本书已经被借走了", "提示");
                return;
            }

            ToBeRentBooks.Add(CurrentBook);
        }

        public void DelBook()
        {
            if (null == ToBeRentBook || !ToBeRentBooks.Contains(ToBeRentBook))
            {
                return;
            }

            ToBeRentBooks.Remove(ToBeRentBook);
        }

        public void ConfirmRent()
        {
            if (null == CurrentPerson)
            {
                MessageBoxService.Show("请选择借书的人", "提示");
                return;
            }

            if (ToBeRentBooks.Count == 0)
            {
                MessageBoxService.Show("请选择要借的书", "提示");
                return;
            }

            var sb = new StringBuilder();
            sb.AppendLine(string.Format("[{0}]将借出以下书籍：", CurrentPerson.Name));
            foreach (var item in ToBeRentBooks)
            {
                sb.AppendLine(string.Format("《{0}》", item.Name));
            }
            sb.AppendLine("是否确认？");

            if (MessageBoxService.Show(sb.ToString(), "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            Rent();
        }

        private void Rent()
        {
            bool result = true;
            foreach (var item in ToBeRentBooks)
            {
                var rent = new Rent
                {
                    Person = CurrentPerson,
                    Book = item,
                    StartDate = DateTime.Now,
                };

                var rowid = _repo.Add(rent);
                result &= rowid > 0;
                if (result)
                {
                    rent.Id = rowid;
                    Rents.Insert(0, rent);
                }
            }

            if (result)
            {
                Status = string.Format("借出{0}！", result ? "成功" : "失败");
                ToBeRentBooks.Clear();
            }
        }

        public void Query()
        {
            var rents = _repo.Query();
            Rents.Clear();
            foreach (var item in rents)
            {
                Rents.Add(item);
            }
        }

        //public void Add()
        //{
        //    var rent = new Rent
        //    {
        //        Person = new Person { Id = 1 },
        //        Book = new Book { Id = 1 },
        //        StartDate = DateTime.Today,
        //        EndDate = DateTime.MaxValue
        //    };

        //    var rowid = _repo.Add(rent);
        //    var result = rowid > 0;
        //    Status = string.Format("新增{0}！", result ? "成功" : "失败");

        //    if (result)
        //    {
        //        rent.Id = rowid;
        //        Rents.Add(rent);
        //    }
        //}

        //public void Delete()
        //{
        //    if (null == CurrentRent)
        //    {
        //        return;
        //    }

        //    if (MessageBoxService.Show("确定要删除吗？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
        //    {
        //        return;
        //    }

        //    var result = _repo.Delete(CurrentRent);
        //    Status = string.Format("删除{0}！", result ? "成功" : "失败");
        //    if (result)
        //    {
        //        Rents.Remove(CurrentRent);
        //    }
        //}

        public void Update()
        {
            if (null == CurrentRent)
            {
                return;
            }

            var result = _repo.Update(CurrentRent);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                var index = Rents.IndexOf(CurrentRent);
                Rents[index] = CurrentRent;
            }
        }

        private void OnPersonChanged(ItemChangedMsg<Person> msg)
        {
            OnMsg(Persons, msg);
        }

        private void OnBookChanged(ItemChangedMsg<Book> msg)
        {
            OnMsg(Books, msg);
        }

        private void OnMsg<T>(ObservableCollection<T> collection, ItemChangedMsg<T> msg)
        {
            switch (msg.Action)
            {
                case ActionMode.Add:
                    collection.Add(msg.Item);
                    break;
                case ActionMode.Delete:
                    collection.Remove(msg.Item);
                    break;
                case ActionMode.Update:
                    var index = collection.IndexOf(msg.Item);
                    collection[index] = msg.Item;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}
