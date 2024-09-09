import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class TrackerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-location')
  handleLocationUpdate(
    @MessageBody() data: { latitude: number; longitude: number },
    @ConnectedSocket() client: Socket,
  ): void {
    this.server.emit('receive-location', {
      id: client.id,
      ...data,
    });
  }

  handleConnection(client: Socket): void {
    this.server.emit('user-connected', client.id);
  }

  handleDisconnect(client: Socket): void {
    this.server.emit('user-disconnected', client.id);
  }
}
