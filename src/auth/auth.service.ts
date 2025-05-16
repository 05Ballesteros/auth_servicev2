import { ForbiddenException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Usuario } from './schemas/usuarios.schema';
import { Area } from './schemas/area.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Rol } from './schemas/rol.schema';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

interface PopulatedUsuario extends Omit<Usuario, 'Rol' | 'Area'> {
    Rol: { _id: Types.ObjectId; Rol: string };
    Area: { _id: Types.ObjectId; Area: string }[];
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
        @InjectModel(Area.name) private readonly areaModel: Model<Area>,
        @InjectModel(Rol.name) private readonly rolModel: Model<Rol>,
        private readonly jwtService: JwtService,
    ) { }
    async login(loginDto: any): Promise<{ accesToken: string }> {
        const { Username, Password } = loginDto;

        // Buscar al usuario en la base de datos
        const usuario = await this.usuarioModel.findOne({ Username: Username }).populate([
            { path: 'Area', select: "_id" },
            { path: 'Rol', select: "Rol -_id" }
        ]).lean<PopulatedUsuario>().exec();
        if (!usuario) {
            throw new NotFoundException(`User not found`);
        }
        const isMatch = await bcrypt.compare(Password, usuario.Password);
        if (!isMatch) {
            throw new UnauthorizedException(`Invalid credentials`);
        }
        if (!usuario.isActive) {
            throw new ForbiddenException('Usuario desactivado, contacte con el administrador.');
        }

        const userTokenData = {
            userId: usuario._id,
            username: usuario.Username,
            nombre: usuario.Nombre,
            correo: usuario.Correo,
            rol: usuario.Rol.Rol,
            areas: usuario.Area.map(a => a._id.toString())
        };
        const accesToken = this.jwtService.sign(userTokenData);
        return { accesToken };
    }
}
