import { useDispatch } from 'react-redux';
import axios from 'axios';
import { clientRemoveItemByName, clientStateFailure, clientAddOk } from '../state/ClientsSlice';

const useClientes = () => {

    const dispatch = useDispatch();


    const addClient = async (newClient) => {
        try {
            await axios.post('http://localhost:8080/api/clients/inserter', newClient);
            dispatch(clientAddOk(newClient));
        } catch (error) {
            console.error('Error adding new client:', error);
            dispatch(clientStateFailure())
        }
    }
    const findAllClients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/clients/getall');
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error);
            return [];
        }
    }
    const findOneClientById = async () => { }
    const findOneClientByName = async () => { }
    const removeClient = async (nameToRemove) => {
        // en este caso no funciona ya que no recupero el id desde el back, pero podria agfregarlo desde el DTO
        // try {

        //   await axios.delete(`http://localhost:8080/api/clients/delete/${item.id}`);
        //   const response = await axios.get('http://localhost:8080/api/clients/getall');
        //   setData(response.data);

        // } catch (error) {
        //   console.error('Error adding new client:', error);
        // }
        try {
            dispatch(clientRemoveItemByName(nameToRemove));
        } catch (error) {
            console.error('Error removing client:', error);
        }
    };
    const updateClient = async () => { }

    return {
        addClient,
        findAllClients,
        findOneClientById,
        findOneClientByName,
        removeClient,
        updateClient
    };

}

export default useClientes