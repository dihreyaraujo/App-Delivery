import React, { useCallback, useEffect, useState } from 'react';

import { isValidName, isValidEmail, isValidPassword } from '../utils/regex';
import { postData, getData, deleteById } from '../services/requests';

function AdminManageUsers() {
  const { token } = JSON.parse(localStorage.getItem('user'));

  const [register, setRegister] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const [users, setUsers] = useState();

  const validForm = useCallback(() => {
    if (isValidName(name) && isValidEmail(email) && isValidPassword(password)) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  }, [name, email, password]);

  useEffect(() => {
    validForm();
    setAlreadyRegistered(false);
  }, [name, email, password, validForm]);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('seller');
  };

  const getUsers = useCallback(async () => {
    const data = await getData('/users', {
      headers: {
        Authorization: `${token}`,
      },
    });

    setUsers(data);
  }, [token, setUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleRegisterUser = async () => {
    try {
      await postData(
        '/user',
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      clearForm();
      getUsers();
    } catch (error) {
      setAlreadyRegistered(true);
    }
  };

  const deleteUser = async (id) => {
    await deleteById('/admin/manage', id, {
      headers: {
        Authorization: `${token}`,
      },
    });
    getUsers();
  };

  return (
    <div>
      <h3>Cadastrar novo usuário</h3>
      <p data-testid="admin_manage__element-invalid-register" />
      <form>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            type="text"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
            data-testid="admin_manage__input-name"
            placeholder="Nome e sobrenome"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="type">
          Tipo
          <select
            id="type"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ register }
          onClick={ handleRegisterUser }
        >
          Cadastrar
        </button>
        { alreadyRegistered && (
          <p
            data-testid="admin_manage__element-invalid-register"
          >
            Usuário já cadastrado!
          </p>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users && (
            users.map((user, index) => (
              <tr key={ user.id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role === 'seller' ? 'P.Vendedora' : 'Cliente'}
                </td>
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => deleteUser(user.id) }
                >
                  Excluir
                </button>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageUsers;
