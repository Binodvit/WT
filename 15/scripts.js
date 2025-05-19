document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            alert(`Item ${itemId} added to cart!`); // Placeholder for cart functionality
        });
    });
});