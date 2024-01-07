import {
  Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, Slide, TextField, Typography
} from "@mui/material";
import axios from 'axios';
import { useState, useEffect, forwardRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Swal from "sweetalert2";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [data, setData] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    lastname: "",
    brithdate: "",
    cuit: "",
    domicilio: "",
    phone: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedupdate, setSelectedUpdate] = useState(false);


  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clientes/getall');
        console.log('response ', JSON.stringify(response.data, null, 5))
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/clientes/inserter', newClient);
      const response = await axios.get('http://localhost:8080/api/clientes/getall');
      setData(response.data);

      setNewClient({
        name: "",
        lastname: "",
        brithdate: "",
        cuit: "",
        domicilio: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error('Error adding new client:', error);
    }
  };

  const handleDelete = async (item) => {

    // en este caso no funciona ya que no recupero el id desde el back, pero podria agfregarlo desde el DTO
    // try {

    //   await axios.delete(`http://localhost:8080/api/clientes/delete/${item.id}`);
    //   const response = await axios.get('http://localhost:8080/api/clientes/getall');
    //   setData(response.data);

    // } catch (error) {
    //   console.error('Error adding new client:', error);
    // }


    const newArray = data.filter(data => data.name !== item.name)
    setData(newArray);

    Swal.fire({
      text: `Cliente borrado`,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  };

  const handleEdit = async (item) => {
    // ocurre los mismo que en delete
    
    // try {
    //   await axios.delete(`http://localhost:8080/api/clientes/update/${item.id}`, {
    //   newClient
    // });
    //   const response = await axios.get('http://localhost:8080/api/clientes/getall');
    //   setData(response.data);
    // Swal.fire({
    //   text: `Cliente actualizado`,
    //   icon: 'success',
    //   confirmButtonText: 'Ok',
    // });

    // } catch (error) {
    //   console.error('Error adding new client:', error);
    // }

    setNewClient({
      name: item.name,
      lastname: item.lastname,
      brithdate: item.brithdate,
      cuit: item.cuit,
      domicilio: item.domicilio,
      phone: item.phone,
      email: item.email,
    });
    setSelectedUpdate(true);

  };

  const handleUpd = () => {
    setSelectedUpdate(false);
    Swal.fire({
      text: `Cliente actualizado`,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setNewClient({
      name: "",
      lastname: "",
      brithdate: "",
      cuit: "",
      domicilio: "",
      phone: "",
      email: "",
    });
    
  }

  return (
    <Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{selectedItem ? `${selectedItem.name.toUpperCase()} ${selectedItem.lastname.toUpperCase()}` : ''}</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <>
              <Typography variant="body1">EMAIL: {selectedItem.email}</Typography>
              <Typography variant="body1">TELEFONO: {selectedItem.phone}</Typography>
              <Typography variant="body1">CUMPLEAÑOS: {selectedItem.brithdate}</Typography>
              <Typography variant="body1">CUIT: {selectedItem.cuit}</Typography>
              <Typography variant="body1">DOMICILIO: {selectedItem.domicilio}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 6, alignItems: 'center' }}>
            <Typography variant="h5">CARGAR CLIENTES</Typography>
            <form onSubmit={selectedupdate ? handleUpd : handleSubmit}>
              <TextField
                label="Nombre"
                name="name"
                value={newClient.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Apellido"
                name="lastname"
                value={newClient.lastname}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                name="brithdate"
                value={newClient.brithdate}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="CUIT"
                name="cuit"
                value={newClient.cuit}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Domicilio"
                name="domicilio"
                value={newClient.domicilio}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                name="phone"
                value={newClient.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={newClient.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button fullWidth type="submit" variant="contained" color="primary">
                {selectedupdate ? "Guardar cambios" : "Agregar Cliente"}
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {data.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 6, alignItems: 'center' }}>
              <Typography variant="h5">Lista de Clientes:</Typography>
              <ul>
                {data.map((item, index) => (
                  <li key={index}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {item.name.toUpperCase()} {item.lastname.toUpperCase()}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          telefono {item.phone}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleClickOpen(item)} startIcon={<InfoIcon />}>VER</Button>
                        <Button size="small" onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>DELETE</Button>
                        <Button size="small" onClick={() => handleEdit(item)} startIcon={<EditIcon />}>EDITAR</Button>
                      </CardActions>
                    </Card>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
