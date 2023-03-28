import { useCallback, useState } from 'react';
import { Spinner } from 'reactstrap';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// COMPONENTS
import Select from '../../../../components/UI/FormItems/Select';

export const ActionButtons = ({ goBack, statusId, billCreated, role, onCreateInvoice, onChangeStatus, isProcessing, hasInvoice = false }) => {
  const [status, setStatus] = useState(null);

  const statusOptions = [
    {
      label: 'Validando',
      value: 3,
    },
    {
      label: 'Procesando',
      value: 4,
    },
  ];

  const onChangeStatusHandler = useCallback(() => {
    onChangeStatus(status, 'change');
  }, [status, onChangeStatus]);

  return (
    <div>
      {statusId < 5 && (role === 'manager' || role === 'admin') && (
        <div className='flex mb-2 items-center justify-end'>
          <Select options={statusOptions} label='Cambiar estado' onChange={(e) => setStatus(+e.target.value)} />
          <button type='button' onClick={onChangeStatusHandler} disabled={!status} className='btn ml-2 mt-2 btn-blue waves-effect waves-light'>
            <ButtonInfo icon={null} info='cambiar estado' isProcessing={isProcessing} />
          </button>
        </div>
      )}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
        <button type='button' onClick={goBack} className='btn btn-blue waves-effect mb-3 waves-light'>
          <div className='flex items-center'>
            <ArrowLeftIcon className='w-5 h-5 mr-2' />
            <span>Regresar</span>
          </div>
        </button>
        <div className='flex items-center justify-end flex-wrap'>
          {statusId === 3 && (
            <button type='button' disabled={isProcessing} onClick={() => onChangeStatus(7)} className='btn btn-warning waves-effect waves-light'>
              <ButtonInfo info='Enviar a tasa' isProcessing={isProcessing} />
            </button>
          )}
          {(statusId === 3 || statusId === 4 || statusId === 7) && (
            <button
              type='button'
              disabled={isProcessing}
              onClick={() => onChangeStatus(statusId === 3 || statusId === 7 ? 4 : 6)}
              className='btn btn-success waves-effect ml-2 waves-light'
            >
              <ButtonInfo info={statusId === 3 || statusId === 7 ? 'Validar' : 'Aprobar'} isProcessing={isProcessing} />
            </button>
          )}
          {(statusId === 2 || statusId === 3 || statusId === 4 || statusId === 7) && (
            <button type='button' disabled={isProcessing} onClick={() => onChangeStatus(5)} className='btn btn-danger waves-effect ml-2 waves-light'>
              <ButtonInfo info='Cancelar' isProcessing={isProcessing} />
            </button>
          )}
          {statusId === 6 && !billCreated && hasInvoice && (
            <button type='button' disabled={isProcessing} onClick={onCreateInvoice} className='btn btn-success waves-effect waves-light'>
              <ButtonInfo info='Generar factura' isProcessing={isProcessing} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ButtonInfo = ({ icon, info, isProcessing }) => (isProcessing ? <Spinner size='sm' /> : <div className='flex items-center'>{info}</div>);
