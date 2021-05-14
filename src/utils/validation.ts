import fs from 'fs/promises';
import sha256 from 'crypto-js/sha256';

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const origPasswordHash = await fs.readFile('./.password', 'utf-8');
  const passwordHash = sha256(plaintextPassword).toString();
  return passwordHash === origPasswordHash;
};
