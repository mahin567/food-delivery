const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // For serving static files

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data (you can replace this with a real database later)
let orders = [
  { id: 1, customer: 'John Doe', items: ['Pizza', 'Pasta'], total: 25, status: 'Pending' },
  { id: 2, customer: 'Jane Smith', items: ['Cheeseburger', 'Fries'], total: 18, status: 'Pending' },
];

let menuItems = [
  { id: 1, name: 'Grilled Chicken', price: 12 },
  { id: 2, name: 'Veggie Burger', price: 10 },
];

let deliveries = [
  { id: 1, orderId: 1, address: '123 Main St', status: 'Pending' },
  { id: 2, orderId: 2, address: '456 Elm St', status: 'Pending' },
];

let analytics = {
  totalSalesToday: 200,
  ordersCompleted: 15,
  mostOrderedItems: ['Pizza', 'Cheeseburger'],
};

// API Endpoints

// Get orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Accept or reject order
app.post('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(order => order.id === parseInt(id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  res.json(order);
});

// Get menu items
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Add new menu item
app.post('/api/menu', (req, res) => {
  const newItem = req.body;
  menuItems.push(newItem);
  res.json(newItem);
});

// Edit menu item
app.put('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const item = menuItems.find(item => item.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  item.name = name;
  item.price = price;
  res.json(item);
});

// Delete menu item
app.delete('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  const index = menuItems.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    menuItems.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Menu item not found' });
  }
});

// Get deliveries
app.get('/api/delivery', (req, res) => {
  res.json(deliveries);
});

// Mark delivery as delivered
app.post('/api/delivery/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const delivery = deliveries.find(delivery => delivery.id === parseInt(id));
  if (!delivery) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  delivery.status = status;
  res.json(delivery);
});

// Get analytics
app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});

// Serve the index.html (or a similar frontend file) when visiting the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
