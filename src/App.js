import { Box, Button,  Container, Grid, TextField, Typography} from "@mui/material";
import { useState, useEffect,  } from "react";
import Swal from "sweetalert2";
import CardComponent from "./components/CardComponent";
import DialogComponent from "./components/DialogComponent";
import { useSelector } from 'react-redux';
import useClientes from "./hooks/useClientes";

function App() {
  const { addClient, findAllClients, removeClient } = useClientes();
  const clients = useSelector((state) => state.clients.clients);
  const [data, setData] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    lastname: "",
    brithdate: "",
    cuit: "",
    address: "",
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
      const data = await findAllClients();
      setData(data);
    };

    fetchData();
  }, [findAllClients]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    addClient(newClient);

      setNewClient({
        name: "",
        lastname: "",
        brithdate: "",
        cuit: "",
        address: "",
        phone: "",
        email: "",
      });
    
  };

  const handleDelete = async (item) => {

    removeClient(item.name);
  };

  const handleEdit = async (item) => {
    // ocurre los mismo que en delete
    
    // try {
    //   await axios.delete(`http://localhost:8080/api/clients/update/${item.id}`, {
    //   newClient
    // });
    //   const response = await axios.get('http://localhost:8080/api/clients/getall');
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
      address: item.address,
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
      address: "",
      phone: "",
      email: "",
    });
    
  }

  return (
    <Container>
      <DialogComponent open={open} handleClose={handleClose} selectedItem={selectedItem} />

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
                name="address"
                value={newClient.address}
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
                <CardComponent
                  key={index}
                  item={item}
                  handleClickOpen={handleClickOpen}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
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
