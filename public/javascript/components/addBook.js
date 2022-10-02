import { html, render } from 'uhtml';
import menu from '../extensions/menu';
import {generateEmptyFieldMessage, generateInvalidLengthMessage} from "../services/errors";

export default {
  path: '/add-book',
  label: 'Add Book',
  callback(update) {
    const bookAuthorInputID = "book-author-input";
    const bookAuthorInputErrorMessageID = "book-author-input-error";
    const bookTitleInputID = "book-title-input";
    const bookTitleInputErrorMessageID = "book-title-input-error";
    const bookISBNInputID = "book-ISBN-input";
    const bookISBNInputErrorMessageID = "book-ISBN-input-error";
    const addBookResultID = "add-book-results"
    const ISBNRequiredLength = 13;
    
    const validateBookData = async () => {
      let isValid = true;
      const bookAuthorInputElement = document.getElementById(bookAuthorInputID);
      const bookAuthorErrorElement = document.getElementById(bookAuthorInputErrorMessageID);
      const bookTitleInputElement = document.getElementById(bookTitleInputID);
      const bookTitleErrorElement = document.getElementById(bookTitleInputErrorMessageID);
      const bookISBNInputElement = document.getElementById(bookISBNInputID);
      const bookISBNErrorElement = document.getElementById(bookISBNInputErrorMessageID);

      if(bookAuthorInputElement.value === ''){
        isValid = false;
        bookAuthorErrorElement.innerText = generateEmptyFieldMessage("Author")
      }
      else{
        bookAuthorErrorElement.innerHTML = "";
      }

      if(bookTitleInputElement.value === ''){
        isValid = false;
        bookTitleErrorElement.innerText = generateEmptyFieldMessage("Title")
      }
      else{
        bookTitleErrorElement.innerHTML = "";
      }

      if(bookISBNInputElement.value.length !== ISBNRequiredLength){
        isValid = false;
        bookISBNErrorElement.innerText = generateInvalidLengthMessage("ISBN", ISBNRequiredLength)
      }
      else{
        bookISBNErrorElement.innerHTML = "";
      }

      if(isValid){
        try{
          const addBookURL = `http://localhost:5001/firebase-dev-test-123/us-central1/addBookHTTP?author=${bookAuthorInputElement.value}&isbn=${bookISBNInputElement.value}&title=${bookTitleInputElement.value}`;

          fetch(addBookURL)
          .then((response) => response.json())
          .then((responseJSON) => {
             // do stuff with responseJSON here...
             const responseText = responseJSON.result
             document.getElementById(addBookResultID).innerText = responseText
          });
        }
        catch(err){
          console.log(err)
        }
      }
    }

    render(document.querySelector('.container'), html`
      ${ menu(update) }
      <h1>Add Book</h1>
      <div class="add-book-container">
        <div class="formElement full">
          <label for="book-author-input">Author</label>
          <input type="text" placeholder="Enter book author" id="${bookAuthorInputID}" />
        </div>
        <span class="formElement full error-message" id="${bookAuthorInputErrorMessageID}"></span>
        <div class="formElement full">
          <label for="book-title-input">Title</label>
          <input type="text" placeholder="Enter book title" id="${bookTitleInputID}" />
        </div>
        <span class="formElement full error-message" id="${bookTitleInputErrorMessageID}"></span>
        <div class="formElement full">
          <label for="book-ISBN-input">ISBN</label>
          <input 
            type="number" 
            placeholder="Enter book ISBN" 
            id="${bookISBNInputID}" 
            onKeyPress="if(this.value.length===13) return false;"
          />
        </div>
        <span class="formElement full error-message" id="${bookISBNInputErrorMessageID}"></span>
        <div class="formElement full">
          <button type="button" onClick="${async () => {await validateBookData();}}">Add Book Data</button>
        </div>
        <div class="formElement full">
          <label id="${addBookResultID}"></label>
        </div>
      </div>
    `);
  }
};