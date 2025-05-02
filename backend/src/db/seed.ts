import fs from 'fs';
import { query } from '.';

async function seedDatabase() {
  try {
    const seedQuery = fs.readFileSync('src/db/seeding.sql', {
      encoding: 'utf8',
    });
    await query(seedQuery);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();
