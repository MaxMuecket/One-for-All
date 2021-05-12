import { printPassword } from './utils/messages';
import {
  askForMainPassword,
  askForCommand,
  addNewCredential,
  selectService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';

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
  if (!isMainPasswordValid(mainPassword)) {
    console.log('Is invalid');
    start(); // Recursion
  } else {
    console.log('Is valid');

    const command = await askForCommand();

    switch (command) {
      case 'list':
        {
          const service = await selectService(['Github', 'Codewars', 'Google']);
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
