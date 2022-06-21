create table compras(
codigo serial not null primary key,
nome varchar(50) not null,
endereco varchar(50) not null,
ceporigem varchar(8) not null,
cepdestino varchar(8) not null,
escolhaservico varchar(5),	
valorcompra decimal(10,2) not null,
valorfrete decimal(10,2) not null);


insert into compras(nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete) values
('nome1', 'Rua Estéfano Filipini', '79076174', '03591150', '01233', 100.23, 15.34), 
('nome2', 'Rua Nelson Antônio', '85601177', '05417060', '01244', 500.23, 20.34);

select * from compras;