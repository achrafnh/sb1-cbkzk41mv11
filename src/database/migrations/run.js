import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import Lawyer from '../../models/Lawyer.js';
import bcrypt from 'bcryptjs';

async function runMigrations() {
  try {
    await sequelize.sync({ force: true });

    // Create admin user
    await User.create({
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    // Create example lawyers
    const lawyers = [
      {
        name: 'John Doe',
        specialty: 'Criminal Law',
        experience_years: 10,
        email: 'john@example.com'
      },
      {
        name: 'Jane Smith',
        specialty: 'Corporate Law',
        experience_years: 15,
        email: 'jane@example.com'
      }
    ];

    await Lawyer.bulkCreate(lawyers);

    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();