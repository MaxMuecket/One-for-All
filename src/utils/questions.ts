import inquirer from 'inquirer';
import type { Command, Credential } from '../types';

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = async (): Promise<string> => {
  const answers = await inquirer.prompt<{ mainPassword: string }>([
    {
      type: 'password',
      name: 'mainPassword',
      message: 'Enter main password （⊙ｏ⊙)',
      mask: [],
    },
  ]);
  return answers.mainPassword;
};

export const askForCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: 'list',
    name: 'command',
    message: 'What would you like to do?',
    choices: [
      { name: 'List credentials', value: 'list' },
      { name: 'Add new credentials', value: 'add' },
    ],
  });

  return answers.command;
};

export const addNewCredential = async (): Promise<Credential> => {
  const answers = await inquirer.prompt<Credential>([
    {
      type: 'input',
      name: 'service',
      message: "What's the service?",
    },

    {
      type: 'input',
      name: 'username',
      message: "What's your username?",
    },

    {
      type: 'password',
      name: 'password',
      message: "What's your password?",
      mask: [],
    },
  ]);
  return answers;
};

export const selectService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>({
    type: 'list',
    name: 'service',
    message: 'Choose a service',
    choices: services,
  });

  return answers.service;
};
