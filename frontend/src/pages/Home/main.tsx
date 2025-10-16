import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import type { HomePageProps } from './types';

/**
 * @page HomePage
 * @summary Home page displaying welcome message and navigation
 * @domain core
 * @type page-component
 * @category public
 */
export const HomePage = (_props: HomePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Sistema de TO DO List
        </h2>
        <p className="text-gray-600 mb-6">Gerencie suas tarefas de forma simples e eficiente.</p>

        <div className="mb-6">
          <Button onClick={() => navigate('/tasks')} size="large">
            Acessar Tarefas
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Criar Tarefas</h3>
            <p className="text-gray-600 text-sm">
              Adicione novas tarefas com título, descrição, data de vencimento e prioridade.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Organizar</h3>
            <p className="text-gray-600 text-sm">
              Organize suas tarefas por prioridade e data de vencimento.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Acompanhar</h3>
            <p className="text-gray-600 text-sm">
              Acompanhe o status das suas tarefas e mantenha-se produtivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
