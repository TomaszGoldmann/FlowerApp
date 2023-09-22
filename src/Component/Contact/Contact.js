import React from 'react';
import {Container, TextField, Button, Typography, Grid} from '@mui/material';

export const Contact = () => {
    return (
        <Container sx={{p: "30px", mt: "10px"}} maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Napisz wiadomość
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Imię i nazwisko"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Adres e-mail"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Wiadomość"
                            multiline
                            rows={4}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Wyślij
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
