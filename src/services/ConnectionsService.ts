import { getCustomRepository, Repository } from 'typeorm';
import Connection from '../entities/Connection';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string; 
}
class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      admin_id,
      user_id,
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const user = await this.connectionsRepository.findOne({ user_id });
    return user;
  }
}

export default ConnectionsService;