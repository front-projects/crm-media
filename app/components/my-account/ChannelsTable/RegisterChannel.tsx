import { Button, Input } from '@mui/material';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addNewChannel } from './requests';
import { useQueryClient } from '@tanstack/react-query';

export default function RegisterChannel() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    const response = await addNewChannel(name, id);
    if (response) {
      setName('');
      setId('');
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    } else {
      setError(true);
    }
    setLoading(false);
  };
  const queryClient = useQueryClient();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      className="flex gap-2 justify-self-end items-center p-2 px-6 bg-gray-600/40 rounded-md my-2"
    >
      {error && <div className="text-red-600">Channel addition error</div>}
      <Input
        placeholder="Channel name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        color="secondary"
        sx={{ color: 'white' }}
      />
      <Input
        placeholder="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        color="secondary"
        sx={{ color: 'white' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        id="button-register-channel"
      >
        {loading ? <TailSpin color="purple" width={20} height={24} /> : 'Add'}
      </Button>
    </form>
  );
}
