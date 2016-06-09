using System;
using System.Collections.Generic;
using System.Text;
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

        public static string ToString<T>(this IList<T> list, Func<T, string> func)
        {
            var sb = new StringBuilder();
            sb.Append("[");
            for (int i = 0; i < list.Count; i++)
            {
                sb.Append(func(list[i]));
                if (i != list.Count - 1)
                {
                    sb.Append(", ");
                }
            }
            sb.Append("]");
            return sb.ToString();
        }

        public static void Foreach<T>(this IEnumerable<T> list, Action<T> action)
        {
            foreach (var item in list)
            {
                action(item);
            }
        }
    }
}
