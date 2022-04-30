// Execute migrations 
npx prisma migrate dev --schema database/schema.prisma

// Format and generate relations
npx prisma format --schema database/schema.prisma