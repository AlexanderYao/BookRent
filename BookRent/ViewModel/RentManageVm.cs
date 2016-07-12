using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace BookRent
{
    public class RentManageVm : MyViewModelBase
    {
        private IRepository<Rent> _repo;
        private IRepository<Person> _repoPerson;
        private IRepository<Book> _repoBook;
        private int _rentCount;
        private int _canRentCount;

        protected RentManageVm()
        {
            _repo = new RentRepository();
            _repoPerson = new PersonRepository();
            _repoBook = new BookRepository();

            _canRentCount = ConfigUtil.Parse<Int32>("每人能借多少本", 10);
            _rentCount = 0;

            Persons = new ObservableCollection<Person>();
            Books = new ObservableCollection<Book>();
            Rents = new ObservableCollection<Rent>();
            CurrentRents = new ObservableCollection<Rent>();
            ToBeRents = new ObservableCollection<Rent>();

            Messenger.Default.Register<ItemChangedMsg<Person>>(this, OnPersonChanged);
            Messenger.Default.Register<ItemChangedMsg<Book>>(this, OnBookChanged);
            Messenger.Default.Register<UpdateCountMsg>(this, OnUpdateCount);

            Init();
        }

        public static RentManageVm Create()
        {
            return ViewModelSource.Create(() => new RentManageVm());
        }

        public ObservableCollection<Person> Persons { get; private set; }
        public ObservableCollection<Book> Books { get; private set; }
        public ObservableCollection<Rent> ToBeRents { get; private set; }
        public ObservableCollection<Rent> Rents { get; private set; }
        public ObservableCollection<Rent> CurrentRents { get; private set; }

        public virtual Person CurrentPerson { get; set; }
        public virtual Book CurrentBook { get; set; }
        public virtual Rent ToBeRent { get; set; }
        public virtual Rent CurrentRent { get; set; }

        public void Init()
        {
            var persons = _repoPerson.Query();
            if (null != persons && persons.Count > 0)
            {
                foreach (var item in persons)
                {
                    Persons.Add(item);
                }
            }

            var books = _repoBook.Query();
            if (null != books && books.Count > 0)
            {
                foreach (var item in books)
                {
                    Books.Add(item);
                }
            }
        }

        public void Clear()
        {
            CurrentBook = null;
            ToBeRents.Clear();
            QueryRent();
        }

        public void AddRent()
        {
            if (null == CurrentPerson)
            {
                MessageBoxService.Show("请选择借书的人", "提示");
                return;
            }

            if (null == CurrentBook)
            {
                MessageBoxService.Show("请选择要借的书", "提示");
                return;
            }

            if (null != ToBeRents.FirstOrDefault(e => e.Book == CurrentBook))
            {
                return;
            }

            if (CurrentBook.AvailableCount <= 0)
            {
                MessageBoxService.Show("这本书已经被借空了", "提示");
                return;
            }

            var rent = new Rent
            {
                Person = CurrentPerson,
                Book = CurrentBook,
                StartDate = DateTime.Now,
                Count = 1,
            };
            ToBeRents.Add(rent);
        }

        public void DelRent()
        {
            if (null == ToBeRent || !ToBeRents.Contains(ToBeRent))
            {
                return;
            }

            ToBeRents.Remove(ToBeRent);
        }

        public void ConfirmRent()
        {
            if (null == CurrentPerson)
            {
                MessageBoxService.Show("请选择借书的人", "提示");
                return;
            }

            if (ToBeRents.Count == 0)
            {
                MessageBoxService.Show("请选择要借的书", "提示");
                return;
            }

            var tmp = ToBeRents.FirstOrDefault(e => e.Count > e.Book.AvailableCount);
            if (null != tmp)
            {
                MessageBoxService.Show(string.Format("[{0}]的数量超出了现有数量", tmp.Book.Name), "提示");
                return;
            }

            var toRentCount = ToBeRents.Sum(e => e.Count);
            if (toRentCount + _rentCount > _canRentCount)
            {
                MessageBoxService.Show(string.Format("已借出{0}本 + 将借{1}本 > {2}本，每个人在借数量不超过{2}本",
                    _rentCount, toRentCount, _canRentCount), "提示");
                return;
            }

            var sb = new StringBuilder();
            sb.AppendLine(string.Format("[{0}]将借出以下书籍：", CurrentPerson.Name));
            foreach (var item in ToBeRents)
            {
                sb.AppendLine(string.Format("《{0}》 {1}本", item.Book.Name, item.Count));
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
            foreach (var item in ToBeRents)
            {
                item.StartDate = DateTime.Now;
                var rowid = _repo.Add(item);

                item.Book.AvailableCount -= item.Count;
                _repoBook.Update(item.Book);
                SendMsg(new UpdateCountMsg(item.Book));

                result &= rowid > 0;
                if (result)
                {
                    item.Id = rowid;
                    Rents.Insert(0, item);
                }
            }

            if (result)
            {
                Status = string.Format("借出{0}！", result ? "成功" : "失败");
                ToBeRents.Clear();
            }
        }

        public void QueryRent()
        {
            if (null == CurrentPerson)
            {
                Status = string.Format("请选择会员，再查询相应的借阅记录");
                return;
            }

            var rents = _repo.Query(e => e.Person == CurrentPerson && e.EndDate == DateTime.MinValue);
            Rents.Clear();
            foreach (var item in rents)
            {
                Rents.Add(item);
            }
            _rentCount = rents.Sum(e => e.Count);

            Status = string.Format("{0}: 未归还{1}本", CurrentPerson.Name, _rentCount);
        }

        public void QueryAll()
        {
            if (null == CurrentPerson)
            {
                Status = string.Format("请选择会员，再查询相应的借阅记录");
                return;
            }

            var rents = _repo.Query(e => e.Person == CurrentPerson);
            Rents.Clear();
            foreach (var item in rents)
            {
                Rents.Add(item);
            }
            _rentCount = rents.Where(e => e.EndDate == DateTime.MinValue).Sum(e => e.Count);

            Status = string.Format("{0}: 未归还{1}本，总共借阅过{2}次",
                CurrentPerson.Name,
                _rentCount,
                rents.Count);
        }

        public void Return()
        {
            if (CurrentRents.Count == 0)
            {
                MessageBoxService.Show("请选择要归还的记录", "提示");
                return;
            }

            var sb = new StringBuilder();
            sb.AppendLine(string.Format("[{0}]将归还以下书籍：", CurrentPerson.Name));
            foreach (var item in CurrentRents)
            {
                sb.AppendLine(string.Format("《{0}》 {1}本", item.Book.Name, item.Count));
            }
            sb.AppendLine("是否确认？");

            if (MessageBoxService.Show(sb.ToString(), "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            var result = true;
            foreach (var item in CurrentRents)
            {
                item.EndDate = DateTime.Now;
                var tmp = _repo.Update(item);

                item.Book.AvailableCount += item.Count;
                _repoBook.Update(item.Book);
                SendMsg(new UpdateCountMsg(item.Book));

                if (tmp)
                {
                    var index = Rents.IndexOf(item);
                    Rents[index] = item;
                }
                result &= tmp;
            }

            if (result)
            {
                Status = string.Format("归还{0}！", result ? "成功" : "失败");
            }
        }

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

        private void OnUpdateCount(UpdateCountMsg msg)
        {
            var index = Books.IndexOf(msg.Book);
            Books[index] = msg.Book;
        }
    }
}
