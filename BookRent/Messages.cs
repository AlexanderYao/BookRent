using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public enum ActionMode
    {
        Add = 0,
        Delete = 1,
        Update = 2
    }

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

    class IsbnMsg
    {
        public IsbnMsg(Book book)
        {
            this.Book = book;
        }
        public Book Book { get; set; }
    }
}
