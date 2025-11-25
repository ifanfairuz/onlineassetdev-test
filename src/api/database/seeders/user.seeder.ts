import { Connection } from '../connection.ts'

export async function seedUsersData(db: Connection, onlyEmpty = false) {
  if (onlyEmpty) {
    const result = await db.query('SELECT COUNT(*) > 0 AS exists FROM users')
    if (result.rows[0].exists) {
      return
    }
  }

  const sql = 'INSERT INTO users (name, email) VALUES ($1, $2)'

  const datas = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
    { name: 'Alice Williams', email: 'alice@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },

    // more users...
    { name: 'Axel Casely', email: 'acasely0@privacy.gov.au' },
    { name: 'Rachelle Keningley', email: 'rkeningley1@pagesperso-orange.fr' },
    { name: 'Pennie Wildbore', email: 'pwildbore2@istockphoto.com' },
    { name: 'Jeri Morphew', email: 'jmorphew3@yale.edu' },
    { name: 'Xylina Lucia', email: 'xlucia4@amazon.co.jp' },
    { name: 'Cam Berrisford', email: 'cberrisford5@ftc.gov' },
    { name: 'Hermina Haydn', email: 'hhaydn6@nsw.gov.au' },
    { name: 'Stormy Daud', email: 'sdaud7@phpbb.com' },
    { name: 'Norine Beresford', email: 'nberesford8@deliciousdays.com' },
    { name: 'Fae Vlasov', email: 'fvlasov9@simplemachines.org' },
  ]

  for (const data of datas) {
    await db.query(sql, [data.name, data.email])
  }
}
