import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

const { psqlUrl, psqlTest, travisDb } = keys;

const tableSeeds = `
  INSERT INTO
    users
      VALUES 
      ( default, 'markokaba99@gmail.com', 'Mac', 'Okaba', ${true}, '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni'),
      ( default, 'jj06@gmail.com', 'Joey', 'King', ${false}, '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni');
  INSERT INTO
    buses
      VALUES 
      ( default, 'ABJ32-456', 'Toyota', 'Hiace', '2016', 18, 1),
      ( default, 'LAG25-6336', 'Mercedes', 'Fortnight', '2018', 20, 1),
      ( default, 'LAG25-6337', 'Mercedes', 'Fortnight', '2018', 1, 1);
  INSERT INTO
    trips
      VALUES 
      ( default, 1, 'Ogun', 'Oyo', 2010.033, NOW(), '4pm', 'active', 1, 18),
      ( default, 2, 'Ogoja', 'Calabar', 123.00, NOW(), '6pm', 'cancelled', 1, 20),
      ( default, 3, 'Ogoja', 'Calabar', 123.00, NOW(), '6pm', 'active', 1, 1);
INSERT INTO
    bookings
      VALUES 
      ( default, 2, 1, 1, NOW(), '6pm', 12, NOW(), 'Joey', 'King', 'jj06@gmail.com'),
      ( default, 1, 3, 3, NOW(), '6pm', 1, NOW(), 'Mac', 'Okaba', 'markokaba99@gmail.com');
`;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? travisDb : psqlUrl
});

pool.on('connect', () => {
  console.log('Database connection has been established');
});

async function seeder() {
  await pool.query(tableSeeds);
  console.log('Tables are being seeded...');
  pool.end();
}
seeder();
