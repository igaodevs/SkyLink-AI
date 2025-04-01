import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsOpen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    } finally {
      setDeferredPrompt(null);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="pwa-install-dialog-title"
      aria-describedby="pwa-install-dialog-description"
    >
      <DialogTitle id="pwa-install-dialog-title">
        Install SkyLink AI
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AddIcon sx={{ mr: 1 }} />
          <Typography id="pwa-install-dialog-description">
            Install SkyLink AI on your device for a better experience
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Get quick access to flight bookings, baggage tracking, and more with our PWA.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Maybe Later
        </Button>
        <Button
          onClick={handleInstall}
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 