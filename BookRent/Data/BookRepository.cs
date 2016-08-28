using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;

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
            if (Cache.HasSetList<Book>())
            {
                var list = Cache.GetList<Book>();
                if (null != list && list.Count > 0)
                {
                    return list;
                }
            }

            var result = new List<Book>();
            using (var reader = _helper.ExecuteReader(
@"select rowid, ISBN, Name, InDate, Price, Pinyin, BuyFrom, Remark, 
         TotalCount, AvailableCount, Publisher, Author
    from books", null))
            {
                while (reader.Read())
                {
                    var item = new Book
                    {
                        Id = reader.GetInt64(0),
                        ISBN = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                        Name = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                        InDate = reader.GetDateTime(3),
                        Price = reader.GetDouble(4),
                        Pinyin = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                        BuyFrom = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                        Remark = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
                        TotalCount = reader.GetInt32(8),
                        AvailableCount = reader.GetInt32(9),
                        Publisher = reader.IsDBNull(10) ? string.Empty : reader.GetString(10),
                        Author = reader.IsDBNull(11) ? string.Empty : reader.GetString(11),
                    };
                    result.Add(item);
                }
            }
            Cache.SetList<Book>(result);
            return result;
        }

        public IList<Book> Query(Func<Book, bool> condition)
        {
            return Query().Where(condition).ToList();
        }

        public long Add(Book book)
        {
            var sql =
@"insert into Books(ISBN, Name, InDate, Price, Pinyin, BuyFrom, Remark, 
         TotalCount, AvailableCount, Publisher, Author) 
values (@ISBN, @Name, @InDate, @Price, @Pinyin, @BuyFrom, @Remark, 
        @TotalCount, @AvailableCount, @Publisher, @Author)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@InDate", book.InDate),
                new SQLiteParameter("@Price", book.Price),
                new SQLiteParameter("@Pinyin", book.Pinyin),
                new SQLiteParameter("@BuyFrom", book.BuyFrom),
                new SQLiteParameter("@Remark", book.Remark),
                new SQLiteParameter("@TotalCount", book.TotalCount),
                new SQLiteParameter("@AvailableCount", book.AvailableCount),
                new SQLiteParameter("@Publisher", book.Publisher),
                new SQLiteParameter("@Author", book.Author),
            };
            var rowid = _helper.ExecuteInsert(sql, paras);
            book.Id = rowid;
            Cache.Set<Book>(book);
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
            var sql =
@"update Books set ISBN = @ISBN, Name = @Name, InDate = @InDate, 
         Price = @Price, Pinyin = @Pinyin, BuyFrom = @BuyFrom, Remark = @Remark, 
         TotalCount = @TotalCount, AvailableCount = @AvailableCount,
         Publisher = @Publisher, Author = @Author
   where rowid = @id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", book.Id),
                new SQLiteParameter("@ISBN", book.ISBN),
                new SQLiteParameter("@Name", book.Name),
                new SQLiteParameter("@InDate", book.InDate),
                new SQLiteParameter("@Price", book.Price),
                new SQLiteParameter("@Pinyin", book.Pinyin),
                new SQLiteParameter("@BuyFrom", book.BuyFrom),
                new SQLiteParameter("@Remark", book.Remark),
                new SQLiteParameter("@TotalCount", book.TotalCount),
                new SQLiteParameter("@AvailableCount", book.AvailableCount),
                new SQLiteParameter("@Publisher", book.Publisher),
                new SQLiteParameter("@Author", book.Author),
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Set<Book>(book);
            return result;
        }
    }
}
