Preciso atualizar meu relatório final agora que o  projeto está completo. Para complementar e melhorar o trecho do relatório de PLATAFORMA leia as pastas backend e frontend. Para complementar o relatório PREDITIVO leia os resultados/outputs e markdowns dos notebooks na raiz da pasta ML-spectroscopy-analysis (Analise_Espectroscopica_MLPR_Todos_Filtros e Analise_Espectroscopica_Otimizada_Todos_Filtros). Quero atualizar esses trechos abaixo com o que foi feito. Por exemplo, atualmente não são só 3 filtros, foram 16 e foi feita uma avaliação deles, hoje a plataforma já conta com a integração com hardware.

## PLATAFORMA

Metodologia
A presente proposta de projeto de pesquisa e desenvolvimento tecnológico será constituída de diferentes etapas, sendo: (i) desenvolvimento de aplicação/software; (ii) integração hardware e software da plataforma inteligente; e (iii) avaliação da plataforma em condições de laboratório. A etapa (i) desenvolvimento de software encontra-se em fase de finalização. A etapa (ii) integração hardware e software da plataforma inteligente encontra-se em desenvolvimento. Após finalizada as etapas (i) e (ii) será iniciado a avaliação da plataforma. 
(i) Desenvolvimento de aplicação/software
A aplicação/software está sendo desenvolvida como uma solução web voltada para a análise espectroscópica para monitoramento da qualidade de uvas de mesa e a fim de ter uma escalabilidade, fácil manutenção e boa performance foram utilizadas algumas tecnologias consolidadas para frontend e backend.
O frontend foi construído utilizando a ferramenta Next.js 15 que provê uma estrutura mais robusta para desenvolvimento com React (TypeScript) e permite que sejam organizadas as rotas (páginas) e componentes de forma escalável. O Turbopack para builds mais rápidos é uma ferramenta de bundling (agrupa as dependências num pacote otimizado) do ecossistema Vercel que permite visualizar as alterações durante a edição do código em tempo real. A estilização da interface é feita com Tailwind CSS com o auxílio de plugins como tailwind-merge (para evitar conflitos de classes) e tailwindcss-animate (para adicionar animações leves e responsivas).
O sistema de autenticação do sistema é robusto, utilizando NextAuth.js para gerenciar sessões (logins) de usuário junto ao JWT (JSON Web Token) para autenticação segura baseada em tokens.
No backend foi adotada uma arquitetura híbrida: (1) parte em Next.js API Routes que permite a utilização de endpoints serverless (funções que só rodam quando são chamadas) no projeto, (2) para gerenciar os dados da aplicação foi utilizado o Prisma ORM, para comunicação com banco MySQL, com um modelo de dados fortemente tipado e migrações controladas, (3) por fim, a última integração do backend foi com FastAPI, na linguagem Python, para processamento dos dados espectrais e execução dos modelos preditivos de machine learning providos pelo ecossistema de bibliotecas de ciência de dados da linguagem.
A estratégia de desenvolvimento e implementação do software foi em camadas, separando responsabilidades para facilitar manutenção, testes e expansão. A aplicação possui as seguintes camadas: (1) camada de usuário – responsável pela interface com o usuário, visualização de dados espectrais, edição e aplicação de filtros, e configuração de variedades de uvas; (2) camada de dados – responsável por realizar a predição dos atributos de qualidade das uvas, com base em modelos previamente treinados e validados; (3) camada de servidor – faz a intermediação entre os dispositivos, garantindo integridade e consistência na troca de informações; e (4) camada de comunicação – realiza a aquisição dos dados espectrais provenientes de espectrômetros conectados ao dispositivo.
As funcionalidades a serem disponibilizadas pela aplicação necessitam que o usuário esteja conectado ao servidor local, permitindo utilização offline, e podem ter conexão com um servidor remoto via internet. Todavia, será disponibilizado o acesso às funcionalidades que não dependem do servidor remoto, como a comunicação do espectrômetro com o dispositivo, e a aquisição e visualização dos dados espectrais das variedades de uvas.

