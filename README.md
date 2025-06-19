# Proyek Aplikasi Bookshelf

Ini adalah proyek aplikasi Bookshelf yang dirancang untuk mengelola daftar buku bacaan. Aplikasi ini memungkinkan pengguna untuk menambah, mengkategorikan (berdasarkan status selesai dibaca atau belum), mencari, mengedit, dan menghapus buku dari rak buku virtual. Data buku disimpan secara lokal di browser menggunakan `localStorage`.

**Proyek ini merupakan submission untuk kelas "Belajar Membuat Front-End Web untuk Pemula" dari Dicoding.**

## Fitur Utama

-   **Penambahan Buku Baru**: Pengguna dapat menambahkan buku baru dengan detail judul, penulis, tahun terbit, dan status apakah buku sudah selesai dibaca atau belum.
-   **Dua Rak Buku**:
    -   **"Belum Selesai Dibaca"**: Menampilkan daftar buku yang sedang atau akan dibaca.
    -   **"Selesai Dibaca"**: Menampilkan daftar buku yang telah selesai dibaca.
-   **Memindahkan Buku Antar Rak**: Pengguna dapat dengan mudah memindahkan buku dari rak "Belum Selesai Dibaca" ke "Selesai Dibaca" dan sebaliknya.
-   **Menghapus Buku**: Fitur untuk menghapus buku dari rak, dilengkapi dengan dialog konfirmasi kustom (menggunakan SweetAlert2) untuk pengalaman pengguna yang lebih baik dan mencegah penghapusan yang tidak disengaja.
-   **Mengedit Detail Buku**: Pengguna dapat mengubah detail buku yang sudah ada (judul, penulis, tahun) melalui dialog kustom interaktif yang juga menggunakan SweetAlert2.
-   **Pencarian Buku**: Memungkinkan pengguna untuk mencari buku berdasarkan judulnya. Hasil pencarian akan langsung memfilter buku yang ditampilkan di kedua rak.
-   **Penyimpanan Lokal**: Seluruh data buku disimpan menggunakan `localStorage` pada browser, sehingga data tetap tersedia bahkan setelah browser ditutup dan dibuka kembali.
-   **Antarmuka Pengguna yang Ditingkatkan**:
    -   **Dialog Kustom**: Menggunakan pustaka SweetAlert2 untuk semua interaksi dialog seperti konfirmasi penghapusan dan form pengeditan buku, memberikan tampilan yang lebih modern dan konsisten.
    -   **Animasi Halus**: Efek transisi visual (fade-in/out, slide) saat buku ditambahkan, dihapus, atau dirender ulang pada rak, memberikan pengalaman pengguna yang lebih dinamis.
    -   **Aksesibilitas (Accessibility)**: Peningkatan aksesibilitas dengan penggunaan atribut `aria-label` pada elemen-elemen interaktif seperti tombol dan input form, membuat aplikasi lebih ramah bagi pengguna dengan kebutuhan khusus (misalnya, pengguna pembaca layar).

## Teknologi yang Digunakan

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   SweetAlert2 (untuk dialog kustom dan interaksi pengguna yang lebih baik)
-   Google Fonts (Poppins)
-   Ionicons (untuk ikon)

## Cara Menjalankan Proyek

1.  **Clone atau Unduh Repositori (Jika Ada)**:
    Jika proyek ini berada dalam sebuah repositori Git, clone repositori tersebut ke komputer lokal Anda. Jika tidak (misalnya, Anda mengunduh file proyek sebagai ZIP), pastikan semua file dan folder proyek (terutama folder `bookshelf-app`) diekstrak ke satu lokasi di komputer Anda.

2.  **Buka File `index.html`**:
    Navigasikan ke dalam folder `bookshelf-app` tempat Anda menyimpan file proyek.
    Buka file `index.html` langsung menggunakan browser web pilihan Anda (misalnya, Google Chrome, Mozilla Firefox, Microsoft Edge).
    Anda dapat melakukannya dengan cara klik dua kali pada file `index.html` atau dengan menyeret file tersebut ke jendela browser yang terbuka.

3.  **Selesai!**:
    Aplikasi Bookshelf sekarang seharusnya sudah berjalan di browser Anda dan siap digunakan. Tidak ada langkah instalasi dependensi atau build server yang diperlukan karena ini adalah proyek front-end statis (hanya HTML, CSS, dan JavaScript).


Selamat menggunakan dan mengembangkan aplikasi ini lebih lanjut!
