import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; //Se utiliza para generar el token
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schemas/usuarios.schema';
import { Area, AreaSchema } from './schemas/area.schema';
import { Rol, RolSchema } from './schemas/rol.schema';
import { Celula, CelulaSchema } from './schemas/celula.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: 'D1R3CCI0N-D3-T3CN0L0GI4-D3-L4-INF0RM4CI0N-FIN4NCI3R4',
      signOptions: { expiresIn: '9h' },
    }),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
    MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }]),
    MongooseModule.forFeature([{ name: Celula.name, schema: CelulaSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule { }
