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
@"select rowid, ISBN, Name, InDate, Price, Pinyin, BuyFrom, Remark, TotalCount, AvailableCount 
from books", null))
            {
                while (reader.Read())
                {
                    var item = new Book
                    {
                        Id = reader.GetInt64(0),
                        ISBN = reader.GetString(1),
                        Name = reader.GetString(2),
                        InDate = reader.GetDateTime(3),
                        Price = reader.GetDouble(4),
                        Pinyin = reader.GetString(5),
                        BuyFrom = reader.GetString(6),
                        Remark = reader.GetString(7),
                        TotalCount = reader.GetInt32(8),
                        AvailableCount = reader.GetInt32(9),
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
            var sql = @"insert into Books(ISBN, Name, InDate, Price, Pinyin, BuyFrom, Remark, TotalCount, AvailableCount) 
values (@ISBN, @Name, @InDate, @Price, @Pinyin, @BuyFrom, @Remark, @TotalCount, @AvailableCount)";
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
            var sql = @"update Books set ISBN = @ISBN, Name = @Name, InDate = @InDate, 
Price = @Price, Pinyin = @Pinyin, BuyFrom = @BuyFrom, Remark = @Remark, 
TotalCount = @TotalCount, AvailableCount = @AvailableCount where rowid = @id";
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
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Set<Book>(book);
            return result;
        }
    }
}
