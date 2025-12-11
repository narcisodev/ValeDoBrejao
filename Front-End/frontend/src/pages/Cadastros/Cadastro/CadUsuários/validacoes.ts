export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export function validarData(data: string): boolean {
  const partes = data.split("/");
  if (partes.length !== 3) return false;

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);

  const d = new Date(ano, mes, dia);
  if (d.getFullYear() !== ano || d.getMonth() !== mes || d.getDate() !== dia)
    return false;

  if (d > new Date()) return false;
  return true;
}

export function validarSalario(salario: string): boolean {
  const valor = Number(salario.replace(/[^\d.-]/g, ""));
  return !isNaN(valor) && valor > 0;
}
