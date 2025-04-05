document.addEventListener('DOMContentLoaded', () => {
  // Array to map food items to their modal IDs
  const foodModalMap = [
    { name: 'chilli chicken - dry (serves 2)', modalId: 'chilli-chicken-modal' },
    { name: 'molten cheese spring rolls (6 pcs)', modalId: 'molten-cheese-modal' },
    { name: 'vagetablerolls', modalId: 'vagetablesroll-model' },
    { name: 'achari rice', modalId: 'achari-rice-modal' },
    { name: 'burger (6 pcs)', modalId: 'burger-modal' },
    { name: 'pasta', modalId: 'pasta-modal' },
    { name: 'momos', modalId: 'momos-model' },
    { name: 'chaoumin', modalId: 'choumin-modal' },
    { name: 'biryani', modalId: 'Biryani-model' },
    { name: 'pizza', modalId: 'pizza-model' },
    { name: 'cake', modalId: 'cake-model' },
    { name: 'sushi', modalId: 'sushi-model' },
    { name: 'hotdogs', modalId: 'hotdogs-model' },
    { name: 'friedrice', modalId: 'friedrice-model' },
    
  ];

  // Get all "Add" buttons
  const addButtons = document.querySelectorAll('.add-btn');
  
  // Function to open the modal based on the clicked button
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.closest('.menu-item').querySelector('h3').textContent.trim().toLowerCase();
      
      // Find the modal ID from the array
      const foodItem = foodModalMap.find(item => item.name.toLowerCase() === itemName);
      
      if (!foodItem) {
        console.log('No modal available for this item.');
        return;
      }
      
      // Open the modal for the clicked item
      const modal = document.getElementById(foodItem.modalId);
      modal.classList.remove('hidden');
      
      // Set default item price in modal (could be dynamically set if needed)
      const priceElement = modal.querySelector('.add-item-btn');
      priceElement.textContent = `Add Item | ৳329`; // Modify based on selected item
    });
  });

  // Close modal functionality
  const closeBtns = document.querySelectorAll('.close-btn');
  closeBtns.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      modal.classList.add('hidden');
    });
  });

  // Quantity control (increment and decrement)
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  quantityBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      const quantityDisplay = e.target.closest('.quantity').querySelector('#quantity');
      let currentQuantity = parseInt(quantityDisplay.textContent);

      if (e.target.id === 'increment') {
        currentQuantity++;
      } else if (e.target.id === 'decrement' && currentQuantity > 1) {
        currentQuantity--;
      }

      quantityDisplay.textContent = currentQuantity;
    });
  });
});
