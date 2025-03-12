import { execSync } from 'child_process';

console.log('Running migrations...');
try {
  // Specify the knexfile location explicitly
  execSync('npx knex migrate:latest --knexfile=./dist/knexfile.js', { stdio: 'inherit' });
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

console.log('Starting server...');
// Import your server entry point
import './src/index';