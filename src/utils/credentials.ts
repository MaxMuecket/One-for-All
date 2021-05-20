// import fs from 'fs/promises';

import type { Credential } from '../types';
import CryptoJS from 'crypto-js';
import { getCredentialsCollection } from './db';
import { selectService } from './questions';

// import { MongoClient } from 'mongodb';

// type DB = {
//   credentials: Credential[];
// };

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
  // const data: DB = JSON.parse(response);
  // return cursor.toArray();
};

export const readCredential = async (service: string): Promise<Credential> => {
  const credential = await getCredentialsCollection().findOne({ service });
  if (!credential) {
    throw new Error(`Can not find credential ${service}!`);
  }
  return credential;
};

export const writeCredential = async (
  mainPassword: string,
  newCredential: Credential
): Promise<void> => {
  // const oldCredential: Credential[] = await readCredentials();

  newCredential.password = CryptoJS.AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();

  // const newDB: DB = { credentials: [...oldCredential, newCredential] };

  await getCredentialsCollection().insertOne(newCredential);
};

export const selectCredential = async (): Promise<Credential> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );
  const service = await selectService(credentialServices);
  const selectedCredential = credentials.find(
    (credential) => credential.service === service
  );
  if (!selectedCredential) {
    throw new Error('Can not find credential');
  }
  return selectedCredential;
};

export const deleteCredential = async (service: string): Promise<boolean> => {
  const result = await getCredentialsCollection().deleteOne({
    service,
  });
  if (result.deletedCount === undefined) {
    return false;
  }
  return result.deletedCount > 0;
};
