import {
  askForMainPassword,
  askForCommand,
  addNewCredential,
  selectService,
} from './utils/questions';
import { validateMainPassword, isNewCredentialInDb } from './utils/validation';
import { readCredentials, writeCredentials } from './utils/credentials';
import CryptoJS from 'crypto-js';

// const { MongoClient } = require('mongodb');

// function start() {
const start = async () => {
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
        {
          const credentials = await readCredentials();
          const credentialServices = credentials.map(
            (credential) => credential.service
          );

          if (credentials.length === 0) {
            console.log('it´s empty');
            break;
          }

          const service = await selectService(credentialServices);
          const selectedService = credentials.find(
            (credential) => credential.service === service
          );

          if (selectedService !== undefined) {
            selectedService.password = CryptoJS.AES.decrypt(
              selectedService.password,
              mainPassword
            ).toString(CryptoJS.enc.Utf8);
            console.log(selectedService);
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
          await writeCredentials(mainPassword, newCredential);
          console.log(
            `The service ${newCredential.service} has been added to the list`
          );
        }
        break;
    }
  }
};
start();
