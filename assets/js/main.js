document.addEventListener("DOMContentLoaded", function () {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");

    const bookFormSubmitButton = document.getElementById("bookFormSubmit");
    const bookFormIsCompleteCheckbox = document.getElementById("bookFormIsComplete");
    const bookFormSubmitButtonSpan = bookFormSubmitButton.querySelector("span");

    function updateSubmitButtonText() {
        if (bookFormIsCompleteCheckbox.checked) {
            bookFormSubmitButtonSpan.textContent = "Selesai Dibaca";
        } else {
            bookFormSubmitButtonSpan.textContent = "Belum Selesai Dibaca";
        }
    }
    if (bookFormIsCompleteCheckbox && bookFormSubmitButtonSpan) {
        bookFormIsCompleteCheckbox.addEventListener("change", updateSubmitButtonText);
        updateSubmitButtonText(); // Initial call
    }


    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    function renderBooks(filter = "") {
        incompleteBookList.innerHTML = "";
        completeBookList.innerHTML = "";

        const fragmentIncomplete = document.createDocumentFragment();
        const fragmentComplete = document.createDocumentFragment();

        books.forEach(book => {
            if (filter && !book.title.toLowerCase().includes(filter.toLowerCase())) return;
            
            const bookElement = document.createElement("div");
            bookElement.setAttribute("data-bookid", book.id);
            bookElement.setAttribute("data-testid", "bookItem");
            
            bookElement.style.opacity = 0;
            bookElement.style.transform = 'translateY(20px)';

            bookElement.innerHTML = `
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                <div>
                    <button data-testid="bookItemIsCompleteButton" aria-label="${book.isComplete ? 'Mark as not finished reading' : 'Mark as finished reading'}: ${book.title}">
                        <ion-icon name="${book.isComplete ? "close-outline" : "checkmark-outline"}"></ion-icon> 
                        ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
                    </button>
                    <button data-testid="bookItemDeleteButton" aria-label="Delete book: ${book.title}">
                        <ion-icon name="trash-outline"></ion-icon> Hapus
                    </button>
                    <button data-testid="bookItemEditButton" aria-label="Edit book: ${book.title}">
                        <ion-icon name="pencil-outline"></ion-icon> Edit
                    </button>
                </div>
            `;
            
            bookElement.querySelector("[data-testid='bookItemIsCompleteButton']").addEventListener("click", () => {
                book.isComplete = !book.isComplete;
                saveBooks();
                renderBooks(filter);
            });

            bookElement.querySelector("[data-testid='bookItemDeleteButton']").addEventListener("click", () => {
                Swal.fire({
                    title: `Delete "${book.title}"?`,
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#04009A', // Adjusted to match theme
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const currentBookElement = document.querySelector(`[data-bookid='${book.id}']`);
                        if (currentBookElement) {
                            currentBookElement.classList.add('book-item-fade-out');
                            currentBookElement.addEventListener('transitionend', () => {
                                const index = books.findIndex(b => b.id === book.id);
                                if (index > -1) {
                                    books.splice(index, 1);
                                    saveBooks();
                                    currentBookElement.remove();
                                }
                            }, { once: true });
                        } else { // Fallback if element not found
                             const index = books.findIndex(b => b.id === book.id);
                             if (index > -1) {
                                 books.splice(index, 1);
                                 saveBooks();
                                 renderBooks(filter); // Full re-render as fallback
                             }
                        }
                    }
                });
            });
            
            bookElement.querySelector("[data-testid='bookItemEditButton']").addEventListener("click", async () => {
                const { value: formValues, isConfirmed } = await Swal.fire({
                    title: `Edit "${book.title}"`,
                    html:
                        `<input id="swal-input-title" class="swal2-input" placeholder="Title" value="${book.title}">` +
                        `<input id="swal-input-author" class="swal2-input" placeholder="Author" value="${book.author}">` +
                        `<input id="swal-input-year" class="swal2-input" type="number" placeholder="Year" value="${book.year}">`,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save Changes',
                    confirmButtonColor: '#04009A', // Adjusted to match theme
                    preConfirm: () => {
                        const title = document.getElementById('swal-input-title').value;
                        const author = document.getElementById('swal-input-author').value;
                        const yearString = document.getElementById('swal-input-year').value;
                        if (!title || !author || !yearString) {
                            Swal.showValidationMessage(`Please fill out all fields`);
                            return false;
                        }
                        const year = parseInt(yearString);
                        if (isNaN(year) || yearString.length !== 4 ) { // Basic year validation
                            Swal.showValidationMessage(`Year must be a valid 4-digit number`);
                            return false;
                        }
                        return { title, author, year };
                    }
                });

                if (isConfirmed && formValues) {
                    book.title = formValues.title;
                    book.author = formValues.author;
                    book.year = formValues.year;
                    saveBooks();
                    renderBooks(filter);
                }
            });

            if (book.isComplete) {
                fragmentComplete.appendChild(bookElement);
            } else {
                fragmentIncomplete.appendChild(bookElement);
            }
            // Stagger animation slightly or use rAF for better effect
            setTimeout(() => {
                bookElement.style.opacity = 1;
                bookElement.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure transition triggers
        });
        incompleteBookList.appendChild(fragmentIncomplete);
        completeBookList.appendChild(fragmentComplete);
    }

    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const title = document.getElementById("bookFormTitle").value;
        const author = document.getElementById("bookFormAuthor").value;
        const year = parseInt(document.getElementById("bookFormYear").value);
        const isComplete = document.getElementById("bookFormIsComplete").checked;
        
        const newBook = {
            id: new Date().getTime(),
            title,
            author,
            year,
            isComplete,
        };

        books.push(newBook);
        saveBooks();
        renderBooks();
        bookForm.reset();
        updateSubmitButtonText(); // Reset button text after form reset
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = document.getElementById("searchBookTitle").value;
        renderBooks(query);
    });

    renderBooks();
});
