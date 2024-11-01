'use client';
import { useState } from 'react';

import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Modal } from '../UI/Modal';
import { getUrlForRegister } from './requests';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<boolean | string | undefined>(false);
  const [alignment, setAlignment] = useState<string>('Buyer');
  const [id, setId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response = await getUrlForRegister(alignment);
      if (!response) {
        setError('Something went wrong');
      } else {
        setId(response);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <Modal>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="w-full text-center p-4 text-2xl">REGISTRATION</h1>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          color="secondary"
        >
          <ToggleButton value="Buyer" sx={{ color: 'white' }}>
            BUYER
          </ToggleButton>
          <ToggleButton value="TEAM_LEAD" sx={{ color: 'white' }}>
            TEAM LEAD
          </ToggleButton>
        </ToggleButtonGroup>
        {id && (
          <CopyToClipboard
            text={`http://localhost:3000/login/register?id=${id}`}
          >
            <div
              className="border-2 rounded-md flex max-w-[320px] p-2 cursor-pointer items-center gap-2 hover:text-purple-600"
              onClick={() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              <p className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                http://localhost:3000/login/register?id={id}
              </p>
              <div className="">{copied ? 'Copied' : <FaCopy />}</div>
            </div>
          </CopyToClipboard>
        )}

        <div className="py-4 w-full text-center">
          <Button
            variant="contained"
            onClick={handleRegister}
            color="secondary"
            sx={{ width: '80%' }}
          >
            {loading ? 'Submitting...' : 'Register'}
          </Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Modal>
  );
}
