/*删除所有表，并新建，所有key从1开始*/
drop table Rents;
drop table Books;
drop table Persons;

create table Books (
	ISBN text,
	Name text,
	InDate date,
	Price numeric,
	Pinyin text,
	BuyFrom text,
	Remark text,
	TotalCount int,
	AvailableCount int
);

create table Persons (
	Name text,
	Sex int,
	StartDate date,
	EndDate date,
	Fee numeric,
	Deposit numeric,
	PhoneNo text,
	Pinyin text
);

create table Rents (
	PersonId long,
	BookId long,
	StartDate date,
	EndDate date,
	Count int
);

/*新增列*/
alter table books add InDate date;
/*新增列之后，必须补全数据，因为Query()里没对null做判断，程序默认插入的是string.Empty，而手工插入的是null*/
update Books set Indate = PubDate;
update Rents set EndDate = date('now');

/*删除列: sqlite默认不支持删除列，所以只能建临时表、拷贝数据、再重命名 sqlite does not support drop columns directly*/
create table tmp (
	ISBN text,
	Name text,
	InDate date,
	Price numeric
);
insert into tmp select ISBN, Name, PubDate, 0 from Books;
alter table tmp rename to Books;

