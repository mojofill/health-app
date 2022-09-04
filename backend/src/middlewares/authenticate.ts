import { Request, Response, NextFunction } from 'express'; 

class TokenStore {
    private store: Map<string, number>; // Map<token, uid>; i know, very insecure
    constructor() {
      this.store = new Map();
    }
  
    add(token: string, uid: number): void {
      if (this.store.has(token)) throw new Error(`Token already exists. `);
      this.store.set(token, uid);
    }
  
    hasToken(token: string): boolean {
      return this.store.has(token);
    }
  
    getTokenByID(id: number): string | undefined {
      for (const [k, v] of this.store.entries()) {
        if (v === id) return k;
      }
    }
  
    getIDByToken(token: string): number | undefined {
      return this.store.get(token);
    }
    remove(token: string): void {
      this.store.delete(token);
    }
  }

export const tokens = new TokenStore();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.session;

  const id = tokens.getIDByToken(token);

  if (!tokens.hasToken(token) || !id) return res.status(401).send({ error: 'Unauthenticated' });

  req.userId = id;
  req.authToken = token;

  next();
};

export default authenticate;