# Relatório Final Atualizado do Projeto ProSpectraWeb

Com base na análise dos diretórios `frontend`, `backend` e `ML-spectroscopy-analysis`, o relatório do projeto foi atualizado para refletir o estado final e completo do desenvolvimento. Abaixo estão as seções revisadas.

---

## PLATAFORMA (Atualizado)

### Metodologia

O desenvolvimento da plataforma foi concluído, abrangendo as três etapas planejadas: (i) desenvolvimento da aplicação/software, (ii) integração completa do hardware e software, e (iii) a plataforma está pronta para a fase de avaliação em condições de laboratório.

#### (i) Desenvolvimento de Aplicação/Software

A aplicação web para análise espectroscópica foi totalmente desenvolvida, utilizando as tecnologias consolidadas para frontend e backend conforme planejado.

*   **Frontend:** A interface do usuário, construída com **Next.js (React com TypeScript)**, foi finalizada e organizada em um conjunto de páginas que entregam as funcionalidades centrais do sistema. A estrutura de rotas em `frontend/src/app` revela as seguintes funcionalidades implementadas:
    *   **Gestão de Acesso:** `login`, `signup`, `access-denied`.
    *   **Páginas Principais:** `home`, `dashboard` para visualização de dados.
    *   **Gestão de Dados e Modelos:** `upload-features`, `upload-targets`, `train-model`, `apply-models`, `models`.
    *   **Interação com Hardware:** Uma página dedicada ao `device` para controle do espectrômetro.
    *   **Análise e Relatórios:** `history` para visualização de análises passadas e `reports` para exportação.
    *   **Administração:** `users-management` e `edit-variety`.

*   **Backend:** A arquitetura híbrida planejada foi implementada com sucesso. A análise do arquivo `backend/app/main.py` confirma a utilização de **FastAPI** para orquestrar os serviços, com roteadores modulares que gerenciam diferentes aspectos da aplicação:
    *   `auth` e `users`: Para autenticação e gerenciamento de usuários.
    *   `variety`: Para gerenciamento das variedades de uvas.
    *   `spectra`, `models`, `predictions`: Para manipulação de dados espectrais, modelos e predições.
    *   `hardware`: Endpoint dedicado para a comunicação com o espectrômetro.
    *   `dashboard`: Para fornecer dados à interface de visualização.

#### (ii) Integração Hardware e Software da Plataforma Inteligente

A integração entre o hardware (espectrômetro portátil DLP NIRscan Nano) e o software **foi concluída**. O status "em desenvolvimento" foi superado. A análise do diretório `backend/app/hardware/` e, em particular, do arquivo `hid_interface.py`, confirma que a comunicação com o espectrômetro via protocolo **USB HID** está totalmente implementada.

*   **Comunicação:** A biblioteca `hid` (um wrapper para `hidapi`) é utilizada para a comunicação de baixo nível, permitindo o envio de comandos e a leitura de dados do dispositivo.
*   **Funcionalidades Implementadas:** O código inclui a função `perform_full_scan`, que executa o fluxo completo de varredura, desde a conexão e verificação de status do dispositivo até a leitura e salvamento dos dados brutos, que são posteriormente processados pela `spectrum_library`.
*   **Conclusão da Etapa:** A plataforma agora é capaz de controlar o espectrômetro, realizar varreduras e adquirir dados espectrais diretamente, finalizando a integração hardware-software.

---

## PREDITIVO (Atualizado)

#### (iv) Desenvolvimento dos Modelos Preditivos

A metodologia de desenvolvimento dos modelos preditivos foi significativamente expandida para garantir maior robustez e encontrar a melhor performance possível.

*   **Pré-processamento de Dados:** A análise inicial, que considerava 3 filtros, foi expandida para um teste exaustivo com **16 técnicas de pré-processamento**, conforme detalhado nos notebooks da pasta `ML-spectroscopy-analysis`. Esses filtros foram divididos em duas categorias:
    *   **Filtros Independentes de y (10):** `Raw`, `MSC`, `SNV`, `SG_D1`, `SG_D2`, `Detrend`, `Normalize`, `EMSC`, `Continuum_Removal`, `Wavelet_Denoising`.
    *   **Filtros Dependentes de y e Combinações (6):** `OSC_1`, `OSC_2`, `MSC_SG_OSC`, `OPLS1_SNV_SG_D1`, `OPLS2_SNV_SG_D1`, `SNV_Detrend_SG_D1`.

*   **Metodologia de Modelagem:** Foi adotado um fluxo de trabalho automatizado e robusto:
    1.  **Divisão de Dados:** O método **Kennard-Stone** foi utilizado para separar os dados em conjuntos de calibração (70%) e validação (30%).
    2.  **Limpeza de Outliers:** Foi realizada uma dupla remoção de outliers apenas no conjunto de calibração: (1) outliers espectrais foram removidos usando **PCA (T²/Q)**, e (2) outliers dos atributos de referência foram removidos com base em **Boxplots (IQR)**.
    3.  **Modelagem Comparativa:** Foram avaliados sistematicamente cinco modelos de regressão: **PLSR, PCR, RFR, SVMR e MLPR**.
    4.  **Otimização:** Para cada combinação de atributo, modelo e filtro, a ferramenta **GridSearchCV** foi utilizada para encontrar os hiperparâmetros ótimos, garantindo que cada modelo fosse avaliado em sua melhor performance.

#### Resultados e Discussões

A análise exaustiva produziu modelos com performance superior para cada atributo de qualidade. A tabela abaixo resume os **melhores resultados obtidos** no conjunto de validação independente, indicando o modelo, o filtro de pré-processamento e as métricas de performance (R² e RMSE).

| Atributo      | Melhor Modelo | Melhor Filtro | R² de Validação | RMSE de Validação |
| :------------ | :------------ | :------------ | :-------------- | :---------------- |
| **AT**        | SVMR          | Detrend       | 0.5095          | 0.4614            |
| **FIRMEZA (N)** | SVMR          | Normalize     | 0.5903          | 62.3771           |
| **PH**        | RFR           | SG_D2         | 0.7672          | 0.1256            |
| **SST**       | SVMR          | SNV           | 0.7335          | 1.2738            |
| **UBS (%)**   | SVMR          | SNV           | 0.8176          | 1.1207            |

Os resultados demonstram que a abordagem sistemática e a avaliação de múltiplos filtros e modelos foram cruciais para otimizar a capacidade preditiva. Modelos como **SVMR e RFR** mostraram-se particularmente eficazes, superando os modelos lineares tradicionais para a maioria dos atributos. O uso de filtros como `Detrend`, `Normalize`, `SNV` e `SG_D2` foi determinante para alcançar a melhor performance em cada caso.