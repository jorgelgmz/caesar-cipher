import inquirer from 'inquirer';

(async () => {
  const questions = await inquirer.prompt([
    {
      name: 'operation',
      message: 'What operation are you performing?',
      type: 'checkbox',
      choices: [
        {
          name: 'Encrypt',
        },
        {
          name: 'Decrypt',
        },
      ],
      validate(questions) {
        if (questions.length < 1) {
          return 'You must choose at least one operation.';
        }

        return true;
      },
    },
    {
      name: 'message',
      message: 'Please enter your message:',
      type: 'input',
      validate: (questions) => {
        return questions.length > 1;
      },
    },
    {
      name: 'key',
      message: 'Enter a key (number from 1 to 10,000):',
      type: 'input',
      validate: (questions) => {
        return parseInt(questions) > 1 && parseInt(questions) <= 10000;
      },
    },
  ]);
  ceasar(questions.operation.toString(), questions.message, parseInt(questions.key));
})();

const ceasar = (operation, text, key) => {
  const alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');
  let cipher = [...alphabet];
  let message = '';
  if (operation === 'Encrypt') {
    for (let i = 0; i < key; i++) {
      let character = cipher[0];
      cipher.shift();
      cipher.push(character);
    }
  } else if (operation === 'Decrypt') {
    for (let i = 0; i < key; i++) {
      let character = cipher[cipher.length - 1];
      cipher.pop();
      cipher.unshift(character);
    }
  } else {
    return console.log('Parameter must be either encrypt or decrypt.');
  }

  for (let letter of text) {
    if (alphabet.includes(letter.toLowerCase())) {
      if (letter === letter.toLowerCase()) {
        let index = alphabet.indexOf(letter);
        message += cipher[index];
      } else {
        let index = alphabet.indexOf(letter.toLowerCase());
        message += cipher[index].toUpperCase();
      }
    } else {
      message += letter;
    }
  }
  console.log(`Your ${operation}ed message is: \n${message}`);
};
