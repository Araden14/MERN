import faker from 'faker';

const Datagen = () => {
  const users = Array.from({ length: 50 }, () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    city: faker.address.city(),
    school: faker.company.companyName(), // Corrected the capitalization of 'school'
    country: faker.address.country(),
    role: 'user'
  }));

  const json = JSON.stringify(users); // Convert users array to JSON string
  return json;
};

export default Datagen;