// import fs from 'fs/promises';
import sha256 from 'crypto-js/sha256';
import { readCredentials } from './credentials';
import type { Credential } from '../types';

export const validateMainPassword = async (
  plaintextPassword: string
): Promise<boolean> => {
  const origPasswordHash = process.env.MAIN_PASSWORD;
  const passwordHash = sha256(plaintextPassword).toString();
  return passwordHash === origPasswordHash;
};

export const isNewCredentialInDb = async (
  newCredential: Credential
): Promise<boolean> => {
  const allCredentials = await readCredentials();
  const newCredentialInDb = await allCredentials.some(
    (credential) => credential.service === newCredential.service
  );
  return newCredentialInDb;
};
