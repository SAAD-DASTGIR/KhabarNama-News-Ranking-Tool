import "./App.css";
import { useState } from "react";
import {
  Card,
  CardContent,
  Collapse,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

function App() {
  // states

  const [query, setQuery] = useState(""); // input feild query
  const [news, setNews] = useState([]); // fetched results news
  const [expanded, setExpanded] = useState(false); // show/hide discription button
  const [progressAnimation, setProgressAnimation] = useState(false); // progressAnimation state

  // handlers

  // show/hide discription button
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // get data from backend
  const getData = () => {
    setProgressAnimation(true);
    setNews([]);
    fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: query,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setNews(json);
        setProgressAnimation(false);
      });
  };

  return (
    <>
      <h1>Khabar Nama</h1>
      <h3>This tool is trained on DAWN News dataset.</h3>
      {/* Input Feild for query */}
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search Query"
        sx={{
          marginTop: "20px",
          marginRight: "20px",
        }}
      />
      {/* Search Query */}
      <Button
        variant="contained"
        onClick={getData}
        sx={{
          marginTop: "20px",
          marginRight: "20px",
          padding: "15px",
        }}
      >
        Search
      </Button>
      {/* Show/Hide discription button */}
      {news.length > 0 ? (
        <Button
          onClick={handleExpandClick}
          sx={{
            marginTop: "20px",
            marginRight: "20px",
            padding: "15px",
          }}
          variant="outlined"
        >
          {expanded ? "Hide Discription" : "Show Discriptions"}
        </Button>
      ) : null}
      {/* Animation Progress */}
      {progressAnimation ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : null}
      {/* News Cards */}
      {news.map((a) => (
        <Card
          sx={{
            minWidth: "275px",
            marginY: "20px",
            padding: "10px",
            backgroundColor: "#F8F8F8",
          }}
        >
          <CardContent>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{a.headline}</p>
            <br></br>
            <p style={{ fontSize: "15px" }}>Relevance Score: {a.score}</p>{" "}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <p style={{ paddingTop: "10px", textAlign: "justify" }}>
                {a.short_description}
              </p>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default App;
