using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookRent
{
    public class PersonRepository : IRepository<Person>
    {
        private SqliteHelper _helper;

        public PersonRepository()
        {
            _helper = new SqliteHelper();
        }

        public IList<Person> Query()
        {
            if (Cache.HasSetList<Person>())
            {
                var list = Cache.GetList<Person>();
                if (null != list && list.Count > 0)
                {
                    return list;
                }
            }

            var result = new List<Person>();
            using (var reader = _helper.ExecuteReader(
@"select rowid, Name, Sex, StartDate, EndDate, Fee, Deposit, PhoneNo, Pinyin, Contacter, Remark
    from persons", null))
            {
                while (reader.Read())
                {
                    var item = new Person
                    {
                        Id = reader.GetInt64(0),
                        Name = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                        Sex = (Sex)reader.GetInt32(2),
                        StartDate = reader.GetDateTime(3),
                        EndDate = reader.GetDateTime(4),
                        Fee = reader.GetDouble(5),
                        Deposit = reader.GetDouble(6),
                        PhoneNo = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
                        Pinyin = reader.IsDBNull(8) ? string.Empty : reader.GetString(8),
                        Contacter = reader.IsDBNull(9) ? string.Empty : reader.GetString(9),
                        Remark = reader.IsDBNull(10) ? string.Empty : reader.GetString(10),
                    };
                    result.Add(item);
                }
            }
            Cache.SetList<Person>(result);
            return result;
        }

        public IList<Person> Query(Func<Person, bool> condition)
        {
            return Query().Where(condition).ToList();
        }

        public long Add(Person person)
        {
            var sql =
@"insert into Persons(Name, Sex, StartDate, EndDate, Fee, Deposit, PhoneNo, Pinyin, Contacter, Remark) 
values (@Name, @Sex, @StartDate, @EndDate, @Fee, @Deposit, @PhoneNo, @Pinyin, @Contacter, @Remark)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Name", person.Name),
                new SQLiteParameter("@Sex", person.Sex),
                new SQLiteParameter("@StartDate", person.StartDate),
                new SQLiteParameter("@EndDate", person.EndDate),
                new SQLiteParameter("@Fee", person.Fee),
                new SQLiteParameter("@Deposit", person.Deposit),
                new SQLiteParameter("@PhoneNo", person.PhoneNo),
                new SQLiteParameter("@Pinyin", person.Pinyin),
                new SQLiteParameter("@Contacter", person.Contacter),
                new SQLiteParameter("@Remark", person.Remark),
            };
            var rowid = _helper.ExecuteInsert(sql, paras);
            person.Id = rowid;
            Cache.Set<Person>(person);
            return rowid;
        }

        public bool Delete(Person person)
        {
            var sql = @"delete from Persons where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", person.Id)
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Remove<Person>(person.Id);
            return result;
        }

        public bool Update(Person person)
        {
            var sql =
@"update Persons set Name = @Name, Sex = @Sex, StartDate = @StartDate, EndDate = @EndDate, 
         Fee = @Fee, Deposit = @Deposit, PhoneNo = @PhoneNo, Pinyin = @Pinyin, Contacter = @Contacter,
         Remark = @Remark
   where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", person.Id),
                new SQLiteParameter("@Name", person.Name),
                new SQLiteParameter("@Sex", person.Sex),
                new SQLiteParameter("@StartDate", person.StartDate),
                new SQLiteParameter("@EndDate", person.EndDate),
                new SQLiteParameter("@Fee", person.Fee),
                new SQLiteParameter("@Deposit", person.Deposit),
                new SQLiteParameter("@PhoneNo", person.PhoneNo),
                new SQLiteParameter("@Pinyin", person.Pinyin),
                new SQLiteParameter("@Contacter", person.Contacter),
                new SQLiteParameter("@Remark", person.Remark),
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Set<Person>(person);
            return result;
        }
    }
}
