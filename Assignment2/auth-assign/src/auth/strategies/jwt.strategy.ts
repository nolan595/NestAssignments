import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extracts jwt from whereever it will be stored
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
