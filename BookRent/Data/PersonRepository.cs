﻿using System;
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
            if(Cache.HasSetList<Person>())
            {
                var list = Cache.GetList<Person>();
                if(null != list && list.Count > 0)
                {
                    return list;
                }
            }

            var result = new List<Person>();
            using (var reader = _helper.ExecuteReader("select rowid, Name, Sex, StartDate, EndDate, Fee, Deposit, PhoneNo from persons", null))
            {
                while (reader.Read())
                {
                    var item = new Person
                    {
                        Id = reader.GetInt64(0),
                        Name = reader.GetString(1),
                        Sex = (Sex)reader.GetInt32(2),
                        StartDate = reader.GetDateTime(3),
                        EndDate = reader.GetDateTime(4),
                        Fee = reader.GetDouble(5),
                        Deposit = reader.GetDouble(6),
                        PhoneNo = reader.GetString(7)
                    };
                    result.Add(item);
                }
            }
            Cache.SetList<Person>(result);
            return result;
        }

        public long Add(Person person)
        {
            var sql = @"insert into Persons(Name, Sex, StartDate, EndDate, Fee, Deposit, PhoneNo) values (@Name, @Sex, @StartDate, @EndDate, @Fee, @Deposit, @PhoneNo)";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Name", person.Name),
                new SQLiteParameter("@Sex", person.Sex),
                new SQLiteParameter("@StartDate", person.StartDate),
                new SQLiteParameter("@EndDate", person.EndDate),
                new SQLiteParameter("@Fee", person.Fee),
                new SQLiteParameter("@Deposit", person.Deposit),
                new SQLiteParameter("@PhoneNo", person.PhoneNo)
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
            var sql = @"update Persons set Name = @Name, Sex = @Sex, StartDate = @StartDate, EndDate = @EndDate, Fee = @Fee, Deposit = @Deposit, PhoneNo = @PhoneNo where rowid = @Id";
            var paras = new SQLiteParameter[] { 
                new SQLiteParameter("@Id", person.Id),
                new SQLiteParameter("@Name", person.Name),
                new SQLiteParameter("@Sex", person.Sex),
                new SQLiteParameter("@StartDate", person.StartDate),
                new SQLiteParameter("@EndDate", person.EndDate),
                new SQLiteParameter("@Fee", person.Fee),
                new SQLiteParameter("@Deposit", person.Deposit),
                new SQLiteParameter("@PhoneNo", person.PhoneNo)
            };
            var result = _helper.ExecuteNonQuery(sql, paras) == 1;
            Cache.Set<Person>(person);
            return result;
        }
    }
}
