CREATE TABLE blogs (id SERIAL PRIMARY KEY,author text,url text NOT NULL,title text NOT NULL,likes int DEFAULT 0);

insert into blogs (author, url,title) values ('Professor Longhair', 'www.proffa.com','The Professor');
insert into blogs (author, url,title) values ('Dr. Feelgood', 'www.feelgood.com','I feel good!');