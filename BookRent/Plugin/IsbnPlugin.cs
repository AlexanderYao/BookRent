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
    /// <summary>
    /// 插件：根据Isbn号去豆瓣查询书的基本信息
    /// </summary>
    class IsbnPlugin : IPlugin
    {
        private Timer _timer;
        private string _apiFormat;
        private Queue<Book> _queue;

        public bool IsOn { get; set; }

        public void Init()
        {
            _queue = new Queue<Book>();
            _apiFormat = ConfigurationManager.AppSettings["DoubanApi"];
            var str = ConfigurationManager.AppSettings["DoubanTimeout"];

            TimeSpan result;
            bool canParse = TimeSpan.TryParse(str, out result);

            if (!canParse)
            { // 默认30秒
                result = TimeSpan.FromSeconds(30d);
            }

            _timer = new Timer(DoWork, null, result, result);
            Messenger.Default.Register<IsbnMsg>(this, IsbnAction.Request, OnIsbnRequest);
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
            if (_queue.Count == 0)
            {
                return;
            }

            var book = _queue.Dequeue();
            string jsonStr = string.Empty;
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(string.Format(_apiFormat, book.ISBN));
            using (HttpWebResponse response = (HttpWebResponse)req.GetResponse())
            {
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        jsonStr = reader.ReadToEnd();
                    }
                }
            }

            if (string.Empty == jsonStr)
            {
                return;
            }

            var dBook = JsonConvert.DeserializeObject<DoubanBook>(jsonStr);
            var result = new Book { ISBN = book.ISBN, Name = dBook.title, Price = GetPrice(dBook.price) };
            Messenger.Default.Send(new IsbnMsg(result), IsbnAction.Response);
        }

        private void OnIsbnRequest(IsbnMsg msg)
        {
            if (null == msg.Book || string.IsNullOrEmpty(msg.Book.ISBN))
            {
                return;
            }

            _queue.Enqueue(msg.Book);
        }

        /// <summary>
        /// 16.50元 -> 16.5
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        private double GetPrice(string dPrice)
        {
            int index = dPrice.IndexOf('元');
            index = (index < 0) ? dPrice.Length : index;

            string num = dPrice.Substring(0, index);
            double result;
            bool canParse = double.TryParse(num, out result);
            if (!canParse)
            {
                result = 0d;
            }
            return result;
        }
    }

    class DoubanBook
    {
        public string title { get; set; }
        public string price { get; set; }
    }
}
