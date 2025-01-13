export interface FilterConfig {
    name: string; // Nome do filtro (ex.: "Meu Filtro Personalizado")
    type: 'MSC' | 'SNV' | 'SG'; // Tipo do filtro
    parameters: Record<string, any>; // Parâmetros do filtro
    createdAt: Date; // Data de criação
}
