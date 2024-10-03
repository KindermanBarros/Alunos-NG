import mysql from 'mysql2';
import {config} from '../config/config';

export interface User {
    id: number;
    nome: string;
    idade: number;
}

export const getAllUsers = async (): Promise<User[]> => {
    const connection = await mysql.createConnection(config);
    const [results] = connection.query<User[]>('SELECT * FROM `alunos`');
    return results;
};

export const createUser = async (nome: string, idade: number): Promise<void> => {
    const connection = await mysql.createConnection(config);
    const sql = 'INSERT INTO `alunos` (`nome`, `idade`) VALUES (?, ?)';
    const values = [nome, idade];

    await connection.execute(sql, values);
};


export const updateUser = async (id: string, nome: string, idade: number): Promise<User | null> => {
    const connection = await mysql.createConnection(config);
    const sql = 'UPDATE `alunos` SET `nome` = ?, `idade` = ? WHERE `id` = ?';
    const values = [nome, idade, id];

    const [result] = await connection.execute(sql, values);
    return result.affectedRows > 0 ? { id: Number(id), nome, idade } : null; 
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const connection = await mysql.createConnection(config);
    const sql = 'DELETE FROM `alunos` WHERE `id` = ?';
    const [result] = await connection.execute(sql, [id]);
    return result.affectedRows > 0; 
};
