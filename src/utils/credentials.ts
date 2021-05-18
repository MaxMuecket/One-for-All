import fs from 'fs/promises';
import type { Credential } from '../types';
import CryptoJS from 'crypto-js';

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile('./db.json', 'utf-8');
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const writeCredentials = async (
  mainPassword: string,
  newCredential: Credential
): Promise<void> => {
  const oldCredential: Credential[] = await readCredentials();

  newCredential.password = CryptoJS.AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();

  const newDB: DB = { credentials: [...oldCredential, newCredential] };
  await fs.writeFile('./db.json', JSON.stringify(newDB, null, 2));
};

// export function listDatabases(client):  async  Promise<> => {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log('Databases:');
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }
