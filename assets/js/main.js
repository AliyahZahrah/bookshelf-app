document.addEventListener("DOMContentLoaded", function () {
    // Mengambil data buku dari localStorage atau menginisialisasi array kosong jika belum ada data
    const books = JSON.parse(localStorage.getItem("books")) || [];
    
    // Mengambil elemen formulir tambah buku dan pencarian
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    
    // Mengambil elemen daftar buku yang belum selesai dan yang sudah selesai dibaca
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");

    // Fungsi untuk menyimpan data buku ke localStorage
    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Fungsi untuk menampilkan daftar buku, bisa dengan filter pencarian
    function renderBooks(filter = "") {
        // Mengosongkan daftar buku sebelum menampilkan data baru
        incompleteBookList.innerHTML = "";
        completeBookList.innerHTML = "";

        books.forEach(book => {
            // Jika filter ada dan judul buku tidak sesuai, maka lewati
            if (!book.title.toLowerCase().includes(filter.toLowerCase())) return;
            
            // Membuat elemen buku baru
            const bookElement = document.createElement("div");
            bookElement.setAttribute("data-bookid", book.id);
            bookElement.setAttribute("data-testid", "bookItem");
            bookElement.innerHTML = `
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                <div>
                    <button data-testid="bookItemIsCompleteButton">
                        <ion-icon name="${book.isComplete ? "close-outline" : "checkmark"}"></ion-icon> 
                        ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
                    </button>
                    <button data-testid="bookItemDeleteButton">
                        <ion-icon name="trash-outline"></ion-icon> Hapus
                    </button>
                    <button data-testid="bookItemEditButton">
                        <ion-icon name="pencil-outline"></ion-icon> Edit
                    </button>
                </div>
            `;
            
            // Event listener untuk tombol memindahkan buku antara daftar selesai dan belum selesai dibaca
            bookElement.querySelector("[data-testid='bookItemIsCompleteButton']").addEventListener("click", () => {
                book.isComplete = !book.isComplete;
                saveBooks();
                renderBooks(filter);
            });

            // Event listener untuk tombol menghapus buku dari daftar
            bookElement.querySelector("[data-testid='bookItemDeleteButton']").addEventListener("click", () => {
                const index = books.findIndex(b => b.id === book.id);
                books.splice(index, 1);
                saveBooks();
                renderBooks(filter);
            });
            
            // Event listener untuk tombol mengedit buku
            bookElement.querySelector("[data-testid='bookItemEditButton']").addEventListener("click", () => {
                const newTitle = prompt("Edit Judul Buku", book.title);
                const newAuthor = prompt("Edit Penulis Buku", book.author);
                const newYear = prompt("Edit Tahun Buku", book.year);
                if (newTitle && newAuthor && newYear) {
                    book.title = newTitle;
                    book.author = newAuthor;
                    book.year = parseInt(newYear);
                    saveBooks();
                    renderBooks(filter);
                }
            });

            // Menambahkan buku ke daftar yang sesuai berdasarkan status selesai dibaca atau belum
            if (book.isComplete) {
                completeBookList.appendChild(bookElement);
            } else {
                incompleteBookList.appendChild(bookElement);
            }
        });
    }

    // Event listener untuk menangani form tambah buku
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Mengambil nilai dari input form
        const title = document.getElementById("bookFormTitle").value;
        const author = document.getElementById("bookFormAuthor").value;
        const year = parseInt(document.getElementById("bookFormYear").value);
        const isComplete = document.getElementById("bookFormIsComplete").checked;
        
        // Membuat objek buku baru
        const newBook = {
            id: new Date().getTime(), // Menggunakan timestamp sebagai ID unik
            title,
            author,
            year,
            isComplete,
        };

        // Menambahkan buku ke daftar dan menyimpan ke localStorage
        books.push(newBook);
        saveBooks();
        renderBooks();
        bookForm.reset(); // Mengosongkan form setelah submit
    });

    // Event listener untuk menangani form pencarian buku
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = document.getElementById("searchBookTitle").value;
        renderBooks(query);
    });

    // Memuat daftar buku saat halaman pertama kali dibuka
    renderBooks();
});
