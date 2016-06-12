using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//这里存放所有与消息相关的类
namespace BookRent
{
    /// <summary>
    /// 实体类的增、删、改
    /// </summary>
    enum ActionMode
    {
        Add = 0,
        Delete = 1,
        Update = 2
    }

    /// <summary>
    /// 更新书的现有数量
    /// </summary>
    class UpdateCountMsg
    {
        public UpdateCountMsg(Book book)
        {
            this.Book = book;
        }
        public Book Book { get; set; }
    }

    /// <summary>
    /// 修改实体类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    class ItemChangedMsg<T>
    {
        public ItemChangedMsg(ActionMode action, T item)
        {
            this.Action = action;
            this.Item = item;
        }
        public ActionMode Action { get; set; }
        public T Item { get; set; }
    }

    /// <summary>
    /// Isbn查询
    /// </summary>
    class IsbnMsg
    {
        public IsbnMsg(Book book)
        {
            this.Book = book;
        }
        public Book Book { get; set; }
    }

    /// <summary>
    /// 提醒
    /// </summary>
    class NotifyMsg
    {
        public NotifyMsg(string msg)
        {
            this.Msg = msg;
        }
        public string Msg { get; set; }
    }
}
