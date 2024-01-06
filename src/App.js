import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from "react";


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clientes/getall');
        console.log('response ', JSON.stringify(response, null, 5))
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
      // Realizar una solicitud para guardar el nuevo cliente en la API
      await axios.post('http://localhost:8080/api/clientes/inserter', newClient);

      // Actualizar la lista de clientes después de agregar uno nuevo
      const response = await axios.get('http://localhost:8080/api/clientes/getall');
      setData(response.data);

      // Limpiar el formulario después de la carga exitosa
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

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Cargar Cliente</Typography>
          <form onSubmit={handleSubmit}>
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
              Agregar Cliente
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          {data.length > 0 && (
            <Box>
              <Typography variant="h5">Lista de Clientes:</Typography>
              <ul>
                {data.map((item, index) => (
                  <li key={index}>
                    <strong>Nombre:</strong> {item.name},{' '}
                    <strong>Apellido:</strong> {item.lastname},{' '}
                    <strong>Fecha de Nacimiento:</strong> {item.brithdate},{' '}
                    <strong>CUIT:</strong> {item.cuit},{' '}
                    <strong>Domicilio:</strong> {item.domicilio},{' '}
                    <strong>Teléfono:</strong> {item.phone},{' '}
                    <strong>Email:</strong> {item.email}
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
