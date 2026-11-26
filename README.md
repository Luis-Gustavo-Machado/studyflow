# StudyFlow — Organizador de Estudos

Aplicação web para organizar disciplinas, tarefas e compromissos de estudo. Projeto acadêmico desenvolvido com React + TypeScript.

## Tecnologias
- React 18 + TypeScript
- Vite
- React Router DOM
- Recharts
- Lucide React
- LocalStorage para persistência no navegador

## Como executar
1. Instale o Node.js (versão LTS): https://nodejs.org/
2. Abra a pasta `studyflow` no VS Code.
3. Abra o terminal integrado (`Terminal > New Terminal`).
4. Execute:

```bash
npm install
npm run dev
```

5. Abra no navegador o endereço exibido pelo Vite (normalmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Funcionalidades implementadas
- Dashboard com indicadores e tarefas próximas.
- Cadastro e listagem de disciplinas.
- Cadastro, busca, conclusão e exclusão de tarefas.
- Cadastro e listagem de eventos de estudo.
- Estatísticas por disciplina com gráfico.
- Perfil com edição de nome e e-mail.
- Persistência local via LocalStorage.
- Navegação entre seis páginas.
- Layout responsivo para desktop e celular.

## Hooks utilizados
- `useState`: formulários, filtros e estado das telas.
- `useEffect`: persistência dos dados no LocalStorage.
- `useContext`: compartilhamento dos dados da aplicação.
- `useMemo`: cálculo de listas e estatísticas.
- Hook personalizado `useGreeting`: saudação de acordo com o horário.

## Equipe
- Luis Gustavo
- Danilo
- Wagner
- italo gustavo
- Lucas martins
- Wagner Vinícius
- Victor libre

> Atualizem este README com os sobrenomes, turma, professor, instituição, prints reais da aplicação e a divisão final dos componentes após alinharem as responsabilidades.

## Observações acadêmicas
Os dados iniciais são exemplos demonstrativos. O armazenamento atual é local ao navegador/dispositivo e não sincroniza automaticamente entre usuários. Uma API/backend real pode ser adicionada como melhoria opcional, caso a equipe decida implementar o ponto extra.
