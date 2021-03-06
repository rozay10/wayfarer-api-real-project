import Query from '../utilities/psqlUtilities';

class User extends Query {
  async findUserById(id_type, id) {
    try {
      const { rows } = await this.findByOneParam(id_type, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email) {
    try {
      const { rows } = await this.findByOneParam('email', [email]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createANewUser(req, is_admin, password) {
    try {
      const { rows } = await this.insertIntoDB(
        'email, first_name, last_name, is_admin, password',
        '$1, $2, $3, $4, $5',
        [req.email, req.first_name, req.last_name, is_admin, password],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findAllUsers() {
    try {
      const { rows } = await this.findAll('*');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async deleteAllUsers() {
    try {
      const { rows } = await this.deleteAll('users');
      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export default User;
