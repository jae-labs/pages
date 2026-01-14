# MySQL

## Introduction

This cheat sheet provides a quick reference for some common MySQL commands and concepts. MySQL is an open-source relational database management system (RDBMS) commonly used for storing and managing data.

## Installation

To use MySQL, you need to install it on your system. Installation methods vary depending on your operating system. Refer to the [official MySQL documentation](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/) for installation instructions.

## MySQL Concepts

### Databases

- Create a new database:
  ```sql
  CREATE DATABASE database_name;
  ```

- List all databases:
  ```sql
  SHOW DATABASES;
  ```

- Switch to a specific database:
  ```sql
  USE database_name;
  ```

- Delete a database (Be cautious, this will remove all data):
  ```sql
  DROP DATABASE database_name;
  ```

### Tables

- Create a new table:
  ```sql
  CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...
  );
  ```

- List all tables in the current database:
  ```sql
  SHOW TABLES;
  ```

- Describe the structure of a table:
  ```sql
  DESCRIBE table_name;
  ```

- Delete a table:
  ```sql
  DROP TABLE table_name;
  ```

### CRUD Operations

- Insert a new record into a table:
  ```sql
  INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
  ```

- Select data from a table:
  ```sql
  SELECT * FROM table_name WHERE condition;
  ```

- Update data in a table:
  ```sql
  UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
  ```

- Delete data from a table:
  ```sql
  DELETE FROM table_name WHERE condition;
  ```

### Indexes

- Create an index on a table column:
  ```sql
  CREATE INDEX index_name ON table_name (column_name);
  ```

- List all indexes on a table:
  ```sql
  SHOW INDEXES FROM table_name;
  ```

### Joins

- Perform an INNER JOIN between two tables:
  ```sql
  SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;
  ```

### Functions

- Use built-in MySQL functions:
  ```sql
  SELECT COUNT(*) FROM table_name;
  ```

### Users and Permissions

- Create a new MySQL user:
  ```sql
  CREATE USER 'username'@'hostname' IDENTIFIED BY 'password';
  ```

- Grant privileges to a user:
  ```sql
  GRANT privilege_type ON database_name.table_name TO 'username'@'hostname';
  ```

- Revoke privileges from a user:
  ```sql
  REVOKE privilege_type ON database_name.table_name FROM 'username'@'hostname';
  ```

## MySQL Command-Line Tool

- Log in to MySQL using the command-line tool:
  ```shell
  mysql -u username -p
  ```

- Execute SQL commands in batch mode:
  ```shell
  mysql -u username -p < script.sql
  ```

## Conclusion

This cheat sheet covers some common MySQL commands and concepts. MySQL offers a wide range of features and functionality; refer to the [MySQL documentation](https://dev.mysql.com/doc/) for more in-depth information and advanced usage.
