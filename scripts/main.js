/**************************Form Validation****************************/

class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }  
  
  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }
  
  validateOnSubmit() {
    let self = this
    
    this.form.addEventListener('submit', e => {
      const invalid = document.querySelector(`.invalid`)
      if(invalid != null){
        e.preventDefault()
      }
	   

	    self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input)
      })
    })
  }
  
  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)
      
      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })

    
  }
  
  validateFields(field) {
  
    // Check presence of values
    if (field.value.trim() === "") {
      this.setStatus(field, `Поле ${field.getAttribute(`placeholder`)} не заполнено`, "error")
    } else {
      this.setStatus(field, null, "success")
    }
    
    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, null, "success")
      } else {
        this.setStatus(field, "Введите валидный e-mail", "error")
      }
    }

     // check for a valid checkbox 
    if(field.type === "checkbox") {
      const customCheckbox = document.querySelector(`.custom__checkbox`)
      if(field.checked){
        customCheckbox.classList.remove(`error`)
        customCheckbox.classList.remove(`invalid`)
      } else {
        customCheckbox.classList.add(`error`)
        customCheckbox.classList.add(`invalid`)
      }
    }

     // check for a valid select
     if(field.tagName ===`SELECT`){
       const customSelect = document.querySelector(`.custom-select`)
       const customSelectItems = document.querySelectorAll(`.custom-select div`)
       customSelectItems.forEach((item)=>{
        item.addEventListener(`click`,()=>{
          customSelect.classList.remove(`error`)
          customSelect.classList.remove(`invalid`)
        })
       })
      if(field.value == 0){
        customSelect.classList.add(`error`)
      } else {
        customSelect.classList.remove(`error`)
        customSelect.classList.remove(`invalid`)
      }
     }
   
  }

  setStatus(field, message, status) {
    
    const successIcon = field.parentElement.querySelector('.icon-success')
    const errorIcon = field.parentElement.querySelector('.icon-error')
    const errorMessage = field.parentElement.querySelector('.error-message')

if(successIcon && errorIcon && errorMessage != null){

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
      field.classList.remove('invalid')
    } 
    
    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }
      field.parentElement.querySelector('.error-message').innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }    
  
  }
  
  }
}

const form = document.querySelector('#form')
const fields = ["name", "email","message","checkbox","select"]

const validator = new FormValidator(form, fields)
validator.initialize()









/*********Toggle lang link ********************************************/

const lang = document.querySelectorAll(`.lang`)

function toggleItem() {
  lang.forEach((item)=>{
      item.classList.toggle(`active`)
  })
}

  lang[1].classList.add(`active`)

  lang.forEach((item)=>{
  item.addEventListener(`click`, toggleItem)
  })


  

/**************Custom Select**************************/
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 