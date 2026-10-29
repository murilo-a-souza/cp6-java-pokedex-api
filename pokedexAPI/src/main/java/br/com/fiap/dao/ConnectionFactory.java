package br.com.fiap.dao;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    private static Connection connection;

    public static void closeConnection() {
        try {
            if (!connection.isClosed()) {
                connection.close();
            }
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }

    public static Connection getConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                return connection;
            }
            Class.forName("oracle.jdbc.driver.OracleDriver");
            //busca dados de conexão nas variaveis de ambiente, se .env não existir ignora
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            String url = dotenv.get("DB_URL");
            String user = dotenv.get("DB_USER");
            String pass = dotenv.get("DB_PASSWORD");
            if (url == null || user == null || pass == null) {
                throw new RuntimeException("Variáveis de ambiente do banco não configuradas");
            }
            connection = DriverManager.getConnection(url, user, pass);
        } catch (SQLException e) {
            System.out.println("Erro de SQL: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("Erro nome da classe: " + e.getMessage());
        }
        return connection;
    }
}
