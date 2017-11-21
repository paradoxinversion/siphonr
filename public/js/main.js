(function setDeleteButtons(){
  const buttons = document.getElementsByClassName('btn-delete-tweet');
  console.log(buttons);
  for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
      console.log(this.parentElement.id);
      fetch(`http://localhost:3000/tweets/${this.parentElement.id}`, {
        method: "DELETE"
      })
        .then(this.parentElement.remove());
    });
  }
})();
