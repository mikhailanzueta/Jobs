import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';  // We will use bcryptjs to hash the password for security
import zxcvbn from "zxcvbn";

const prisma = new PrismaClient();
prisma.user
async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'user@yahoo.com',
      name: 'Jane Doe',
    },
  });

  // Hash the password for the UserPassword model
  const password = 'securePassword123!'; // Change this to your desired password

  // test password strength
  const passwordStrength = zxcvbn(password)
  console.log("Checking password strength....")
  if (passwordStrength.score < 3) {
    throw new Error("Password is too weak! Try using capital case, numbers and special characters.")
  } else {
    console.log("Password is strong!")
  }

  const hashedPassword = await hash(password, 10); // 10 is the salt rounds for bcrypt

  // Create a password for the user
  const userPassword = await prisma.userPassword.create({
    data: {
      userPassword: hashedPassword,
      id: user.id, // Associate the password with the user created earlier
    },
  });

  // Optionally, you can create an active password if needed (the ActiveUserPassword model)
  await prisma.activeUserPassword.create({
    data: {
      userId: user.id,
      passwordId: userPassword.id,
    },
  });

  console.log('User and password created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
