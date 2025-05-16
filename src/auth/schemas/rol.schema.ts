import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Roles' }) // Nombre de la colección en MongoDB
export class Rol extends Document {
  @Prop({ required: true })
  Rol: string; // Propiedad para el nombre del rol
}

export const RolSchema = SchemaFactory.createForClass(Rol);
