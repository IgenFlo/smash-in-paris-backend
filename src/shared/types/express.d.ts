import { DiscordUserData } from './discord.types';

declare global {
  namespace Express {
    interface Request {
      user: DiscordUserData;
    }
  }
}
