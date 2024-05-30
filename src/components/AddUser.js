import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function AddUser({ open, handleClose, handleAddUser }){
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
    data.social = data.social.split(',').map(url => url.trim());
    for (let i = 0; i < data.social.length; i++){
      if (!data.social[i].includes("https://"))
      data.social[i] = "https://" + data.social[i];
    }
    // Convertir promote a boolean
    data.promote = data.promote === "true"; 
    // Convertir rating a número
    data.rating = parseFloat(data.rating); 
      handleAddUser(data);
      reset(); // Resetea el formulario después de agregar el usuario
      handleClose(); // Cierra el diálogo
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" required />}
            />
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Role" fullWidth margin="normal" required />}
            />
            <Controller
              name="status"
              control={control}
              defaultValue="Active"
              render={({ field }) => <TextField {...field} label="Status" fullWidth margin="normal" required />}
            />
            <Controller
              name="social"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Social Profiles (comma separated)" fullWidth margin="normal" />}
            />
            <Controller
              name="promote"
              control={control}
              defaultValue="false"
              render={({ field }) => <TextField {...field} label="Promote (true/false)" fullWidth margin="normal" />}
            />
            <Controller
              name="rating"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Rating" type="number" step="0.1" fullWidth margin="normal" required />}
            />
            <Controller
              name="lastLogin"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field}  type='date' fullWidth margin="normal" required />}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    );
}

export default AddUser;