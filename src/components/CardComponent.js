// CardComponent.jsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CardComponent = ({ item, handleClickOpen, handleDelete, handleEdit }) => {
  return (
    <li>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {item.name.toUpperCase()} {item.lastname.toUpperCase()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Telefono {item.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleClickOpen(item)} startIcon={<InfoIcon />}>
            VER
          </Button>
          <Button size="small" onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>
            BORRAR
          </Button>
          <Button size="small" onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
            EDITAR
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};

export default CardComponent;
