using DevExpress.Mvvm;
using DevExpress.Mvvm.POCO;
using DevExpress.Xpf.Grid;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Input;

namespace BookRent
{
    public class PersonManageVm : MyViewModelBase
    {
        private IRepository<Person> _repo;
        private IRepository<Rent> _rentRepo;

        protected PersonManageVm()
        {
            _repo = new PersonRepository();
            _rentRepo = new RentRepository();

            Persons = new ObservableCollection<Person>();
            SelectedPersons = new ObservableCollection<Person>();
        }

        public static PersonManageVm Create()
        {
            return ViewModelSource.Create(() => new PersonManageVm());
        }

        public ObservableCollection<Person> Persons { get; set; }

        public ObservableCollection<Person> SelectedPersons { get; set; }

        public virtual Person SelectedPerson { get; set; }

        public IEnumerable<Sex> Sexes
        {
            get
            {
                return Enum.GetValues(typeof(Sex)).Cast<Sex>();
            }
        }

        public void Query()
        {
            var persons = _repo.Query();
            Persons.Clear();
            foreach (var item in persons)
            {
                Persons.Add(item);
            }
            Status = string.Format("查询到{0}条记录", persons.Count);
        }

        public void Add()
        {
            var person = new Person
            {
                Name = string.Empty,
                Sex = Sex.男,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddYears(1),
                Fee = 0d,
                Deposit = 0d,
                PhoneNo = string.Empty,
                Pinyin = string.Empty,
            };

            var rowid = _repo.Add(person);
            var result = rowid > 0;
            Status = string.Format("新增{0}！", result ? "成功" : "失败");

            if (result)
            {
                Persons.Add(person);
                SendMsg(new ItemChangedMsg<Person>(ActionMode.Add, person));
            }
        }

        public void Delete()
        {
            if (SelectedPersons.Count == 0)
            {
                Status = "请选中要删除的记录";
                return;
            }

            if (_rentRepo.Query(e => e.Person == SelectedPerson && e.EndDate == DateTime.MinValue).Count > 0)
            {
                MessageBoxService.Show(string.Format("[{0}]存在未归还的记录，不允许删除", SelectedPerson.Name), "提示");
                return;
            }

            if (MessageBoxService.Show(string.Format("确定要删除{0}吗？", SelectedPersons.ToString(e => e.Name)), "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            int count = 0;
            foreach (var item in SelectedPersons.ToArray())
            {
                var result = _repo.Delete(item);

                if (result)
                {
                    count++;
                    SendMsg(new ItemChangedMsg<Person>(ActionMode.Delete, item));
                    Persons.Remove(item);
                }
            }
            Status = string.Format("删除{0}人！", count);
        }

        public void Update(CellValueChangedEventArgs e)
        {
            if (null == SelectedPerson)
            {
                return;
            }

            if (MessageBoxService.Show(
                string.Format("确定要把[{0}]从[{1}]改成[{2}]吗？", e.Column.Header, e.OldValue, e.Value),
                "提示",
                MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            if (e.Column.FieldName == "Name" && !string.IsNullOrWhiteSpace(SelectedPerson.Name))
            {
                SelectedPerson.Pinyin = PinyinHelper.GetFirstPYLetter(SelectedPerson.Name);
            }

            var result = _repo.Update(SelectedPerson);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                var index = Persons.IndexOf(SelectedPerson);
                Persons[index] = SelectedPerson;
                SendMsg(new ItemChangedMsg<Person>(ActionMode.Update, SelectedPerson));
            }
        }
    }
}
