// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
}

// Get the modal
var modalEdit = document.getElementById("myEditModal");
    
function openModal(event){
    document.getElementById("new-edit-task").value = event.parentNode.parentNode.parentNode.children[0].innerText;
    modalEdit.style.display = "block";
        
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modalEdit) {
        modalEdit.style.display = "none";
    }
}


