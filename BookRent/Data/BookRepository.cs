using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class BookRepository : IRepository<Book>
    {
        private SqliteHelper _helper;

        public BookRepository()
        {
            _helper = new SqliteHelper();
        }

        public IList<Book> Query()
        {
            var result = new List<Book>();
            var reader = _helper.ExecuteReader("select rowid, ISBN, Name, InDate, Price from books", null);
            while (reader.Read())
            {
                var item = new Book
                {
                    Id = reader.GetInt64(0),
                    ISBN = reader.GetString(1),
                    Name = reader.GetString(2),
                    InDate = reader.GetDateTime(3),
                    Price = reader.GetDouble(4)
                };
                result.Add(item);
                Cache.Set<Book>(item.Id, item);
            }
            return result;
        }

        public long Add(Book book)
        {
            var sql = @"insert into Books(ISBN, Name, InDate, Price) values (@ISBN, @Name, @InDate, @Price)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@InDate", book.InDate),
                new SQLiteParameter("@Price", book.Price),
            };
            var rowid = _helper.ExecuteInsert(sql, paras);
            book.Id = rowid;
            Cache.Set<Book>(rowid, book);
            return rowid;
        }

        public bool Delete(Book book)
        {
            var sql = @"delete from Books where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", book.Id)
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Remove<Book>(book.Id);
            return result;
        }

        public bool Update(Book book)
        {
            var sql = @"update Books set ISBN = @ISBN, Name = @Name, InDate = @InDate, Price = @Price where rowid = @id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", book.Id),
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@InDate", book.InDate),
                new SQLiteParameter("@Price", book.Price),
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Set<Book>(book.Id, book);
            return result;
        }
    }
}
