import React, { useEffect, useState } from "react";
import Game from "./Game";
import GameSettings from "./GameSettings";
import { useContextApp } from "./context";




const App = () => {
  const {
    won,
    resetGame,
    foundOnePair,
    numberClick,
    isModalOpen,
    modalMessage,
    setIsModalOpen,
    cards,
    activeCards,
    foundPairs,
    isClickable,
    clickCard,
    setCards,
  } = useContextApp();
 

  return (
    <div className="bg-gray-700 p-4 h-screen">
      <section className="max-w-[750px] mx-auto bg-gray-800 p-4 rounded-xl ">
        <h1 className="text-pink-500 text-2xl md:text-3xl font-bold text-center my-4">
          Pexeso hra
        </h1>
        <GameSettings/>
        { cards.length > 1 ? (<Game />) : ""}

      </section>
    </div>
  );
};

export default App;
