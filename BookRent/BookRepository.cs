using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class BookRepository
    {
        //private List<Book> _books;
        private SqliteHelper _helper;

        public BookRepository()
        {
            _helper = new SqliteHelper();

            //_books = new List<Book>();
            //for (int i = 0; i < 10; i++)
            //{
            //    _books.Add(new Book
            //    {
            //        ISBN = "9781449334062",
            //        Author = "Pieter Hintjens",
            //        Name = "ZeroMQ",
            //        PubDate = DateTime.Parse("2013-3-28")
            //    });
            //}
        }

        public IList<Book> Query()
        {
            var result = new List<Book>();
            var reader = _helper.ExecuteReader("select ISBN, Name, Author, PubDate from books", null);
            while (reader.Read())
            {
                result.Add(new Book
                {
                    ISBN = reader.GetString(0),
                    Name = reader.GetString(1),
                    Author = reader.GetString(2),
                    PubDate = reader.GetDateTime(3)
                });
            }
            return result;
        }

        public bool Add(Book book)
        {
            var sql = @"insert into Books(ISBN, Name, Author, PubDate) values (@ISBN, @Name, @Author, @PubDate)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@Author", book.Author),
                new SQLiteParameter("@PubDate", book.PubDate),
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }

        public bool Delete(Book book)
        {
            var sql = @"delete from Books where ISBN = @ISBN";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN)
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }

        public bool Update(Book book)
        {
            var sql = @"update Books set Name = @Name, Author = @Author, PubDate = @PubDate where ISBN = @ISBN";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@Author", book.Author),
                new SQLiteParameter("@PubDate", book.PubDate),
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }
    }
}
