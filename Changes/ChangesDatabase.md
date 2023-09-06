# Creación de tabla para sesión 

```sql
CREATE TABLE sparksiot.session (
	
	idsession serial PRIMARY KEY,
	iduser bigint not null,
	hora TIMESTAMP NOT NULL default CURRENT_DATE,
	token VARCHAR (700) not null,
	CONSTRAINT fk_user FOREIGN KEY (iduser)
	REFERENCES sparksiot.users (id)	

)
```