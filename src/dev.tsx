import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import I18NResume from "./I18NResume.tsx";
import resume from "./assets/mary_shelley_cv.json";
import "./dev.css";

type genres = "all" | "fiction" | "nonfiction";

const PropTesting = () => {
  const [locale, setLocale] = useState("en");
  const [filter, setFilter] = useState<genres>("all");
  const handleLocale = (
    _event: React.MouseEvent<HTMLElement>,
    newLocale: string | null
  ) => {
    if (newLocale !== null) setLocale(newLocale);
  };
  const handleFilter = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: genres | null
  ) => {
    if (newFilter !== null) setFilter(newFilter);
  };
  const genres = filter === "all" ? [] : [filter];

  return (
    <React.StrictMode>
      <CssBaseline />
      <header className="test-header">
        <Stack direction="row" spacing={2} padding={2} sx={{ boxShadow: 1 }}>
          <ToggleButtonGroup
            value={filter}
            color="primary"
            exclusive
            aria-label="Language"
            onChange={handleFilter}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="fiction">Fiction</ToggleButton>
            <ToggleButton value="nonfiction">Non-fiction</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={locale}
            color="primary"
            exclusive
            aria-label="Language"
            onChange={handleLocale}
          >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="es">ES</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </header>
      <I18NResume data={resume} locale={locale} filter={genres} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<PropTesting />);
