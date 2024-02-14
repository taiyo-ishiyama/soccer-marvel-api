import React from "react";

import { useState } from "react";
import Header from "./Header";
import About from "./About";
import Container from "./Container";
import SearchBar from "./SearchBar";
import Grid from "./Grid";
import Card from "./Card";
import Field from "./Field";

import { findChars } from "../libs/search";

const IMG_FANTASTIC = "standard_fantastic";

export default function Home() {
  const [heroes, setChars] = useState([]);
  const [error, setError] = useState();
  const [team, setTeam] = useState(Array(6).fill(null));

  const handleAddToTeamClick = (hero) => {
    const emptyIndex = team.findIndex((player) => player === null);
    if (emptyIndex !== -1) {
      const newTeam = [...team];
      newTeam[emptyIndex] = hero;
      setTeam(newTeam);
    } else {
      // Handle case when all positions are filled
      // You may show a message or handle it as per your application logic
    }
  };

  let cards;

  const handleClick = async (e, args) => {
    e.preventDefault();
    if (args === "") return;

    try {
      return await findChars(args);
    } catch (err) {
      return err;
    }
  };

  if (heroes) {
    cards = heroes.map((hero) => (
      <Card
        name={hero.name}
        key={hero.id}
        id={hero.id}
        thumbnail={`${hero.thumbnail.path}/${IMG_FANTASTIC}.${hero.thumbnail.extension}`}
        handleAddToTeamClick={() => handleAddToTeamClick(hero)}
      />
    ));
  }

  return (
    <>
      <React.StrictMode>
        <Header />
      </React.StrictMode>
      <Container>
      <section id='home'>
        <About />
      </section>
        <section id='search'>
          <SearchBar
            handleClick={handleClick}
            setChars={setChars}
            setError={setError}
          />
          <h2>Searching Results</h2>
          <Grid>{cards ? cards : null}</Grid>
        </section>
        <section id='field'>
          <Field team={team} setTeam={setTeam} id='field' />
        </section>
      </Container>
    </>
  );
}
