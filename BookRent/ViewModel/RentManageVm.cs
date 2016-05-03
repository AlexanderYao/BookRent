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
        protected RentManageVm()
        {
            _repo = new RentRepository();
            Rents = new ObservableCollection<Rent>();
        }

        public static RentManageVm Create()
        {
            return ViewModelSource.Create(() => new RentManageVm());
        }

        public ObservableCollection<Rent> Rents { get; set; }

        public virtual Rent SelectedRent { get; set; }

        public virtual IMessageBoxService MessageBoxService { get { return null; } }

        public void Query()
        {
            var rents = _repo.Query();
            Rents.Clear();
            foreach (var item in rents)
            {
                Rents.Add(item);
            }
        }

        public void Add()
        {
            var rent = new Rent
            {
                ISBN = string.Empty,
                Name = string.Empty,
                InDate = DateTime.Today,
                Price = 0d
            };

            var result = _repo.Add(rent);
            Status = string.Format("新增{0}！", result ? "成功" : "失败");

            if (result)
            {
                Query();
            }
        }

        public void Delete()
        {
            if (null == SelectedRent)
            {
                return;
            }

            if (MessageBoxService.Show("确定要删除吗？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                return;
            }

            var result = _repo.Delete(SelectedRent);
            Status = string.Format("删除{0}！", result ? "成功" : "失败");
            if (result)
            {
                Rents.Remove(SelectedRent);
            }
        }

        public void Update()
        {
            if (null == SelectedRent)
            {
                return;
            }

            var result = _repo.Update(SelectedRent);
            Status = string.Format("更新{0}！", result ? "成功" : "失败");

            if (result)
            {
                var index = Rents.IndexOf(SelectedRent);
                Rents[index] = SelectedRent;
            }
        }
    }
}
