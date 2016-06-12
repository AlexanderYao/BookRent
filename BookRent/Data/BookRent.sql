﻿create table Books (
	ISBN text,
	Name text,
	InDate date,
	Price numeric,
	Pinyin text,
	BuyFrom text,
	Remark text
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
	EndDate date
);

/*add column*/
alter table books add InDate date;
/*新增列之后，必须补全数据，因为Query()里没对null做判断，程序默认插入的是string.Empty，而手工插入的是null*/
update books set Indate = PubDate;

/*drop column: sqlite does not support drop columns directly*/
create table tmp (
	ISBN text,
	Name text,
	InDate date,
	Price numeric
);
insert into tmp select ISBN, Name, PubDate, 0 from Books;
alter table tmp rename to Books;

