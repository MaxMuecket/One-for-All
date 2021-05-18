// import fs from 'fs/promises';
import type { Credential } from '../types';
import CryptoJS from 'crypto-js';
import { getCredentialsCollection } from './db';
// import { MongoClient } from 'mongodb';

// type DB = {
//   credentials: Credential[];
// };

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
  // const data: DB = JSON.parse(response);
  // return cursor.toArray();
};

export const writeCredentials = async (
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
