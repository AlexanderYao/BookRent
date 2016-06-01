﻿using DevExpress.Mvvm;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BookRent
{
    class NotifyPlugin : IPlugin
    {
        private Timer _timer;
        private int _expireDays;
        private Queue<string> _queue;
        private IRepository<Rent> _repo;

        public void Init()
        {
            _queue = new Queue<string>();
            _repo = new RentRepository();

            var str = ConfigurationManager.AppSettings["ExpireDays"];
            bool canParse = Int32.TryParse(str, out _expireDays);
            if (!canParse)
            { // 默认借阅30天
                _expireDays = 30;
            }

            str = ConfigurationManager.AppSettings["ExpireNotifyInterval"];
            TimeSpan result;
            canParse = TimeSpan.TryParse(str, out result);
            if (!canParse)
            { // 默认启动时通知，以后每1小时通知1次
                result = TimeSpan.FromHours(1d);
            }

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
                //Messenger.Default.Send(new NotifyMsg("{0}有{1}本书未还"));
                Messenger.Default.Send(new NotifyMsg(string.Format("{0}有{1}本书未还", item.Person.Name, item.Count)));
            }
        }
    }
}
