import { User } from '@prisma/client';
import { DiscordUserData } from './discord.types';

export interface UserInRequest extends User, Omit<DiscordUserData, 'id'> {}
