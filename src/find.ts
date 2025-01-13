import mongoose, { ConnectOptions } from 'mongoose';

// Conectar ao MongoDB Atlas
const mongoURI = 'mongodb+srv://andressalcc0710:root@clusterspectra.3veda.mongodb.net/spectroscopy';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB Atlas (spectroscopy)');
  })
  .catch((err: Error) => {
    console.error('Erro de conexão ao MongoDB:', err.message);
  });

// Definir o modelo para a coleção `filters`
const FilterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    parameters: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'filters' } // Especifica explicitamente a coleção
);

const Filter = mongoose.model('Filter', FilterSchema);

// Função para consultar filtros
async function findFilters(): Promise<void> {
  try {
    const filters = await Filter.find(); // Consultar todos os filtros
    console.log(filters);
  } catch (error) {
    console.error('Erro ao consultar filtros:', (error as Error).message);
  }
}

// Chamar a função
findFilters();
