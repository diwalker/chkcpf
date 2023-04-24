const readline = require('readline');

function generateRandomCPF() {
  let cpf = '';
  for (let i = 0; i < 9; i++) cpf += Math.floor(Math.random() * 10);

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  cpf += digit.toString();

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  cpf += digit.toString();

  return cpf;
}

function formatCPF(cpf) {
  return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
}

function isCPFValid(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;

  return true;
}

let ascii = (`

  \u001b[35m _  _  _         _           _     _           _        _  _  _        _  _  _  _       _  _  _  _  _
  (_)(_)(_)  _    (_)         (_)   (_)       _ (_)    _ (_)(_)(_) _    (_)(_)(_)(_)_    (_)(_)(_)(_)(_)
(_)         (_)   (_)         (_)   (_)    _ (_)      (_)         (_)   (_)        (_)   (_)
(_)               (_) _  _  _ (_)   (_) _ (_)         (_)               (_) _  _  _(_)   (_) _  _
(_)               (_)(_)(_)(_)(_)   (_)(_) _          (_)               (_)(_)(_)(_)     (_)(_)(_)
(_)          _    (_)         (_)   (_)   (_) _       (_)          _    (_)              (_)
(_) _  _  _ (_)   (_)         (_)   (_)      (_) _    (_) _  _  _ (_)   (_)              (_)
   (_)(_)(_)      (_)         (_)   (_)         (_)      (_)(_)(_)      (_)              (_)\u001b[0m
                                \u001b[36m+-++-++-+ +-++-++-++-++-++-++-++-+
                                  |b||y| |d||i||w||a||l||k||e||r|
                                +-++-++-+ +-++-++-++-++-++-++-++-+ \u001b[0m
                            

`)

console.log(`${ascii}`)

function showMenu() {
  console.log('\u001b[33mBem Vindo ao Gerador / Validador de CPF! Selecione uma opção:\u001b[0m\n\n1 - Gerar CPF\n2 - Validar CPF\n0 - Sair');
}

function readOption() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Opção: ', (option) => {
    switch (option) {
      case '1':
        const cpf = generateRandomCPF();
        console.log(`CPF gerado: ${formatCPF(cpf)}\n`);
        rl.close();
        showMenu();
        readOption();
        break;
      case '2':
        rl.question('Digite o CPF a ser validado: ', (cpf) => {
          if (isCPFValid(cpf)) console.log('\u001b[32mCPF válido! \u001b[0m');
          else console.log('\u001b[31mCPF inválido! \u001b[0m');
          rl.close();
          showMenu();
          readOption();
        });
        break;
      case '0':
        rl.close();
        break;
      default:
        console.log('Opção inválida!');
        rl.close();
        showMenu();
        readOption();
        break;
    }
  });
}

showMenu();
readOption();
