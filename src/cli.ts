import dotenv from 'dotenv';

import {
  askForMainPassword,
  askForCommand,
  addNewCredential,
} from './utils/questions';
import { validateMainPassword, isNewCredentialInDb } from './utils/validation';
import {
  deleteCredential,
  selectCredential,
  writeCredential,
} from './utils/credentials';
import CryptoJS from 'crypto-js';
import { connectDatabase, disconnectDatabase } from './utils/db';

dotenv.config();

// function start() {

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error('Missing env MONGO_URL');
  }

  await connectDatabase(process.env.MONGO_URL);

  /* Solution with while */

  // let mainPassword = await askForMainPassword();
  // while (!isMainPasswordValid(mainPassword)) {
  //   console.log('Is invalid');
  //   mainPassword = await askForMainPassword();
  // }
  // console.log('Is valid');

  // Solution with recursion

  const mainPassword = await askForMainPassword();
  if (!(await validateMainPassword(mainPassword))) {
    console.log('Is invalid');
    start(); // Recursion
  } else {
    console.log('Is valid');

    const command = await askForCommand();

    switch (command) {
      case 'list':
      case 'delete':
        {
          const selectedCredential = await selectCredential();
          if (command === 'list') {
            if (selectedCredential !== undefined) {
              selectedCredential.password = CryptoJS.AES.decrypt(
                selectedCredential.password,
                mainPassword
              ).toString(CryptoJS.enc.Utf8);
              console.log(selectedCredential);
            }
          } else {
            const deleted = await deleteCredential(selectedCredential.service);
            if (deleted) {
              console.log('Deleted');
            } else {
              console.log('Not deleted');
            }
          }
        }
        break;

      case 'add':
        {
          let newCredential = await addNewCredential();
          while (await isNewCredentialInDb(newCredential)) {
            console.log(
              `The chosen service ${newCredential.service} already exists. Please choose a new service name`
            );
            newCredential = await addNewCredential();
          }
          await writeCredential(mainPassword, newCredential);
          console.log(
            `The service ${newCredential.service} has been added to the list`
          );
        }
        break;
    }
    await disconnectDatabase();
  }
};
start();

// if (credentials.length === 0) {
//   console.log('it´s empty');
//   break;
