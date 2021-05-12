export const printPassword = (service: string): void => {
  const password = service + '234';
  console.log(`the password for ${service} is ${password}`);
};
