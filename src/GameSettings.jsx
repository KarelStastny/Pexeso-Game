import React from 'react';
import { useContextApp } from "./context";
import { colors, animals } from './data';
import { shuffle } from "lodash";

const GameSettings = () => {
    const {
        setCards,
        resetGame
    } = useContextApp();

    const animalsChose = () => {
      resetGame()
        setCards(shuffle([...animals, ...animals]));
    }
    const colorChose = () => {
      resetGame()
        setCards(shuffle([...colors, ...colors]));
    }

    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-md m-4">
            <h2 className="text-pink-500 font-semibold text-lg text-center mb-4">Vyberte si typ obrázku</h2>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => animalsChose()}
                    className="bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
                >
                    Zvířata
                </button>
                <button 
                    onClick={() => colorChose()}
                    className="bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
                >
                    Barvy
                </button>
            </div>
        </div>
    );
}

export default GameSettings;
