

    document.addEventListener("DOMContentLoaded", () => {
        
        function fetchReturnedBooks() {
            axios.get("http://localhost:2020/get-returned-books")
                .then((response) => {
                    console.log(response)
                    const books=response.data.returnedBooks
                    const returnedBookSection = document.getElementById("returnedBook");
                    returnedBookSection.innerHTML = `<h3>Returned Books</h3>`;
                    books.forEach(book=>{
                    const div=document.createElement('div')
                    div.classList.add("book-container");
                    div.innerHTML = `<h5>Book Name: ${book.bookName}</h5>
                    <p>Fine: ₹${book.fine}</p>
                    <p>Return Date: ${book.ReturnDate}</p>
                    `;
                    returnedBookSection.appendChild(div);
                    })
                    
                })
                .catch(err => console.error("Error fetching returned books", err));
        }

        fetchReturnedBooks();
        function showBook(book) {
            const bookIssued = document.getElementById("book-issued");
            const bookSection = document.createElement("div");
            bookSection.classList.add("book-container");
            const singleBook = document.createElement("div");
            singleBook.classList.add("single-book");
        
            //  fine calculation
            const returnTime = book.bookReturn;
            const now = new Date();
            const currentTime=now.toLocaleString()

            let fine = 0;
            console.log("return time",returnTime.split(/[/\,:/s]+/))
            console.log("current time",currentTime.split(/[/\,:/s]+/))
            const returnTimeArr=returnTime.split(/[/\,:/s]+/)
            const currentTimeArr=currentTime.split(/[/\,:/s]+/)
            if (currentTime > returnTime) {
                let sum=0
                
                
                    const dayDiff=currentTimeArr[0]-returnTimeArr[0]
                    console.log("day ",dayDiff)
                    const monthDiff=currentTimeArr[1]-returnTimeArr[1]
                    console.log("month ",monthDiff)
                    const yearDiff=currentTimeArr[2]-returnTimeArr[2]
                    console.log(" year",yearDiff)

                    const hourDiff=currentTimeArr[3]-returnTimeArr[3]
                    console.log("hour",hourDiff)

                    const diff=(dayDiff*24)+(monthDiff*30*24)+(yearDiff*12*30*24)+hourDiff
                    sum+=Math.abs(diff)
                    console.log(sum)
                
                // console.log("difference of time",diffInMilliseconds)
                const hoursLate = Math.ceil(sum); // Round up
                console.log(hoursLate)
                fine = hoursLate * 10; // ₹10 per hour
                console.log("fine calculated",fine)
            }
        
            singleBook.innerHTML = `
                <h3>Book Name: ${book.bookName}</h3>
                <h3>Book Taken On: ${book.bookTaken}</h3>
                <h3>Book Return On: ${book.bookReturn}</h3>
                <h3>Current Fine: ₹${fine}</h3>
                <button class="return-book btn btn-success">Return Book</button>
            `;
        
            bookSection.appendChild(singleBook);
            bookIssued.appendChild(bookSection);
        
            const returnBookBtn = singleBook.querySelector(".return-book");
        
            returnBookBtn.addEventListener("click", () => {
                returnBook(singleBook, fine, book.id);
            });
        }

        function returnBook(bookElement, fine, bookId) {
            bookElement.innerHTML = `
                <h3>Fine Amount: </h3>
                <input type=number value=${fine} id='paidFine' disabled>
                <button class="pay-fine btn btn-danger">Pay Fine</button>
            `;

            const payFineBtn = bookElement.querySelector(".pay-fine");

            payFineBtn.addEventListener("click", () => {
                const fine=document.getElementById('paidFine').value
                axios.put(`http://localhost:2020/return-book/${bookId}`,{fine})
                    .then(() => {
                        bookElement.innerHTML = "<h3>Book Returned</h3>";
                        fetchReturnedBooks()
                        document.getElementById("returnedBook").appendChild(bookElement);
                        
                    })
                    .catch(err => console.log("Error in returning book", err));
            });
        }

        axios.get("http://localhost:2020/get-book/")
            .then(response => {
                response.data.allBook.forEach(showBook);
            })
            .catch(err => console.log("Error fetching books", err));

        


            document.getElementById('book-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const bookName = document.getElementById('bookName').value;
                const now = new Date();
                const bookTaken = now.toLocaleString();
                now.setHours(now.getHours() + 1);
                const bookReturn = now.toLocaleString();
        
                const obj = { bookName, bookTaken, bookReturn };
                console.log("sending the data from frontend",obj)
                axios.post("http://localhost:2020/add-book/", obj)
                    .then((response) =>{
                        console.log("getting the data from backend") 
                        showBook(response.data.newBook)
                    })
                    .catch(err => console.log("Error adding book", err));
            });
        });

    
