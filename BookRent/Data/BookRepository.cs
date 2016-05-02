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
                result.Add(new Book
                {
                    Id = reader.GetInt64(0),
                    ISBN = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                    Name = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                    InDate = reader.IsDBNull(3) ? DateTime.MinValue : reader.GetDateTime(3),
                    Price = reader.IsDBNull(4) ? double.MinValue : reader.GetDouble(4)
                });
            }
            return result;
        }

        public bool Add(Book book)
        {
            var sql = @"insert into Books(ISBN, Name, InDate, Price) values (@ISBN, @Name, @InDate, @Price)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@InDate", book.InDate),
                new SQLiteParameter("@Price", book.Price),
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }

        public bool Delete(Book book)
        {
            var sql = @"delete from Books where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", book.Id)
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
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
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }
    }
}
