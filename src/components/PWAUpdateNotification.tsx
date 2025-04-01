import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Button, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { serviceWorkerManager } from '../utils/serviceWorker';

export const PWAUpdateNotification: React.FC = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleServiceWorkerUpdate = () => {
      setIsUpdateAvailable(true);
    };

    window.addEventListener('serviceWorkerUpdate', handleServiceWorkerUpdate);

    return () => {
      window.removeEventListener('serviceWorkerUpdate', handleServiceWorkerUpdate);
    };
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await serviceWorkerManager.updateServiceWorker();
      window.location.reload();
    } catch (error) {
      console.error('Error updating service worker:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setIsUpdateAvailable(false);
  };

  return (
    <Snackbar
      open={isUpdateAvailable}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="info"
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              Later
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={handleUpdate}
              disabled={isUpdating}
              startIcon={<RefreshIcon />}
            >
              {isUpdating ? 'Updating...' : 'Update Now'}
            </Button>
          </Box>
        }
        sx={{ width: '100%' }}
      >
        A new version of SkyLink AI is available!
      </Alert>
    </Snackbar>
  );
}; 