(ii) Integração hardware e software da plataforma inteligente
A plataforma destina a determinação dos atributos de qualidade será composta por uma arquitetura que integra hardware e software de forma coesa: (1) o sistema físico é composto por: espectrômetro portátil DLP NIRscan Nano (DLPNIRNANOEVM) responsável pela coleta dos dados espectroscópicos; fonte de alimentação independente como bateria de íon de lítio ou polímero de lírios, garantindo a mobilidade da plataforma; dispositivo móvel (notebook) que realizará a interface entre o usuário e o espectrômetro, (2) o software é composto por: servidor backend  baseado em FastAPI, que gerencia a comunicação com o espectrômetro via protocolo USB HID; banco de dados para armazenamento dos espectros, metadados e predições; dashboard web acessível por navegador para visualização dos resultados e controle das análises (3) a comunicação entre o backend e o espectrômetro será realizada via interface USB HID, conforme descrito na documentação oficial do dispositivo e para isso, a biblioteca hidapi será utilizada para: identificar o dispositivo conectado por meio dos identificadores Vendor ID: 0x0451 e Product ID: 0x4200; montar os pacotes de comunicação seguindo a estrutura definida no Apêndice H do manual técnico (figura 1) utilizando comando específicos como o NNO_CMD_PERFORM_SCAN para iniciar uma varredura; interpretar as respostas do espectrômetro, extraindo dados espectrais e status da operação; o FastAPI irá expor endpoints /star_scan, /stop_scan, /read_data e /status para permitir que o frontend acione os comandos do dispositivo de forma transparente.
O fluxo de dados contempla a coleta local pelo dispositivo, envio para o servidor via conexão USB, aplicação dos modelos preditivos hospedados no backend, e exibição dos resultados ao usuário no dashboard da plataforma.


Figura 1. Apêndice H da documentação oficial do dispositivo
.
Resultados e Discussões
Diante dos objetivos delineados, o resultado parcial alcançado foi: (i) a aplicação/software encontra-se em nível de desenvolvimento no estágio de mínimo produto viável (MVP) para o monitoramento dos atributos de qualidade no campo com uso da espectroscopia Vis-NIR.
As principais funcionalidades desenvolvidas da aplicação são: (i) enviar dados espectrais estruturados (localmente ou diretamente do espectrômetro); (ii) configurar modelos preditivos e filtros para diferentes variedades de uvas; (iii) paineis interativos com gráficos e tabelas detalhadas; (iv) gerenciamento de usuários com permissões personalizadas; (v) exportar relatórios em arquivos .pdf ou .xml.


## PREDITIVO

(iv) Desenvolvimento dos modelos preditivos
Os dados espectrais foram submetidos a uma associação de diferentes pré-processamentos para remoção de ruído e/ou intensificação de certas características do sinal espectral. Sobre os dados espectrais foi utilizado: (1) primeira derivada de Savitzky-Golay (SAVITZKY e GOLAY, 1964; GORRY, 1990); (2) correção multiplicativa de espalhamento (MSC) (ISAKSSON e NAES, 1988); e (3) padronização normal de sinal (SNV) (BARNES et al., 1989).
Os dados espectrais brutos ou pré-processados de cada amostra foram as variáveis independentes (X – variáveis preditoras), enquanto os atributos de qualidade foram as variáveis dependentes (Y – variáveis respostas). O conjunto de dados foi separado na proporção 70-30, ou seja, 70% dos dados compuseram o conjunto de calibração/validação cruzada e 30% o conjunto de predição/validação externa. A validação cruzada foi aplicada a todas as amostras do conjunto de calibração.
Os modelos preditivos, baseados nos atributos de qualidade e nos sinais espectrais, foram desenvolvidos através da regressão das componentes principais (PCR), regressão dos quadrados mínimos parciais (PLSR), regressão Support Vector Machine (SVMR), regressão Random Forest (RFR), e regressão redes neurais artificiais (ANNR).
O desempenho dos modelos preditivos foi avaliado com uso de diferentes parâmetros estatísticos, sendo: coeficiente de determinação (R2); e raiz quadrada do erro médio quadrático (RMSE).

