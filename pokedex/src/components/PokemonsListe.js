import React, { useState, useEffect } from "react";
import { api } from "../api/config";
import './PokemonsListe.css'; 

function PokemonsListe() {  
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await api.get('/pokemon?limit=500');
                const pokemonData = response.data.results;

                const pokemonList = await Promise.all(
                    pokemonData.map(async (pokemon) => {
                        try {
                            // Utilisez l'ID du Pokémon au lieu de l'URL complète
                            const id = pokemon.url.split('/')[6];
                            const responseDetails = await api.get(`/pokemon/${id}`);
                            return {
                                id: id,
                                name: responseDetails.data.name,
                                image: responseDetails.data.sprites.front_default,
                                types: responseDetails.data.types.map((type) => type.type.name)
                            };
                        } catch (error) {
                            console.error(`Erreur lors du chargement des détails pour ${pokemon.name}:`, error);
                            return null;
                        }
                    })
                );

                setPokemon(pokemonList.filter(p => p !== null));
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des Pokémon:", error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className="pokemon-list-container">  {/* Changé pour éviter la duplication de classe */}
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className="pokemon-grid">  {/* Meilleur nom pour la grille */}
                    {pokemon.map((poke) => (
                        <div key={poke.id} className="pokemon-card">  {/* Utilisé id comme key au lieu de index */}
                            <h3 className="pokemon-name">{poke.name}</h3>
                            <img src={poke.image} alt={poke.name} className="pokemon-image" />
                            <div className="pokemon-types">
                                {poke.types.map((type, index) => (
                                    <span key={index} className={`type ${type}`}>{type}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PokemonsListe;