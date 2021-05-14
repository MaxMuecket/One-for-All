import { printPassword } from './utils/messages';
import {
  askForMainPassword,
  askForCommand,
  addNewCredential,
  selectService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import { readCredentials } from './utils/credentials';

// function start() {
const start = async () => {
  /* Solution with while */

  // let mainPassword = await askForMainPassword();
  // while (!isMainPasswordValid(mainPassword)) {
  //   console.log('Is invalid');
  //   mainPassword = await askForMainPassword();
  // }
  // console.log('Is valid');

  /* Solution with recursion */
  const mainPassword = await askForMainPassword();
  if (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid');
    start(); // Recursion
  } else {
    console.log('Is valid');

    const command = await askForCommand();

    switch (command) {
      case 'list':
        {
          const credentials = await readCredentials();
          const credentialServices = credentials.map(
            (credential) => credential.service
          );
          const service = await selectService(credentialServices);
          const selectedService = credentials.find(
            (credential) => credential.service === service
          );
          console.log(selectedService);

          printPassword(service);
        }
        break;
      case 'add':
        {
          const newCredential = await addNewCredential();
          console.log(newCredential);
        }
        break;
    }
  }
};
start();
