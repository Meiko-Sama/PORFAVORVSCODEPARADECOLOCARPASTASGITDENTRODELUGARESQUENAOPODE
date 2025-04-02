console.log("TESTE");

//  Declarando o formulário

const formulario = document.getElementById("cadastro");

// Declarando cada campo do formulario
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const csenha = document.getElementById("csenha");
const celular = document.getElementById("tel");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");

// Declarando a mensagem de erro

const msgError = document.getElementsByClassName("msgError");

// --------------------------------------------------------------------------- //

// Função para renderizar os diferentes erros do cadastro
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

// ----- FUNÇÃO PRA VEREFICAR O NOME ------------------------------------------ //

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

// ----- FUNÇÃO PRA VEREFICAR O EMAIL ------------------------------------------ //

const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

// ----- FUNÇÃO PARA VERIFICAR SENHA FORTE ------------------------------------------ //

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos uma caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

// --- FUNÇÃO PARA VERIFICAR IGUALDADE DA SENHA ------------------------------ //

function checkPasswordMatch() {
  return senha.value === csenha.value ? true : false;
}

// --- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ------------------------------ //

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

// --- FUNÇÃO PARA INSERIR MASCARA NO cpf ------------------------------------- //

function maskCPFNumber(event) {
  let cpf = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(cpf)) {
    createDisplayMsgError("O cpf deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  cpf = cpf.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11);
  }

  if (cpf.length > 3) {
    cpf = `${cpf.substring(0, 3)}.${cpf.substring(3)}`;
  } else if (cpf.length > 0) {
    cpf = `${cpf}`;
  }

  if (cpf.length > 7) {
    cpf = `${cpf.substring(0, 7)}.${cpf.substring(7)}`;
  } else if (cpf.length > 0) {
    cpf = `${cpf}`;
  }

  if (cpf.length > 11) {
    cpf = `${cpf.substring(0, 11)} - ${cpf.substring(11)}`;
  } else if (cpf.length > 0) {
    cpf = `${cpf}`;
  }

  event.target.value = cpf;
}

// --- FUNÇÃO PARA INSERIR MASCARA NO rg ----------------------------------------- //

function maskRGNumber(event) {
  let rg = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(rg)) {
    createDisplayMsgError("O cpf deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  rg = rg.replace(/\D/g, ""); // Remove os caracteres que não numéricos

  if (rg.length > 9) {
    rg = rg.substring(0, 9);
  }

  if (rg.length > 2) {
    rg = `${rg.substring(0, 2)}.${rg.substring(2)}`;
  } else if (rg.length > 0) {
    rg = `${rg}`;
  }

  if (rg.length > 6) {
    rg = `${rg.substring(0, 6)}.${rg.substring(6)}`;
  } else if (rg.length > 0) {
    rg = `${rg}`;
  }

  if (rg.length > 10) {
    rg = `${rg.substring(0, 10)}-${rg.substring(10)}`;
  } else if (rg.length > 0) {
    rg = `${rg}`;
  }
  event.target.value = rg;
}

// --- FUNÇÃO PARA VERIFICAR IGUALDADE DA SENHA ------------------------------ //

const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.getElementsByClassName("container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain[0].appendChild(rain);

  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain[0].removeChild(rain);
  }, 1500);
};

setInterval(() => {
  rainFunction();
}, 250);

// --------------------------------------------------------------------------- //

formulario.addEventListener("submit", fetchDatas);

// CHECANDO O NOME //

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

// CEHCANDO SE O EMAIL É VALIDO //

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
  } else {
    createDisplayMsgError("");
  }
});

// CHECANDO SE A SENHA É FORTE //

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});

// Mascara no número de celular

celular.addEventListener("input", maskPhoneNumber);

// Mascara do cpf

cpf.addEventListener("input", maskCPFNumber);

// Mascara do rg

rg.addEventListener("input", maskRGNumber);

// VERIFICAÇÃO DE DADOS

function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}
