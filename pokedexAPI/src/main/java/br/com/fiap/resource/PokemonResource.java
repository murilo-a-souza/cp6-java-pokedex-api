package br.com.fiap.resource;

import br.com.fiap.bo.PokemonBO;
import br.com.fiap.to.PokemonTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/pokedex") //localhost:8080/pokedex
public class PokemonResource {
    private PokemonBO pokemonBO = new PokemonBO();

    @GetMapping
    public ResponseEntity<List<PokemonTO>> findAll() {
        List<PokemonTO> pokemons = pokemonBO.findAll();
        System.out.println("Resource");
        if (pokemons != null) {
            return ResponseEntity.status(HttpStatus.OK).body(pokemons);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(pokemons);
        }
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<?> findByCodigo(@PathVariable Long codigo){
        PokemonTO pokemon = pokemonBO.findByCodigo(codigo);
        if (pokemon != null) {
            return ResponseEntity.status(HttpStatus.OK).body(pokemon);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pokémon não encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid PokemonTO pokemon) {
        try {
            PokemonTO response = pokemonBO.save(pokemon);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao salvar");
        }
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<?> update(@PathVariable Long codigo, @RequestBody PokemonTO pokemon){
        try {
            PokemonTO response = pokemonBO.update(codigo, pokemon);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao atualizar");
        }
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<String> delete(@PathVariable Long codigo) {
        if (pokemonBO.delete(codigo)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Excluído com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pokemon não encontrado");
        }
    }
}
