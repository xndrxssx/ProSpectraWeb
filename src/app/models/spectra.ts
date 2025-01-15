import mongoose, { Schema, Document } from "mongoose";
import { Spectra } from "../../types/Spectra"; // Importa o tipo que você criou

const SpectraSchema = new Schema<Spectra>({
  nome: { type: String, required: true },
  conteudo: { type: [String], required: true },
  variedade: { type: String, required: true },
  data: { type: String, required: true },
  local: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  filtro: { type: [String], required: false }, // Filtro opcional
  grafico: { type: String, required: false }  // URL ou caminho para o gráfico
});

// Verifica se o modelo já existe
const SpectraModel = mongoose.models.Spectra || mongoose.model<Spectra>("Spectra", SpectraSchema);

export default SpectraModel;
