package br.com.fiap.dao;

import br.com.fiap.to.PokemonTO;

import java.sql.*;
import java.util.ArrayList;

public class PokemonDAO {
    public ArrayList<PokemonTO> findAll() {
        ArrayList<PokemonTO> pokemons = new ArrayList<PokemonTO>();
        String sql = "select * from DDD_POKEMON order by CODIGO";
        try (PreparedStatement ps = ConnectionFactory.getConnection().prepareStatement(sql);
             ResultSet rs = ps.executeQuery()){
            if (rs != null) {
                while (rs.next()) {
                    System.out.println("DAO");
                    PokemonTO pokemon = new PokemonTO();
                    pokemon.setCodigo(rs.getLong(1));
                    pokemon.setNome(rs.getString(2));
                    pokemon.setAltura(rs.getDouble(3));
                    pokemon.setPeso(rs.getDouble(4));
                    pokemon.setCategoria(rs.getString(5));
                    pokemon.setDataDeCaptura(rs.getDate(6).toLocalDate());
                    pokemons.add(pokemon);
                }
            } else {
                return null;
            }
        } catch (SQLException e) {
            System.out.println("Erro na consulta: " + e.getMessage());
        } finally {
            ConnectionFactory.closeConnection();
        }

        return pokemons;
    }

    public PokemonTO findByCodigo(Long codigo){
        PokemonTO pokemon = new PokemonTO();
        String sql = "select * from DDD_POKEMON where CODIGO = ? order by CODIGO";
        try (PreparedStatement ps = ConnectionFactory.getConnection().prepareStatement(sql);
             ){
            ps.setLong(1, codigo);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                pokemon.setCodigo(rs.getLong(1));
                pokemon.setNome(rs.getString(2));
                pokemon.setAltura(rs.getDouble(3));
                pokemon.setPeso(rs.getDouble(4));
                pokemon.setCategoria(rs.getString(5));
                pokemon.setDataDeCaptura(rs.getDate(6).toLocalDate());
            } else {
                return null;
            }
        } catch (SQLException e) {
            System.out.println("Erro na consulta: " + e.getMessage());
        } finally {
            ConnectionFactory.closeConnection();
        }
        return pokemon;
    }

    public PokemonTO save(PokemonTO pokemon){
        String sql = "insert into DDD_POKEMON(NOME, ALTURA, PESO, CATEGORIA, DATA_DE_CAPTURA) values (?, ?, ?, ?, ?)";
        try (PreparedStatement ps = ConnectionFactory.getConnection().prepareStatement(sql);){
            ps.setString(1, pokemon.getNome());
            ps.setDouble(2, pokemon.getAltura());
            ps.setDouble(3, pokemon.getAltura());
            ps.setString(4, pokemon.getCategoria());
            ps.setDate(5, Date.valueOf(pokemon.getDataDeCaptura()));

            if(ps.executeUpdate() > 0){
                System.out.println("Sucesso ao inserir");
                return pokemon;
            } else{
                System.out.println("Erro ao inserir");
                return null;
            }

        } catch (SQLException e) {
            System.out.println("Erro ao salvar: " + e.getMessage());
        } finally {
            ConnectionFactory.closeConnection();
        }
        return null;
    }

    public PokemonTO update(Long codigo,PokemonTO pokemon) {
        String sql = "update DDD_POKEMON set NOME=?,altura=?,peso=?,categoria=?, data_de_captura=? where CODIGO=?";
        try (PreparedStatement ps = ConnectionFactory.getConnection().prepareStatement(sql)){
            ps.setString(1, pokemon.getNome());
            ps.setDouble(2, pokemon.getAltura());
            ps.setDouble(3, pokemon.getAltura());
            ps.setString(4, pokemon.getCategoria());
            ps.setDate(5, Date.valueOf(pokemon.getDataDeCaptura()));
            ps.setLong(6, codigo);
            if (ps.executeUpdate() > 0) {
                System.out.println("Sucesso ao editar");
                return pokemon;
            } else{
                System.out.println("Erro ao editar");
                return null;
            }
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar: " + e.getMessage());
        } finally {
            ConnectionFactory.closeConnection();
        }
        return null;
    }

    public boolean delete(Long codigo) {
        String sql = "delete from DDD_POKEMON where CODIGO = ?";
        try (PreparedStatement ps = ConnectionFactory.getConnection().prepareStatement(sql)) {
            ps.setLong(1, codigo);

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Erro ao deletar: " + e.getMessage());
        } finally {
            ConnectionFactory.closeConnection();
        }
        return false;
    }
}
