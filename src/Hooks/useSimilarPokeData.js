import axios from "axios";
import usePokemonDetails from "./usePokemonDetails";


async function useSimilarPokeData() {

    const [ pokeDetails ] = usePokemonDetails();

    const similarpokePromise = pokeDetails.similarPokemons.map( (p)=> axios.get(p.pokemon.url))

    const similarPokedata = await axios.all(similarpokePromise)

    // console.log(similarPokedata);

    return [
        similarPokedata,
        similarpokePromise
    ]
}

export default useSimilarPokeData;