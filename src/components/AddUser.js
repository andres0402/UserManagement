import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AddUser({ open, handleClose, handleAddUser }){
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
    if (!data.gitHub.includes("https://")){
      data.gitHub = "https://" + data.gitHub;
    }

    if (!data.x.includes("https://")){
      data.x = "https://" + data.x;
    }

    if (!data.linkedIn.includes("https://")){
      data.linkedIn = "https://" + data.linkedIn;
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
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="gitHub"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="GitHub" fullWidth margin="normal" />}
            />

            <Controller
              name="x"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="X (Twitter)" fullWidth margin="normal" />}
            />

            <Controller
              name="linkedIn"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="LinkedIn" fullWidth margin="normal" />}
            />
            <Controller
              name="promote"
              control={control}
              defaultValue="false"
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Promote</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="rating"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Rating" type="number" step="0.1" fullWidth margin="normal" required />}
            />

            <Controller
              name="avatar"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Avatar URL" step="0.1" fullWidth margin="normal" required />}
            />
            <label><b>Last login</b></label>
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