nomor 1 :
 id |   name
----+----------
(0 rows)


nomor 2 : - ALTER TABLE toko_laptop_db ADD COLUMN category_id INT;
          - ALTER TABLE toko_laptop_db ADD FOREIGN KEY (category_id) REFERENCES categories(id);
 id |      name       |    price    | is_active |         created_at         | category | category_id
----+-----------------+-------------+-----------+----------------------------+----------+-------------
  1 | Laptop ROG      | 20000000.00 | t         | 2025-12-08 14:29:37.409626 | laptop   |
  2 | Laptop vivobook |  8000000.00 | t         | 2025-12-08 14:31:13.456706 | laptop   |
  4 | Laptop Macbook  | 30000000.00 | t         | 2025-12-08 14:33:06.802473 | laptop   |
  5 | Predator        | 16000000.00 | t         | 2025-12-08 14:34:01.269406 | laptop   |
(4 rows)


nomor 3 : - INSERT INTO categories (name) VALUES ('Laptop'), ('mouse'), ('keyboard');
          - UPDATE toko_laptop_db SET category_id = 1 WHERE category = 'laptop'
 id |   name
----+----------
  1 | laptop
  2 | mouse
  3 | keyboard
(3 rows)


nomor 4 : - select toko_laptop_db.name, categories.name as kategori from toko_laptop_db join categories on toko_laptop_db.category_id = categories.id;
      name       | kategori
-----------------+----------
 Predator        | laptop
 Laptop Macbook  | laptop
 Laptop vivobook | laptop
 Laptop ROG      | laptop
(4 rows)

nomor 5 : - select categories.name as Kategori, Count(toko_laptop_db.id) as ju
mlah_barang from categories join toko_laptop_db on categories.id = toko_laptop_db.c
ategory_id group by categories.name;
 kategori | jumlah_barang
----------+---------------
 laptop   |             4
(1 row)


PILIHAN GANDA
1.  Relasi antara "Penulis" dan "Buku" (Satu penulis bisa menulis banyak buku) adalah... 
2. Apa fungsi FOREIGN KEY?
b. Menghubungkan satu tabel ke tabel lain
3. Jika kita ingin mengambil data dari dua tabel yang saling berhubungan, kita menggunakan perintah... 
c. JOIN
4. Jenis JOIN yang hanya menampilkan data jika kedua tabel memiliki pasangan adalah...
c. INNER JOIN.
5. Apa yang terjadi pada LEFT JOIN jika data di tabel kanan tidak ditemukan? 
b. Data tabel kanan berisi NULL.
6. Fungsi agregasi untuk menghitung jumlah baris data adalah...
c. COUNT()
7. Perintah GROUP BY biasanya digunakan bersamaan dengan...
c. Fungsi Agregasi (COUNT, SUM, dll).
8. Untuk memfilter hasil setelah melakukan GROUP BY, kita menggunakan...
b. HAVING.
9. Apa kegunaan LIMIT dan OFFSET?
c. Untuk Pagination (Halaman).
10. Dalam relasi Many-to-Many, kita membutuhkan...
c. 3 Tabel (1 tabel pivot/penghubung).