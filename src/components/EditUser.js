import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function EditUser({ open, handleClose, handleEditUser, user }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      role: user.role,
      status: user.status,
      gitHub: user.gitHub,
      x: user.x,
      linkedIn: user.linkedIn,
      promote: user.promote ? "true" : "false",
      rating: user.rating,
      avatar: user.avatar,
      lastLogin: user.lastLogin
    }
  });

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
    data.promote = data.promote === "true";
    data.rating = parseFloat(data.rating);
    handleEditUser(data, user._id);
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" required />}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => <TextField {...field} label="Role" fullWidth margin="normal" required />}
          />
          <Controller
            name="status"
            control={control}
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
            render={({ field }) => <TextField {...field} label="GitHub" fullWidth margin="normal" />}
          />
          <Controller
            name="x"
            control={control}
            render={({ field }) => <TextField {...field} label="X (Twitter)" fullWidth margin="normal" />}
          />
          <Controller
            name="linkedIn"
            control={control}
            render={({ field }) => <TextField {...field} label="LinkedIn" fullWidth margin="normal" />}
          />
          <Controller
            name="promote"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Promote</InputLabel>
                <Select {...field} label="Promote">
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="rating"
            control={control}
            render={({ field }) => <TextField {...field} label="Rating" type="number" step="0.1" fullWidth margin="normal" required />}
          />
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => <TextField {...field} label="Avatar URL" fullWidth margin="normal" required />}
          />
          <label><b>Last login</b></label>
          <Controller
            name="lastLogin"
            control={control}
            render={({ field }) => <TextField {...field} type="date" fullWidth margin="normal" required />}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "red" }}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUser;
