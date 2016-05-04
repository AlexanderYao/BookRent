create table Books (
	ISBN text,
	Name text,
	InDate date,
	Price numeric
);

create table Persons (
	Name text,
	Sex int,
	StartDate date,
	EndDate date,
	Fee numeric,
	Deposit numeric,
	PhoneNo text
);

create table Rents (
	PersonId long,
	BookId long,
	StartDate date,
	EndDate date
);

/*add column*/
alter table books add InDate date;
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

