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
    public class PersonManageVm : MyViewModelBase
    {
        private IRepository<Person> _personRepo;
        protected PersonManageVm()
        {
            _personRepo = new PersonRepository();
            Persons = new ObservableCollection<Person>();
        }

        public static PersonManageVm Create()
        {
            return ViewModelSource.Create(() => new PersonManageVm());
        }

        public ObservableCollection<Person> Persons { get; set; }

        public virtual Person SelectedPerson { get; set; }

        public virtual IMessageBoxService MessageBoxService { get { return null; } }

        public void Query()
        {
            var persons = _personRepo.Query();
            Persons.Clear();
            foreach (var item in persons)
            {
                Persons.Add(item);
            }
        }

        public void Add()
        {
            var person = new Person
            {
                Name = string.Empty,
                Sex = Sex.男,
                StartDate = DateTime.Today,
                EndDate = DateTime.Today.AddYears(1),
                Fee = 0d,
                Deposit = 0d,
                PhoneNo = string.Empty
            };

            var result = _personRepo.Add(person);
            Status = string.Format("新增{0}！", result ? "成功" : "失败");

            if (result)
            {
                //Persons.Add(person);
                //SelectedPerson = person;
                Query();
            }
        }

        public void Delete()
        {
            if (null == SelectedPerson)
            {
                return;
            }

            if (MessageBoxService.Show("确定要删除吗？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            var result = _personRepo.Delete(SelectedPerson);
            Status = string.Format("删除{0}！", result ? "成功" : "失败");
            if (result)
            {
                Persons.Remove(SelectedPerson);
            }
        }

        public void Update()
        {
            if (null == SelectedPerson)
            {
                return;
            }

            var result = _personRepo.Update(SelectedPerson);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                var index = Persons.IndexOf(SelectedPerson);
                Persons[index] = SelectedPerson;
            }
        }
    }
}
