document.addEventListener('DOMContentLoaded', function() {
    const shoppingInput = document.getElementById('shoppingInput');
    const addShoppingButton = document.getElementById('addShoppingButton');
    const shoppingList = document.getElementById('shoppingList');

    let shoppingItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    function updateShoppingList() {
        shoppingList.innerHTML = '';
        shoppingItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item}
                <button class="deleteButton" data-index="${index}">
                    <img src="images/delete.svg" alt="Delete">
                </button>
            `;
            shoppingList.appendChild(listItem);
        });
    }

    function saveShoppingItems() {
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    }

    addShoppingButton.addEventListener('click', function() {
        const itemText = shoppingInput.value.trim();
        if (itemText !== '') {
            shoppingItems.push(itemText);
            updateShoppingList();
            saveShoppingItems();
            shoppingInput.value = '';
        }
    });

    shoppingList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('deleteButton') || target.parentNode.classList.contains('deleteButton')) {
            let index;
            if (target.classList.contains('deleteButton')) {
                index = target.dataset.index;
            } else {
                index = target.parentNode.dataset.index;
            }
            shoppingItems.splice(parseInt(index), 1);
            updateShoppingList();
            saveShoppingItems();
        }
    });

    updateShoppingList();
});
