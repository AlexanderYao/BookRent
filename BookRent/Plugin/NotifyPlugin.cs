using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace BookRent
{
    /// <summary>
    /// 插件：借阅到期提醒
    /// </summary>
    class NotifyPlugin : IPlugin
    {
        private Timer _timer;
        private int _expireDays;
        private Queue<string> _queue;
        private IRepository<Rent> _repo;

        public bool IsOn { get; set; }

        public void Init()
        {
            _queue = new Queue<string>();
            _repo = new RentRepository();

            _expireDays = ConfigUtil.Parse<Int32>("到期日", 30);

            TimeSpan result = ConfigUtil.Parse<TimeSpan>("到期提醒间隔", TimeSpan.FromHours(0.5d));
            _timer = new Timer(DoWork, null, TimeSpan.FromSeconds(10d), result);
        }

        public void Close()
        {
            if (null != _timer)
            {
                _timer.Dispose();
            }
        }

        private void DoWork(object state)
        {
            var rents = _repo.Query(e => e.EndDate == DateTime.MinValue &&
                (DateTime.Now - e.StartDate).TotalDays > _expireDays);

            if (rents.Count == 0)
            {
                return;
            }

            var statistic = rents.GroupBy(e => e.Person)
                .Select(e => new { Person = e.Key, Count = e.Count() });

            foreach (var item in statistic)
            {
                Messenger.Default.Send(new NotifyMsg(string.Format("{0}有{1}本书未还", item.Person.Name, item.Count)));
            }
        }
    }
}
