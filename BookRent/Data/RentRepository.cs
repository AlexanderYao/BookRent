using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;

namespace BookRent
{
    public class RentRepository : IRepository<Rent>
    {
        private SqliteHelper _helper;

        public RentRepository()
        {
            _helper = new SqliteHelper();
        }

        public IList<Rent> Query()
        {
            var result = new List<Rent>();
            using (var reader = _helper.ExecuteReader(
@"select rowid, PersonId, BookId, StartDate, EndDate, Count from Rents", null))
            {
                while (reader.Read())
                {
                    result.Add(new Rent
                    {
                        Id = reader.GetInt64(0),
                        Person = Cache.Get<Person>(reader.GetInt64(1)),
                        Book = Cache.Get<Book>(reader.GetInt64(2)),
                        StartDate = reader.GetDateTime(3),
                        EndDate = reader.GetDateTime(4),
                        Count = reader.GetInt32(5),
                    });
                }
            }
            return result;
        }

        public IList<Rent> Query(Func<Rent, bool> condition)
        {
            return Query().Where(condition).ToList();
        }

        public long Add(Rent rent)
        {
            var sql = @"insert into Rents(PersonId, BookId, StartDate, EndDate, Count) 
values (@PersonId, @BookId, @StartDate, @EndDate, @Count)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@PersonId", rent.Person.Id),
                new SQLiteParameter("@BookId", rent.Book.Id),
                new SQLiteParameter("@StartDate", rent.StartDate),
                new SQLiteParameter("@EndDate", rent.EndDate),
                new SQLiteParameter("@Count", rent.Count),
            };
            return _helper.ExecuteInsert(sql, paras);
        }

        public bool Delete(Rent rent)
        {
            var sql = @"delete from Rents where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", rent.Id)
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }

        public bool Update(Rent rent)
        {
            var sql = @"update Rents set PersonId = @PersonId, BookId = @BookId, 
StartDate = @StartDate, EndDate = @EndDate, Count = @Count where rowid = @id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", rent.Id),
                new SQLiteParameter("@PersonId", rent.Person.Id),
                new SQLiteParameter("@BookId", rent.Book.Id),
                new SQLiteParameter("@StartDate", rent.StartDate),
                new SQLiteParameter("@EndDate", rent.EndDate),
                new SQLiteParameter("@Count", rent.Count),
            };
            return _helper.ExecuteNonQuery(sql, paras) == 1;
        }
    }
}
