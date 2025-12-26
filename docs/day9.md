1. Mengapa kita perlu melakukan validasi input? 
    b. Mencegah data sampah atau berbahaya masuk ke sistem 

2. Library populer untuk validasi di Express.js adalah... 
    b. express-validator

3. HTTP Status Code yang tepat jika validasi gagal adalah...
    c. 400 Bad Request

4. Dalam Prisma, relasi One-to-Many didefinisikan dengan... 
    a. Array di satu sisi (contoh: Product[]) dan field relation di sisi lain

5. Apa fungsi include saat melakukan query findMany? 
    c. Mengambil data relasi (join) agar ikut muncul di response

6. Jika Product punya categoryId, maka categoryId disebut sebagai... 
    b. Foreign Key

7. Apa arti @relation(fields: [categoryId], references: [id]) di schema Prisma? 
    c. Mendefinisikan hubungan Foreign Key antara kolom categoryId di tabel ini dengan id di tabel referensi

8. Manakah format JSON response error validasi yang baik? 
    c. {"success": false, "errors": [...]}

9. Kapan validasi sebaiknya dilakukan?
    b. Sebelum data diproses atau disimpan ke database

10. Library validasi modern yang sangat Type-safe dan sering dipasangkan dengan TypeScript adalah... 
    b. Zod

11. Apa nama file konfigurasi utama untuk setup Prisma yang kustom (seperti mengatur path schema)? 
    a. prisma/schema.prisma

12. Berdasarkan konfigurasi prisma.config.ts, di mana lokasi file schema model disimpan? 
    d. database/schema/

13. File apa yang menjadi entry point definisi schema di prisma.config.ts? a. src/prisma/schema/base.prisma 

14. Bagaimana cara mendefinisikan fungsi service? 
    c. export const getAllProducts = async () => {}.

15. Di mana lokasi file migrasi disimpan sesuai konfigurasi prisma.config.ts kita?
    a. prisma/migrations.

16. Jika ingin membuat model baru Transaction, apa yang harus dilakukan?
    a. Edit src/prisma/schema.prisma langsung

17. Bagaimana cara mengimport semua fungsi dari product.service.ts ke controller?
    c. import * as productService from '../services/product.service'

18. Dari mana prisma.config.ts mengambil URL database?
    c. Langsung dari process.env.

19. Mengapa kita memecah schema menjadi banyak file (Modular Schema)? 
    b. Agar file schema.prisma tidak terlalu panjang dan lebih mudah di-maintain