import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import type { NotFoundPageProps } from './types';

/**
 * @page NotFoundPage
 * @summary 404 error page
 * @domain core
 * @type page-component
 * @category error
 */
export const NotFoundPage = (_props: NotFoundPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button onClick={() => navigate('/')}>Voltar para a página inicial</Button>
    </div>
  );
};

export default NotFoundPage;
