import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';

const ItemButton = styled(Button)(({ theme }) => ({
  width: '10vw',
  fontSize: '0.8vw',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  textAlign: 'left',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ModalTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ModalContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const getDirectDownloadLink = (url) => {
  if (url.includes("drive.google.com")) {
    return getGoogleDriveDirectLink(url);
  } else if (url.includes("dropbox.com")) {
    return getDropboxDirectLink(url);
  }
  return url;
};

const getGoogleDriveDirectLink = (url) => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  return url;
};

const getDropboxDirectLink = (url) => {
  return url.replace(/dl=0$/, "dl=1");
};

const downloadFile = async (url, onDownloadComplete) => {
  try {
    const directUrl = getDirectDownloadLink(url);
    const link = document.createElement("a");
    link.href = directUrl;
    link.download = directUrl.split("/").pop().split("?")[0];
    link.style.display = "none";
    document.body.appendChild(link);

    toast.info("Download starting in a few seconds...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      onDownloadComplete();
    }, 1000);
  } catch (error) {
    console.error("Error downloading file:", error);
    toast.error(`Unable to download! ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

const ScienceItemDetails = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDownload = () => {
    if (selectedItem && selectedItem.download_link) {
      downloadFile(selectedItem.download_link, () => {
        toast.success("Download Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    }
  };

  return (
    <div>
      <Typography variant="body1" gutterBottom>To choose the item and download the worksheet</Typography>
      {items && items.length > 0 && (
        <Box textAlign='left' mt={4}>
          {items.map((item, index) => (
            <ItemButton
              key={index}
              onClick={() => handleItemClick(item)}
              fullWidth
            >
              {item.title}
            </ItemButton>
          ))}
        </Box>
      )}
      {selectedItem && (
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <ModalTitle>{selectedItem.title}</ModalTitle>
          <ModalContent>
            <Typography variant="body1" gutterBottom>{selectedItem.description}</Typography>
            <Typography variant="body1" gutterBottom>Download the worksheet and practice it to gain more knowledge</Typography>
            {selectedItem.download_link && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
              >
                Download Worksheet
              </Button>
            )}
          </ModalContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary" variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer />
    </div>
  );
};

export default ScienceItemDetails;