Resultados e Discussões
A Figura 1 apresenta os sinais espectrais, no modo absorbância, de variedade branca de uva de mesa sem pré-processamento (Figura 1A), e com pré-processamentos primeira derivada Savitzky-Golay (Sav-Gol), correção multiplicativa de espalhamento (MSC) e padronização normal de sinal (SNV) (Figura 1B, 1C e 1D, respectivamente). A aplicação do pré-processamento primeira derivada Sav-Gol evidenciou características espectrais não perceptíveis nos sinais espectrais brutos e submetidos aos pré-processamentos MSC e SNV. Em contrapartida, a aplicação dos pré-processamentos MSC e SNV removeu os efeitos de espalhamento de luz, comum em amostras de frutas. Isso deve-se às frutas terem dimensões variadas, modificando o caminho óptico da luz.







(A)
(B)






(C)
(D)

Figura 1. Gráficos de sinais espectrais em absorbância, sem processamento (A), com pré-processamento de primeira derivada (B), com pré-processamento de correção multiplicativa de espalhamento (C), e com pré-processamento de padronização normal de sinal (D), de variedade branca de uva de mesa. 

A Figura 2 apresenta os gráficos de dispersão dos valores de referência e preditos da calibração e validação cruzada dos melhores modelos para os atributos de qualidade de uva de mesa, acidez titulável (Figura 2A), firmeza (Figura 2B), pH (Figura 2C), sólidos solúveis totais (Figura 2D), e massa seca (Figura 2E). Para acidez titulável o melhor modelo foi o PCR com valores de R2CV e RMSECV de 0,50 e 0,41. Para firmeza o melhor modelo foi o PLSR com valores de R2CV e RMSECV de 0,48 e 73,83. Para pH o melhor modelo foi o SVMR com valores de R2CV e RMSECV de 0,46 e 0,23. Para sólidos solúveis totais o melhor modelo foi o PLSR com valores de R2CV e RMSECV de 0,78 e 1,24. Por fim, para massa seca o melhor modelo foi o SVMR com valores de R2CV e RMSECV de 0,66 e 1,83. 
O modelo que apresentou melhor desempenho dos atributos de qualidade foram os sólidos solúveis totais (SST), com R2CV > 0,70. Conforme os estádios de maturação da uva avançam, a acidez diminui e o SST aumenta. Para uvas tintas, essas alterações estão relacionadas com a mudança de coloração. O que não ocorre em uvas brancas, sendo um desafio a obtenção de modelos adequados.   



(A)
(B)


(C)
(D)

(E)

Figura 2. Gráficos de dispersão dos valores de referência e valores preditos da calibração e validação cruzada dos melhores modelos para os atributos de qualidade: acidez titulável (A); firmeza (B); pH (C); sólidos solúveis totais (D); e massa seca (E).

A Figura 3 apresenta os gráficos de dispersão dos valores de referência e preditos da predição dos melhores modelos para os atributos de qualidade de uva de mesa, acidez titulável (Figura 3A), firmeza (Figura 3B), pH (Figura 3C), sólidos solúveis totais (Figura 3D), e massa seca (3E). Para acidez titulável o melhor modelo foi o RFR com valores de R2P e RMSEP de 0,71 e 0,28. Para firmeza o melhor modelo foi o PCR com valores de R2P e RMSEP de 0,59 e 52,48. Para pH o melhor modelo foi o SVMR com valores de R2P e RMSEP de 0,70 e 0,14. Para sólidos solúveis totais o melhor modelo foi o PLSR com valores de R2P e RMSEP de 0,77 e 1,02. Por fim, para massa seca o melhor modelo foi o RFR com valores de R2P e RMSEP de 0,80 e 0,97. Os modelos que apresentaram melhores desempenho dos atributos de qualidade foram acidez titulável, pH, sólidos solúveis totais (SST) e massa seca, com R2CV > 0,70. Destaca-se que os outlier não foram removidos do dataset, sendo que os modelos de calibração e predição podem ter desempenho superiores.



(A)
(B)


(C)
(D)

(E)

Figura 3. Gráficos de dispersão dos valores de referência e valores preditos da predição dos melhores modelos para os atributos de qualidade: acidez titulável (A); firmeza (B); pH (C); sólidos solúveis totais (D); e massa seca (E).


