using System;
using System.Collections.Generic;
using System.Windows;

namespace BookRent
{
    public static class CollectionHelper
    {
        public static void AddOnUi<T>(this ICollection<T> collection, T t)
        {
            Action<T> action = collection.Add;
            Application.Current.Dispatcher.BeginInvoke(action, t);
        }

        public static void RemoveOnUi<T>(this ICollection<T> collection, T t)
        {
            Func<T, bool> action = collection.Remove;
            Application.Current.Dispatcher.BeginInvoke(action, t);
        }

        public static void SetOnUi<T>(this IList<T> list, T item)
        {
            Action<T> action = t =>
            {
                int index = list.IndexOf(t);
                list.RemoveAt(index);
                list.Insert(index, t);
            };
            Application.Current.Dispatcher.BeginInvoke(action, item);
        }
    }
}
