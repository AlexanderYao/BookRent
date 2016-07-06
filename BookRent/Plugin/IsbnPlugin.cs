using DevExpress.Mvvm;
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

            TimeSpan result = ConfigUtil.Parse<TimeSpan>("DoubanTimeout", TimeSpan.FromSeconds(30d));
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

            try
            {
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
            }
            catch { }// do nothing

            if (string.Empty == jsonStr)
            {
                return;
            }

            var dBook = JsonConvert.DeserializeObject<DoubanBook>(jsonStr);
            var result = new Book
            {
                Id = book.Id,
                ISBN = book.ISBN,
                Name = dBook.title,
                Price = GetPrice(dBook.price),
                Author = GetAuthor(dBook.author),
                Publisher = dBook.publisher,
            };
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

        private string GetAuthor(IEnumerable<string> authors)
        {
            return (null != authors && authors.Count() > 0) ? authors.First() : string.Empty;
        }
    }

    class DoubanBook
    {
        public string title { get; set; }
        public string price { get; set; }
        public List<string> author { get; set; }
        public string publisher { get; set; }
    }
}
