toko_laptop_db=# select * from toko_laptop_db  ;
 id |      name       |    price    | is_active |         created_at
    | category
----+-----------------+-------------+-----------+------------------------
----+----------
  1 | Laptop ROG      | 20000000.00 | t         | 2025-12-08 14:29:37.409
626 | Gaming
  2 | Laptop vivobook |  8000000.00 | t         | 2025-12-08 14:31:13.456
706 | standart
  4 | Laptop Macbook  | 30000000.00 | t         | 2025-12-08 14:33:06.802
473 | Apple
  5 | Predator        | 16000000.00 | t         | 2025-12-08 14:34:01.269
406 | Gaming
(4 rows)

latihan PG
1. Apa kepanjangan dari SQL? 
    b. Structured Query Language
2. Manakah yang termasuk database Relasional (SQL)? 
    c. PostgreSQL 
3. Perintah untuk mengambil data dari tabel adalah... 
    c. SELECT 
4. Tipe data yang paling tepat untuk menyimpan harga barang agar presisi adalah... 
    a. INT
5. Apa fungsi PRIMARY KEY pada sebuah tabel?
    c. Untuk mengurutkan data secara otomatis
6. Query untuk menampilkan data produk yang stoknya habis (0) adalah... 
    a. SELECT * FROM products WHERE stock = 0;
7. Perintah ORDER BY price DESC artinya... 
    b. Urutkan harga dari termahal ke termurah
8. Apa yang terjadi jika kita menjalankan DELETE FROM products; tanpa WHERE?
    c. Semua data di tabel products akan terhapus
9. Untuk mengubah data yang sudah ada, kita menggunakan perintah... 
    c. UPDATE 
10. Tipe data VARCHAR(50) artinya..
    b. Teks maksimal 50 karakter