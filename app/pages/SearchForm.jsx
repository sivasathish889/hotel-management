"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Typography,
  Grid,
} from "@material-tailwind/react";

export default function SearchForm() {
  const [tabValue, setTabValue] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Hotels" />
        <Tab label="Packages" />
      </Tabs>

      {tabValue === 0 && (
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destination"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="date"
                label="Check-in"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="date"
                label="Check-out"
                value={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <MenuItem value={1}>1 Adult</MenuItem>
                <MenuItem value={2}>2 Adults</MenuItem>
                <MenuItem value={3}>2 Adults, 1 Child</MenuItem>
                <MenuItem value={4}>2 Adults, 2 Children</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Search Hotels
          </Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destination"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="date"
                label="Departure"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input type="date"
                label="Return"
                value={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Travelers"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <MenuItem value={1}>1 Adult</MenuItem>
                <MenuItem value={2}>2 Adults</MenuItem>
                <MenuItem value={3}>2 Adults, 1 Child</MenuItem>
                <MenuItem value={4}>2 Adults, 2 Children</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Search Packages
          </Button>
        </Box>
      )}
    </Box>
  );
}

