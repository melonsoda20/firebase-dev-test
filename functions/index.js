// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: 'AIzaSyCRRXg4SiH3L4Lg_CR70_qVzFWKty9S9WU',
    authDomain: 'fir-dev-test-c0a05.firebaseapp.com',
    projectId: 'fir-dev-test-c0a05',
    storageBucket: 'fir-dev-test-c0a05.appspot.com',
    messagingSenderId: '619744347704',
    appId: '1:619744347704:web:a53631e267b324d96548cd',
    measurementId: 'G-HDQ3WX4GN6'
  };
  
  admin.initializeApp(firebaseConfig);

  /**
 * Return a ISBN URL
 *
 * @param {string} ISBN - ISBN Number
 * @return {string} ISBN URL
 */
const generateISBNURL = (ISBN) => {
    return `https://covers.openlibrary.org/b/isbn/${ ISBN }-S.jpg`
}

exports.addBookHTTP = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const author = req.query.author;
    const isbn = generateISBNURL(req.query.isbn);
    const title = req.query.title;
    const writeResult = await admin.firestore().collection('books').add({
        author,
        isbn,
        title
    });
    res.json({result: `Book has been added added.`});

  });

  exports.getBookHTTP = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const docID = req.query.id;
    const writeResult = await admin.firestore().collection('books').doc(docID).get();
    res.json(writeResult.data());
  });
  
exports.addBook = functions.firestore.document('/books/{documentId}')
.onCreate((snapshot, _context) => {
    const ISBNValue = snapshot.get('isbn')
    if(/^\d+$/.test(ISBNValue)){
        const newISBNValue = generateISBNURL(ISBNValue);
        const documentReference = snapshot.ref;
        return documentReference.set({ isbn: newISBNValue }, { merge: true });
    }
})
