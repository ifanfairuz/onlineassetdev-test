import { Connection } from '../connection.ts'

export async function seedProductsData(db: Connection) {
  const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3)'

  const datas = [
    { name: 'Laptop', price: 1000, category: 'electronics' },
    { name: 'Phone', price: 500, category: 'electronics' },
    { name: 'Tablet', price: 700, category: 'electronics' },
    { name: 'Headphones', price: 50, category: 'electronics' },
    { name: 'Keyboard', price: 200, category: 'electronics' },

    // more products...
    { name: 'Sporty Leggings', price: 39.99, category: 'Clothing - Activewear' },
    { name: 'Athletic Jogging Jacket', price: 49.99, category: 'Clothing - Outerwear' },
    { name: 'Training Soccer Ball', price: 19.99, category: 'Sports' },
    { name: 'Folding Exercise Bike', price: 199.99, category: 'Fitness' },
    { name: 'Sweetened Condensed Milk', price: 1.89, category: 'Food - Baking Goods' },
    { name: 'Italian Sausage Links', price: 5.99, category: 'Food - Meat & Poultry' },
    { name: 'Bicycle Repair Kit', price: 14.99, category: 'Outdoor' },
    { name: 'Tailored Blazer', price: 99.99, category: 'Clothing - Outerwear' },
    { name: 'Electric Air Pump', price: 29.99, category: 'Outdoor' },
  ]

  for (const data of datas) {
    await db.query(sql, [data.name, data.price, data.category])
  }
}
