const getQuoteApi = document.getElementById("getQuoteApi");
const content = document.getElementById("content");
const addQuote = document.getElementById("addQuote");
const getQuoteLocal = document.getElementById("getQuoteLocal");
const listAll = document.getElementById("listLocal");
const buttonArea = document.getElementById('buttonArea')
const pre = document.createElement("pre");

//Setting the local storage value to  data array
let  data = localStorage.getItem("quote")
  ? JSON.parse(localStorage.getItem("quote"))
  : [];
localStorage.setItem("quote", JSON.stringify(data));

getQuoteApi.addEventListener("click", getAQuote);
getQuoteLocal.addEventListener("click", retriveFromStorage);
addQuote.addEventListener("click", addQuoteToLocal);

listAll.addEventListener("click", function(e) {
  e.preventDefault();
  content.innerHTML=''
  buttonArea.innerHTML=''
  
  
  const lineBreak = document.createElement('br')
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML ='Delete'

  data.forEach(quote => {
    pre.innerHTML += quote.content + "\n \n-" + quote.author + "\n\n";
    pre.appendChild(lineBreak)
    pre.appendChild(editBtn);
    pre.appendChild(deleteBtn)
    pre.appendChild(lineBreak)

    
    deleteBtn.addEventListener('click',function(e){
      e.preventDefault()
      console.log(this)
      // data = data.filter(quo => quo._id != quote._id)
      // localStorage.setItem("quote", JSON.stringify(data));
      // pre.innerHTML = 'Quote Deleted'
      // content.appendChild(pre)

      
   });

   content.appendChild(pre)

   })
   
});

function getAQuote(e) {
  e.preventDefault();
  buttonArea.innerHTML = "";
  content.innerHTML=''
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.quotable.io/random");
  xhr.send();
  xhr.onload = function() {
    displayQuote(JSON.parse(xhr.responseText));
  };
  /// display the 'save to local' button only when the data is returned from the server
  const button = document.createElement("button");
  button.innerHTML = "Save To Local";

  button.addEventListener("click", function(e) {
    e.preventDefault();
    data.push(JSON.parse(xhr.responseText));
    localStorage.setItem("quote", JSON.stringify(data));
    button.innerHTML = "Saved";
    button.setAttribute("disabled", true);
  });
  buttonArea.appendChild(button);
}

function retriveFromStorage(e) {
  e.preventDefault();
  buttonArea.innerHTML = "";
  content.innerHTML=''
  const rand = Math.floor(Math.random() * data.length);

  if (JSON.parse(localStorage.quote)[rand]) {
    pre.innerHTML =
      JSON.parse(localStorage.quote)[rand].content +
      "\n \n-" +
      JSON.parse(localStorage.quote)[rand].author;
    content.appendChild(pre);
    const btn = document.createElement("button");
    btn.innerHTML = "Edit";
    buttonArea.appendChild(btn);

    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const textBox = document.createElement("textarea");
      textBox.setAttribute("cols", "50");
      textBox.setAttribute("rows", "10");
      content.replaceChild(textBox, pre);
      textBox.innerHTML = JSON.parse(localStorage.quote)[rand].content

      const lineBreak = document.createElement('br')
      content.appendChild(lineBreak)

      const authorBox = document.createElement('textarea')
      authorBox.setAttribute("cols", "50");
      authorBox.setAttribute("rows", "1");
      content.appendChild(authorBox)
      authorBox.innerHTML = JSON.parse(localStorage.quote)[rand].author

      buttonArea.innerHTML = ''

      const saveButton = document.createElement('button')
      saveButton.innerHTML='Save'
      buttonArea.appendChild(saveButton)

      saveButton.addEventListener('click',function(e){
        e.preventDefault()
       
        const newQuote = {
          _id: data[rand]._id,
          content: textBox.value,
          author:authorBox.value
        }

        data[rand] = newQuote
    
        // console.log(newQuote)
        
        localStorage.setItem("quote", JSON.stringify(data));

        content.innerHTML=''
      buttonArea.innerHTML=''
      pre.innerHTML = 'Quote Edited'
      content.appendChild(pre)

        console.log(JSON.parse(localStorage.quote)[rand] )
      })
    });

    const btn1 = document.createElement("button");
    btn1.innerHTML = "Delete";
    buttonArea.appendChild(btn1);
    btn1.addEventListener("click", function() {
      data = data.filter(quote => quote._id != data[rand]._id)
      localStorage.setItem("quote", JSON.stringify(data));
      content.innerHTML=''
      buttonArea.innerHTML=''
      pre.innerHTML = 'Quote Deleted'
      content.appendChild(pre)
    });


    console.log(JSON.parse(localStorage.quote)[rand])
  }
}

function displayQuote(quote) {
  pre.innerHTML = quote.content + "\n \n-" + quote.author + "\n\n";
  content.appendChild(pre);
}

function addQuoteToLocal(e) {
  e.preventDefault();
  buttonArea.innerHTML = "";
  content.innerHTML=''
  const quot = document.createElement("textarea");
  quot.setAttribute("cols", "50");
  quot.setAttribute("rows", "10");
  const author = document.createElement("textarea");
  author.setAttribute("cols", "50");
  author.setAttribute("rows", "1");

  const addQuote = document.createElement("button")
  const lineBreak = document.createElement('br')

  addQuote.innerHTML='Add Quote'
  content.appendChild(quot);
  content.appendChild(lineBreak)
  content.appendChild(author);
  buttonArea.appendChild(addQuote)

  addQuote.addEventListener("click", function(e) {
    e.preventDefault();
    
    
    quote = {
      _id: makeid(12),
      content: quot.value,
      author:author.value
    }

    data.push(quote);
    localStorage.setItem("quote", JSON.stringify(data));

  console.log(quote)

  content.innerHTML=''
      buttonArea.innerHTML=''
      pre.innerHTML = 'Quote Added'
      content.appendChild(pre)

  });

}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
