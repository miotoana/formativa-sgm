import mongoose, { Document, Model, Schema } from "mongoose";

// Interface para definir os atributos e tipos de Ordem de Serviço
export interface IOrdemServico extends Document {
    _id: string;
    // Referência ao equipamento que precisa de serviço (usando ObjectId)
    equipamento_id: mongoose.Schema.Types.ObjectId; 
    
    // Referência ao técnico responsável (usando ObjectId)
    tecnico_id: mongoose.Schema.Types.ObjectId; 
    
    descricao_problema: string;
    data_abertura: Date;
    data_fechamento?: Date; // Opcional, pois a OS pode estar em aberto
    status: 'aberta' | 'em_andamento' | 'aguardando_peca' | 'concluida' | 'cancelada';
    prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
    observacoes_tecnico?: string; // Opcional, para o laudo final
}

// Criação do Schema do MongoDB (construtor)
const OrdemServicoSchema: Schema<IOrdemServico> = new Schema({
    // Campo de Referência ao Equipamento
    equipamento_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Equipamento', // Garante que a referência é ao modelo 'Equipamento'
        required: true 
    },
    
    // Campo de Referência ao Técnico (Usuário com função 'tecnico')
    tecnico_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', // Referência ao modelo 'Usuario'
        required: true 
    },

    descricao_problema: { type: String, required: true },
    
    data_abertura: { 
        type: Date, 
        required: true, 
        default: Date.now // Define a data de criação automaticamente
    },
    
    data_fechamento: { type: Date, required: false },
    
    status: { 
        type: String, 
        enum: ['aberta', 'em_andamento', 'aguardando_peca', 'concluida', 'cancelada'], 
        required: true,
        default: 'aberta'
    },
    
    prioridade: { 
        type: String, 
        enum: ['baixa', 'media', 'alta', 'urgente'], 
        required: true,
        default: 'media'
    },
    
    observacoes_tecnico: { type: String, required: false }
});

// Criação do Modelo (Model) para interação com o MongoDB
const OrdemServico: Model<IOrdemServico> = 
    mongoose.models.OrdemServico || mongoose.model<IOrdemServico>("OrdemServico", OrdemServicoSchema);

export default OrdemServico;