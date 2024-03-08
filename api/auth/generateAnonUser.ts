
import { v4 as uuidv4 } from 'uuid';

export function generateAnonUserId(): string {
    const AnonUser = uuidv4();
    return AnonUser;
}